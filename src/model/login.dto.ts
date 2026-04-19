import { Role } from "./role.dto";

export interface LoginRequestDTO {
  email: string;
  password: string;
  role: Role;
}

export interface LoginResponseDTO {
  token: string;
  user: UserInfoDTO;
}

export interface UserInfoDTO {
  id: string;
  email: string;
  role: Role;
  fullName: string;
}
