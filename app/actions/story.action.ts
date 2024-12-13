import { getRequest, postRequest } from "~/server/axios";
import { Story } from "../../_db.types";

// ~ =============================================>
// ~ ======= create a new story  -->
// ~ =============================================>
type CreateStoryType = {
	title: string;
	passage: string;
	owner: string;
	summary: string;
	initOptions: Story["initOptions"];
};
export const create_story = async (story_data: CreateStoryType) => {
	const { data, error } = await postRequest<CreateStoryType, Story>(
		"/stories/create",
		story_data
	);

	return data?.data;
};

// ~ =============================================>
// ~ ======= get single story  -->
// ~ =============================================>
export const get_story_by_id = async (id: string) => {
	const { data, error } = await getRequest<Story>(`/stories/${id}`);

	return data?.data;
};

// ~ =============================================>
// ~ ======= get all user stories   -->
// ~ =============================================>
export const get_user_stories = async (profile_id: string) => {
	const { data, error } = await getRequest<Story[]>(
		`/stories/owner/${profile_id}`
	);

	return data?.data;
};

// ~ =============================================>
// ~ ======= new story setup-->
// ~ =============================================>

async function* completeStorySetup() {
	let currentStep = 0;
	const allSteps = [
		"Dig into the story’s core.",
		"Create unforgettable characters.",
		"Spice up the plot drama.",
		"Build a world that wows.",
		"Tie it all together with themes.",
	];

	yield "Hello there";
}

// ~ =============================================>
// ~ ======= get original story chapters  -->
// ~ =============================================>
type OriginalGenType = {
	story_id: string;
	title: string;
	summary: string;
	passage: string;
};
export const get_original_story_chapters = async (args: OriginalGenType) => {
	const { data, error } = await postRequest<
		OriginalGenType,
		{ chapterData: Story["chapters"][0] }
	>("/openai/get-original-story", args);

	return data?.data;
};

// ~ =============================================>
// ~ ======= add story chapter content  -->
// ~ =============================================>
export const add_story_chapter_content = async (
	story_id: string,
	chapter_number: number,
	content: string,
	owner: string
) => {
	const { data, error } = await postRequest<
		{ chapter_number: number; content: string; owner: string },
		{ audio_url: string }
	>(`stories/${story_id}/chapter-add-content`, {
		chapter_number,
		content,
		owner,
	});

	return data?.data;
};
