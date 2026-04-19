import { ReservationHistoryDTO } from "@/model/reservation.dto";
import axiosInstance from "@/utils/axios";

export const getReservationHistory = async (): Promise<
  ReservationHistoryDTO[]
> => {
  const { data } = await axiosInstance.get<ReservationHistoryDTO[]>(
    "/reservation/history",
  );
  return data;
};
