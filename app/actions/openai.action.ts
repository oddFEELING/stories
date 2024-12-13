import axiosInstance from "~/server/axios";
import { promiseResolver } from "~/lib/utils";

// ~ =============================================>
// ~ ======= get story suggestion  -->
// ~ =============================================>
export const get_story_suggestions = async (
  prompt: string = "Generate 12 diverse story ideas",
) => {
  const { data, error } = await promiseResolver(
    axiosInstance.post("/openai/suggest-story-titles", {
      prompt,
    }),
  );

  return data?.data;
};
