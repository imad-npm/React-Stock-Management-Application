
import React from 'react';

/**
 * A reusable Alert component for displaying dismissible messages.
 * @param {object} props
 * @param {string} props.message - The message to display in the alert.
 * @param {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'} [props.variant='info'] - The Bootstrap alert style variant.
 * @param {() => void} [props.onClose] - Optional function to call when the alert is dismissed.
 */
function Alert({ message, variant = 'info', onClose }) {
    if (!message) return null;

    let alertClasses = "p-4 rounded-md relative mt-3 border";
    let textClasses = "";
    let closeButtonClasses = "absolute top-1/2 -translate-y-1/2 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200";

    switch (variant) {
        case 'info':
            alertClasses += " bg-blue-50 border-blue-200";
            textClasses += " text-blue-800";
            break;
        case 'success':
            alertClasses += " bg-green-50 border-green-200";
            textClasses += " text-green-800";
            break;
        case 'danger':
            alertClasses += " bg-red-50 border-red-200";
            textClasses += " text-red-800";
            break;
        case 'warning':
            alertClasses += " bg-yellow-50 border-yellow-200";
            textClasses += " text-yellow-800";
            break;
        // Add more cases for other variants if needed
        default:
            alertClasses += " bg-gray-50 border-gray-200";
            textClasses += " text-gray-800";
    }

    return (
        <div className={`${alertClasses} ${textClasses}`} role="alert">
            {message}
            {onClose && (
                <button
                    type="button"
                    className={closeButtonClasses}
                    onClick={onClose}
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default Alert;
