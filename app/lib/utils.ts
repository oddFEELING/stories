import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ~ =============================================>
// ~ ======= Promise resolver  -->
// ~ =============================================>
export const promiseResolver = async <T>(
  promise: Promise<T>,
): Promise<{
  data: T | null;
  error: Error | null | unknown;
}> => {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
