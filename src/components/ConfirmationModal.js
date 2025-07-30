import React from "react";
import Modal from "./Modal";

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Yes",
  cancelText = "Cancel",
  type = "danger" // "danger", "warning", "info"
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="confirmation-modal">
        <div className="confirmation-message">
          {message}
        </div>
        <div className="confirmation-actions">
          <button 
            onClick={onClose}
            className="btn-secondary confirmation-cancel"
          >
            {cancelText}
          </button>
          <button 
            onClick={handleConfirm}
            className={`btn-primary confirmation-confirm ${type}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
