"use client";
import AuthLayout from "@/components/auth/AuthLayout";
import { LockIcon, UserFormIcon } from "@/components/commons/icons";
import Input from "@/components/commons/input";
import { Role } from "@/model/role.dto";
import { login } from "@/services/auth/login";
import { getAxiosError } from "@/utils/error";
import { message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";

const RoleSchema = z.enum(["admin", "user"]);

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const role: Role = RoleSchema.catch("user").parse(roleParam);
  const isAdmin = role === "admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }
    setErrors({});

    try {
      const data = await login({ email, password, role });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/home");
    } catch (error) {
      message.error(`Login failed : ${getAxiosError(error)}`);
    }
  };

  return (
    <AuthLayout
      role={role}
      renderForm={
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center mb-8">Login</h2>
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
          <button
            type="submit"
            className="w-full bg-text hover:bg-text/90 text-white py-2 rounded-md transition cursor-pointer"
          >
            Login as {isAdmin ? "Administrator" : "User"}
          </button>
          <p className="text-center text-sm mt-4">
            {"Don't have an account? "}
            <a
              onClick={() => router.push(`/signup?role=${role}`)}
              className="text-text hover:underline cursor-pointer"
            >
              Create an account
            </a>
          </p>
          <p className="text-center text-sm mt-4">
            <a
              onClick={() => router.push(`/`)}
              className="text-text hover:underline cursor-pointer"
            >
              Back to landing page
            </a>
          </p>
        </form>
      }
    />
  );
}
