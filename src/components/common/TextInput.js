import React from "react";

export default function TextInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  id,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`form-control ${className}`}
        id={id}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}