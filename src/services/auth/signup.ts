import { SignUpRequestDTO, SignUpResponseDTO } from "@/model/signup.dto";
import axiosInstance from "@/utils/axios";

export const signup = async (
  payload: SignUpRequestDTO,
): Promise<SignUpResponseDTO> => {
  const { data } = await axiosInstance.post<SignUpResponseDTO>(
    "/auth/signup",
    payload,
  );
  return data;
};
