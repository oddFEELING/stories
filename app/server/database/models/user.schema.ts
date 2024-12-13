import mongoose, { Schema } from "mongoose";
import { User } from "../../../../_db.types";

const UserSchema: Schema = new mongoose.Schema<User>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    other_names: String,
    email: { type: String, required: true },
  },
  { timestamps: true, collection: "users" },
);

let UserModel: mongoose.Model<User>;
try {
  UserModel = mongoose.model<User>("users");
} catch {
  UserModel = mongoose.model<User>("users", UserSchema);
}

export default UserModel;
