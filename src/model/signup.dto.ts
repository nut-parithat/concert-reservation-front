import { Role } from "./role.dto";

export interface SignUpRequestDTO {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

export interface SignUpResponseDTO {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: Role;
  };
}
