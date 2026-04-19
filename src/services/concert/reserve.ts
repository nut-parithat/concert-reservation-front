import { ReserveConcertResponseDTO } from "@/model/concert.dto";
import axiosInstance from "@/utils/axios";

export const reserveConcert = async (
  concertId: string,
): Promise<ReserveConcertResponseDTO> => {
  const { data } = await axiosInstance.post<ReserveConcertResponseDTO>(
    `/concert/${concertId}/reserve`,
  );
  return data;
};
