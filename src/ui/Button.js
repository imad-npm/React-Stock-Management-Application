
import React from 'react';

/**
 * A reusable Button component with consistent styling.
 * @param {object} props
 * @param {'primary' | 'secondary' | 'success' | 'danger' | 'warning'} [props.variant='primary'] - The button style variant.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {() => void} props.onClick - The function to call when the button is clicked.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The button's type.
 */
function Button({ variant = 'primary', children, onClick, type = 'button', ...rest }) {
    const baseClassName = 'font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
    let variantClassName = '';

    switch (variant) {
        case 'primary':
            variantClassName = 'bg-primary hover:bg-indigo-700 text-white focus:ring-primary';
            break;
        case 'success':
            variantClassName = 'bg-accent hover:bg-green-600 text-white focus:ring-accent';
            break;
        case 'danger':
            variantClassName = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
            break;
        case 'warning':
            variantClassName = 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500';
            break;
        case 'secondary':
            variantClassName = 'bg-secondary hover:bg-gray-600 text-white focus:ring-secondary';
            break;
        default:
            variantClassName = 'bg-gray-500 hover:bg-gray-700 text-white focus:ring-gray-500';
    }

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
