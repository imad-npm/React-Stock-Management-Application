
import React from 'react';

/**
 * A reusable Button component with consistent styling.
 * @param {object} props
 * @param {'primary' | 'secondary' | 'success' | 'danger'} [props.variant='primary'] - The button style variant.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {() => void} props.onClick - The function to call when the button is clicked.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The button's type.
 */
function Button({ variant = 'primary', children, onClick, type = 'button', ...rest }) {
    const baseClassName = 'btn';
    const variantClassName = `btn-${variant}`;

    return (
        <button 
            type={type}
            className={`${baseClassName} ${variantClassName}`} 
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
}

export default Button;
