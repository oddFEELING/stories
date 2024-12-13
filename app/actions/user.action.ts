import { User } from "../../_db.types";
import axiosInstance from "~/server/axios";
import { promiseResolver } from "~/lib/utils";

// ~ =============================================>
// ~ ======= create user  -->
// ~ =============================================>
export const create_profile = async (profile_data: {
  first_name: string;
  last_name: string;
  auth_id: string;
  email: string;
  profile_img: string;
}) => {
  console.log("api req made post");
  const { data, error } = await promiseResolver(
    axiosInstance.post<User>("/users/create", profile_data),
  );

  if (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }

  return data?.data;
};

// ~ =============================================>
// ~ ======= get user profile  -->
// ~ =============================================>
export const get_profile = async (id: string) => {
  console.log("api req made get");
  const { data, error } = await promiseResolver(
    axiosInstance.get<User>(`/users/${id}`),
  );

  if (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }

  return data?.data;
};
