// src/components/ui/Button.jsx
import React from "react";

const Button = ({
  children = "Button",
  onClick = () => {},
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
