import * as mongoose from "mongoose";

export const connectMongoose = async () => {
  await mongoose.connect(import.meta.env.MONGODB_URL);
};
