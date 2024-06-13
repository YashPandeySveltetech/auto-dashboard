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
  onKeyUp,
  id,
  checked,
  max,
  handleKeyDown,
  textColor
}) => {
  return (
    <>
    
      <div>
        <div className="flex">
          <label className={`text-sm font-medium ${textColor?textColor:"text-black"}`}>{label}</label>
          <span className={star ? "text-red-600" : ""}>{star ? "*" : ""}</span>
        </div>
        <input
        id={id}
          type={type}
          placeholder={placeholder}
          className={`${className} block w-full p-2  text-sm text-black-900 border border-gray-300 rounded-lg bg-blue-100 focus:ring-blue-500 focus:border-blue-500 `}
          onChange={onChange}
          name={name}
          max={max}
          onBlur={onBlur}
          value={value}
          min={min}
          maxLength={maxLength}
          disabled={disabledSelect}
          inputMode={inputMode}
          required={required}
          pattern={pattern}
          onKeyUp={onKeyUp}
          checked={checked}
          onKeyDown={handleKeyDown}
      
        />
      </div>
    </>
  );
};

export default Input;
