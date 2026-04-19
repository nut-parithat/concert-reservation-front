import { Role } from "@/model/role.dto";
import React from "react";

interface Props {
  userRole: Role;
  permissionRole: Role[];
  children: React.ReactNode;
}

const PermissionGuard = ({ userRole, permissionRole, children }: Props) => {
  if (permissionRole.includes(userRole)) {
    return children;
  }
  return null;
};

export default PermissionGuard;
