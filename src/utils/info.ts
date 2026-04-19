import { UserInfoDTO } from "@/model/login.dto";

const defaultUserInfo: UserInfoDTO = {
  id: "",
  email: "",
  role: "user",
  fullName: "",
};

export const getUserInfo = (): UserInfoDTO => {
  if (typeof window === "undefined") return defaultUserInfo;

  const userInfo = localStorage.getItem("user");
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return defaultUserInfo;
};
