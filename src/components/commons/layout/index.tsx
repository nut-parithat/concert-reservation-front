"use client";
import { Role } from "@/model/role.dto";
import { cn } from "@/utils/className";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { LogoutIcon } from "../icons";
import Button from "../button";

const NAV_ITEMS = [
  { key: "/home", label: "Home", permission: ["admin", "user"] },
  { key: "/history", label: "History", permission: ["admin"] },
];

interface Props {
  children: React.ReactNode;
  role: Role;
}

export default function Layout({ children, role }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const filteredNav = NAV_ITEMS.filter((item) =>
    item.permission.includes(role),
  );

  const onLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const allowedPaths = filteredNav.map((item) => item.key);
  const isDenied = !allowedPaths.includes(pathname);

  if (isDenied) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
        <h1 className="text-3xl font-bold text-error">Permission Denied</h1>
        <p className="text-gray-500">
          You do not have permission to access this page.
        </p>
        <Button onClick={() => router.push("/home")} variant="primary">
          Go to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md px-6 py-11 pb-14 flex flex-col shrink-0">
        <h1 className="text-xl font-bold mb-6">
          {role === "admin" ? "Admin" : "User"}
        </h1>
        <nav className="space-y-2">
          {filteredNav.map((item) => (
            <div
              key={item.key}
              onClick={() => router.push(item.key)}
              className={cn(
                "p-2 rounded cursor-pointer transition hover:bg-blue-100 font-medium",
                pathname === item.key && "bg-blue-100 ",
              )}
            >
              {item.label}
            </div>
          ))}
        </nav>
        <div className="flex-1" />
        <div
          onClick={onLogout}
          className="font-medium text-black cursor-pointer flex gap-2"
        >
          <LogoutIcon className="text-black" />
          Logout
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
