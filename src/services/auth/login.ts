import { LoginRequestDTO, LoginResponseDTO } from "@/model/login.dto";
import axiosInstance from "@/utils/axios";

export const login = async (
  payload: LoginRequestDTO,
): Promise<LoginResponseDTO> => {
  const { data } = await axiosInstance.post<LoginResponseDTO>(
    "/auth/login",
    payload,
  );
  return data;
};
