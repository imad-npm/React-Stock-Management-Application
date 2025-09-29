
import React from 'react';

/**
 * A reusable Input component with consistent styling.
 * @param {object} props - All standard HTML input attributes.
 */
function Input(props) {
    return (
        <input 
            className="form-control" 
            {...props} 
        />
    );
}

export default Input;
