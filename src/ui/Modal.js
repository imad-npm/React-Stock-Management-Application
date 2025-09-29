import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button'; // Import the Button component

const Modal = ({ onClose, component, title }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-lg mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-light-gray">
          <h5 className="text-2xl font-bold text-text">{title}</h5>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="relative p-6">
          {component}
        </div>
        <div className="flex items-center justify-end p-4 border-t border-light-gray bg-background">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
