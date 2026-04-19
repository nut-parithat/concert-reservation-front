import { ConcertDTO, CreateConcertRequestDTO } from "@/model/concert.dto";
import axiosInstance from "@/utils/axios";

export const createConcert = async (
  payload: CreateConcertRequestDTO,
): Promise<ConcertDTO> => {
  const { data } = await axiosInstance.post<ConcertDTO>("/concert", payload);
  return data;
};
