import React from "react";

function CommonDropDown({
  label = "Select",
  options = [
    {id: 1, name: "option 1"},
    {id: 2, name: "option 2"},
  ],
  onChange,
  value,
  id,
  name,
  checkId,
  disabledSelect,
  star,
  hidden = false,
  disabled = false,
}) {
  return (
    <div>
      <div className="flex">
        <label
          htmlFor="dropdown"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {label}
        </label>
        <span className={star ? "text-red-600" : ""}>{star ? "*" : ""}</span>
      </div>

      <select
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabledSelect}
        className="bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      >
        <option value="" disabled={disabled} hidden={hidden}>
          {label}
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={checkId ? option.id : option.name || option.username}
          >
            {option.name || option.username}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CommonDropDown;
