import React from "react";

const Input = ({
  label,
  placeholder,
  className,
  type = "text",
  name,
  onChange,
  onBlur,
  value,
  min,
  maxLength,
  inputMode,
  disabledSelect,
  star,
  required,
  pattern,
}) => {
  return (
    <>
      <div>
        <div className="flex">
          <label className="text-sm font-medium text-gray-900">{label}</label>
          <span className={star ? "text-red-600" : ""}>{star ? "*" : ""}</span>
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className={`${className} block w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-blue-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          onChange={onChange}
          name={name}
          onBlur={onBlur}
          value={value}
          min={min}
          maxLength={maxLength}
          disabled={disabledSelect}
          inputMode={inputMode}
          required={required}
          pattern={pattern}
        />
      </div>
    </>
  );
};

export default Input;
