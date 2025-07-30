import React from "react";
import Modal from "./Modal";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel" }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="confirmation-dialog">
        <p className="confirmation-message">{message}</p>
        <div className="confirmation-actions">
          <button onClick={onClose} className="btn-secondary">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="btn-primary">
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
