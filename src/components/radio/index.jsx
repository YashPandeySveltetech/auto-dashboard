import React from "react";

function Radio({ label = "label", value, name, handleChange, disabled }) {
  return (
    <fieldset>
      <div className="flex items-center mb-4">
        <input
          id={name}
          onClick={handleChange}
          checked={value}
          type="radio"
          name={name}
          disabled={disabled}
          className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 "
        />
        <label
          for="country-option-1"
          className="block ml-2 text-sm font-medium text-gray-900"
          id={name}
        >
          {label}
        </label>
      </div>
    </fieldset>
  );
}

export default Radio;
