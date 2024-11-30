import { model, Schema } from "mongoose";
import { Story } from "~/server/database/db.types";

const StorySchema = new Schema<Story>(
	{
		title: String,
		passage: String,
		owner: { type: Schema.Types.ObjectId, ref: "User" },
		initOptions: {
			genre: {
				type: String,
				enum: ["fantasy", "sci-fi", "mystery", "horror", "romance"],
				default: "fantasy",
			},
			length: {
				type: String,
				enum: ["short", "medium", "long"],
				default: "short",
			},
			timePeriod: {
				type: String,
				enum: ["modern", "historical", "space-age", "magical"],
				default: "modern",
			},
		},
	},
	{
		collection: "stories",
		timestamps: true,
	}
);

export default model<Story>("stories", StorySchema);
