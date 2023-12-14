import React from "react";

function Radio({ label = "label", value, name, handleChange, disabled }) {
  return (
    <fieldset>
      <div class="flex items-center mb-4">
        <input
          id={name}
          onClick={handleChange}
          checked={value}
          type="radio"
          name={name}
          disabled={disabled}
          class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="country-option-1"
          className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          id={name}
        >
          {label}
        </label>
      </div>
    </fieldset>
  );
}

export default Radio;
