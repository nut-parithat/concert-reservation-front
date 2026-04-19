import axiosInstance from "@/utils/axios";

export const deleteConcert = async (concertId: string): Promise<void> => {
  await axiosInstance.delete(`/concert/${concertId}`);
};
