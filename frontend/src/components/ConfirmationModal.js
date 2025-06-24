import React from 'react';
import Modal from 'react-modal';

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Você tem certeza?</h2>
      <p>Esta ação não pode ser desfeita.</p>
      <div className="confirmation-buttons">
        <button onClick={onConfirm} className="confirm">Sim, deletar</button>
        <button onClick={onRequestClose} className="cancel">Cancelar</button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
