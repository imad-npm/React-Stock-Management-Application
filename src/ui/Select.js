
import React from 'react';

/**
 * A reusable Select component with consistent styling.
 * @param {object} props
 * @param {Array<{value: string, label: string}>} props.options - An array of options for the select dropdown.
 * @param {string} props.value - The current selected value.
 * @param {(e: React.ChangeEvent<HTMLSelectElement>) => void} props.onChange - The change event handler.
 * @param {string} [props.defaultOptionLabel] - Optional label for a default/placeholder option.
 * @param {string} [props.id] - The ID for the select element.
 * @param {string} [props.name] - The name for the select element.
 */
function Select({ options, value, onChange, defaultOptionLabel, id, name, ...rest }) {
    return (
        <select 
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-light-gray focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md custom-select transition duration-150 ease-in-out" 
            id={id} 
            name={name}
            value={value}
            onChange={onChange}
            {...rest}
        >
            {defaultOptionLabel && <option value="">{defaultOptionLabel}</option>}
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default Select;
