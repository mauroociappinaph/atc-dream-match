// src/components/ui/Button.tsx
import React from "react";
import { ButtonProps } from "@/types/Types";

const Button: React.FC<ButtonProps> = ({
  children = "Button",
  onClick = () => {},
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
