
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

    let alertClasses = "p-4 rounded-md relative mt-3";
    let textClasses = "";
    let closeButtonClasses = "absolute top-0 bottom-0 right-0 px-4 py-3";

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
                    <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </button>
            )}
        </div>
    );
}

export default Alert;
