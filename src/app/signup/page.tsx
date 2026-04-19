"use client";
import AuthLayout from "@/components/auth/AuthLayout";
import { LockIcon, UserFormIcon } from "@/components/commons/icons";
import Input from "@/components/commons/input";
import { Role } from "@/model/role.dto";
import { signup } from "@/services/auth/signup";
import { getAxiosError } from "@/utils/error";
import { message } from "antd";
import { get } from "http";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";

const RoleSchema = z.enum(["admin", "user"]);

const signUpSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const role: Role = RoleSchema.catch("user").parse(roleParam);
  const isAdmin = role === "admin";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<SignUpErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = signUpSchema.safeParse({
      fullName,
      email,
      password,
      confirmPassword,
    });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        fullName: fieldErrors.fullName?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      return;
    }
    setErrors({});

    try {
      const data = await signup({ email, password, fullName, role });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/home");
    } catch (error) {
      message.error(`Sign up failed: ${getAxiosError(error)}`);
    }
  };

  return (
    <AuthLayout
      role={role}
      renderForm={
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center mb-8">Sign Up</h2>
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your Full Name"
            value={fullName}
            onChange={setFullName}
            error={errors.fullName}
            prefixIcon={<UserFormIcon className="h-6 w-6" />}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your Email Address"
            value={email}
            onChange={setEmail}
            error={errors.email}
            prefixIcon={<UserFormIcon className="h-6 w-6" />}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={setPassword}
            error={errors.password}
            prefixIcon={<LockIcon className="h-6 w-6 text-black" />}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={errors.confirmPassword}
            prefixIcon={<LockIcon className="h-6 w-6 text-black" />}
          />
          <button
            type="submit"
            className="w-full bg-text hover:bg-text/90 text-white py-2 rounded-md transition cursor-pointer"
          >
            Sign Up as {isAdmin ? "Administrator" : "User"}
          </button>
          <p className="text-center text-sm mt-4">
            {"Already have an account? "}
            <a
              onClick={() => router.push(`/login?role=${role}`)}
              className="text-text hover:underline cursor-pointer"
            >
              Login
            </a>
          </p>
        </form>
      }
    />
  );
}
