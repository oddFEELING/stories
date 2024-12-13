import axios from "axios";
import { promiseResolver } from "~/lib/utils";
import { UnknownRecord } from "type-fest";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_HOST,
});

// ~ ======= get request  -->
const getRequest = async <T>(path: string, options: UnknownRecord = {}) => {
  return await promiseResolver(axiosInstance.get<T>(path, options));
};

const postRequest = async <T, K>(
  path: string,
  data: T,
  options: UnknownRecord = {},
) => {
  return await promiseResolver(
    axiosInstance.post<{ success?: boolean; error?: boolean } & K>(
      path,
      data,
      options,
    ),
  );
};

export default axiosInstance;

export { getRequest, postRequest };
