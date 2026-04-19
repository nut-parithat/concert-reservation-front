import { ConcertDTO } from "@/model/concert.dto";
import axiosInstance from "@/utils/axios";

export const getAllConcerts = async (): Promise<ConcertDTO[]> => {
  const { data } = await axiosInstance.get<ConcertDTO[]>("/concert");
  return data;
};
