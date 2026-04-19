import { Role } from "@/model/role.dto";
import React from "react";

interface Props {
  role: Role;
  renderForm: React.ReactNode;
}

const AuthLayout = ({ role, renderForm }: Props) => {
  const isAdmin = role === "admin";
  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-primary text-white  px-12 py-27 ">
        <div className="max-w-130 w-full flex flex-col m-auto h-full ">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white rounded-full"></div>
            <span className="text-2xl font-semibold tracking-wide">BRAND</span>
          </div>
          <div className="flex-1" />
          {/* Quote */}
          <div className=" whitespace-pre-line">
            <h1 className="text-2xl font-semibold mb-4 ">
              {isAdmin
                ? `“Powering the tools that
              power the team.”`
                : `"Your digital workspace,
              simplified.”`}
            </h1>
            <p className="text-sm ">
              Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida
              porttitor nibh urna sit ornare a. Proin dolor morbi id ornare
              aenean non.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 px-6">
        <div className="w-full max-w-130">{renderForm}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
