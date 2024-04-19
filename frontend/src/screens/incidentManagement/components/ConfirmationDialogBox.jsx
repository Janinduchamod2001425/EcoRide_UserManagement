// ConfirmationDialog.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationDialog = ({
  show,
  handleClose,
  handleConfirmSubmit,
  message,
  submitButtonVariant,
  submitButtonText,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant={submitButtonVariant} onClick={handleConfirmSubmit}>
          {submitButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationDialog;
