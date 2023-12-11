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
}) => {
  return (
    <>
      <div>
      <label className='text-[.9rem] font-bold'>{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-blue-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={onChange}
          name={name}
          onBlur={onBlur}
          value={value}
        />
      </div>
    </>
  );
};

export default Input;
