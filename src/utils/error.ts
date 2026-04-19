import { AxiosError } from "axios";

export const getAxiosError = (error: unknown): string => {
  const axiosError = error as AxiosError<{ message: string }>;
  return (
    axiosError.response?.data?.message ??
    (error instanceof Error ? error.message : "Unknown error")
  );
};
