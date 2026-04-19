import { useState } from "react";
import { VisibilityOffIcon } from "../icons";

interface Props {
  type?: "text" | "password" | "email" | "number";
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  error?: string;
}

export default function Input({
  type = "text",
  label,
  placeholder,
  value = "",
  onChange,
  prefixIcon,
  suffixIcon,
  error,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="w-full mb-7">
      {label && <label className="block text-sm mb-2">{label}</label>}

      <div
        className={`py-0.5 flex items-center border rounded-md px-3 bg-white ${
          error ? "border-red-500" : "border-black"
        }`}
      >
        {prefixIcon && <span className="mr-2 text-gray-400">{prefixIcon}</span>}

        <input
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full py-2 outline-none text-[16px]"
        />

        {suffixIcon && <span className="mr-2 text-gray-400">{suffixIcon}</span>}

        {isPassword && (
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="ml-2 text-gray-400 cursor-pointer select-none"
          >
            <VisibilityOffIcon className="w-6 h-6 text-black" />
          </span>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
