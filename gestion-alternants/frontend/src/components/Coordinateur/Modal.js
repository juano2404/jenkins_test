// src/components/Modal.js
import React from 'react';
import './style/Modal.css'; // Vous pouvez styliser le modal dans ce fichier

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmation</h2>
        <p>Êtes-vous sûr de vouloir supprimer cette entreprise ?</p>
        <button className="button-close" onClick={onClose}>Annuler</button>
        <button className="button-confirm" onClick={onConfirm}>Confirmer</button>
      </div>
    </div>
  );
};

export default Modal;
