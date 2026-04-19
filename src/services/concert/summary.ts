import { ConcertSummaryDTO } from "@/model/concert.dto";
import axiosInstance from "@/utils/axios";

export const getSummary = async (): Promise<ConcertSummaryDTO> => {
  const { data } =
    await axiosInstance.get<ConcertSummaryDTO>("/concert/summary");
  return data;
};
