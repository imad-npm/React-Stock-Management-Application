
import React from 'react';

/**
 * A reusable Input component with consistent styling.
 * @param {object} props - All standard HTML input attributes.
 */
function Input(props) {
    return (
        <input 
            className="block w-full px-3 py-2 border border-light-gray rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out" 
            {...props} 
        />
    );
}

export default Input;
