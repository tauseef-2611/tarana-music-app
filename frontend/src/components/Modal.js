// src/components/Modal.js

import React from 'react';
import './Modal.css';

const Modal = ({ children, show, onClose, onMinimize }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Music Player</h4>
          <button className="minimize-button" onClick={(e) => e.stopPropagation() || onMinimize}>
            Minimize
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button onClick={(e) => e.stopPropagation() || onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
