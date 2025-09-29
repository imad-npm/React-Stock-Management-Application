import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ onClose, component,title }) => {

  
  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">{title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {component}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
             
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
