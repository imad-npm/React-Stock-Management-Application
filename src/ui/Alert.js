
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

    return (
        <div className={`alert alert-${variant} alert-dismissible fade show mt-3`} role="alert">
            {message}
            {onClose && (
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={onClose}
                ></button>
            )}
        </div>
    );
}

export default Alert;
