import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// ~ =============================================>
// ~ ======= get suggestions for story titles   -->
// ~ =============================================>
const suggestionsSchema = z.object({
  response: z.array(
    z.object({
      title: z.string().describe("Title of the story"),
      summary: z.string().describe("2 line story summary"),
      passage: z.string().describe("Bible passage"),
      category: z.string().describe("One or Two word category of the story"),
    }),
  ),
  categories: z.array(z.string()).describe("List of categories"),
});

export const getSuggestionsForStoryTitles = async (prompt: string) => {
  // ~ ======= create thread
  const thread = await openai.beta.threads.create({
    messages: [
      {
        role: "user",
        content: `Based on the user prompt: "${prompt}", either:
                1. Create a compelling biblical story adaptation incorporating elements from the prompt, or
                2. Suggest 12 uncommon and lesser-known Bible stories, including:
                   - A creative title for each story
                   - The biblical reference/passage
                   - A brief 2-line summary highlighting unique elements
                   - The category/theme it belongs to
                
                The stories should be diverse in nature, spanning different themes like:
                - Personal transformation
                - Divine intervention
                - Family dynamics
                - Tests of faith
                - Leadership challenges
                - Prophecy fulfillment
                
                For each story, focus on surprising narratives that aren't commonly referenced.`,
      },
    ],
  });

  // ~ ======= create run
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    model: "gpt-4o-mini",
    assistant_id: "asst_xA9iRqfUE9VpBVBFJaQKfGxi",
  });

  // ~ ======= get run result
  const messages = await openai.beta.threads.messages.list(thread.id, {
    run_id: run.id,
  });
  const message = messages.data.pop();

  // ~ ======= handle text response -->
  if (!message) throw new Error("No message found");

  if (message.content[0].type === "text") {
    const { text } = message.content[0];
    return text.value;
  }

  return null;
};

// ~ =============================================>
// ~ ======= initialise story setup  -->
// ~ =============================================>
export const storySetupInitialiser = async (
  story_title: string,
  passage: string,
  genre: string,
  timePeriod: string,
) => {
  // ~ ======= create thread -->
  const thread = await openai.beta.threads.create({
    messages: [
      {
        role: "user",
        content: `create a story setup given the following initialising options
        - story title: ${story_title}
        - passage: ${passage}
        - genre: ${genre}
        - time period: ${timePeriod}`,
      },
    ],
  });

  // ~ ======= create run -->
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    model: "gpt-4o-mini",
    assistant_id: import.meta.env.VITE_SETUP_INITIALISER_ID,
  });

  // ~ ======= get result  -->
  const messages = await openai.beta.threads.messages.list(thread.id, {
    run_id: run.id,
  });

  const message = messages.data.pop();

  // ~ ======= handle text response  -->
  if (!message) throw new Error("No message found");
  if (message.content[0].type === "text") {
    const { text } = message.content[0];
    return text.value;
  }

  return null;
};
