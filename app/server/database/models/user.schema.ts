import { model, Schema } from "mongoose";
import { User } from "~/server/database/db.types";

const UserSchema: Schema = new Schema<User>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    other_names: String,
    email: { type: String, required: true },
  },
  { timestamps: true, collection: "users" },
);

export default model<User>("users", UserSchema);
