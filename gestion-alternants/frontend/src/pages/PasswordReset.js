import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PasswordReset = () => {
  const { uid, token } = useParams();
  console.log('UID:', uid);
  console.log('Token:', token);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Débogage : Affichez les données envoyées
    console.log('Données envoyées:', {
      uid,
      token,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });

    // Assurez-vous que le mot de passe est suffisamment long
    if (newPassword.length < 8) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
  
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/reset-password-submission/`, {
        uid,
        token,
        new_password: newPassword,        // Correspond à votre API
        confirm_password: confirmPassword, // Correspond à votre API
      });
      setMessage(response.data.detail);
      setErrorMessage('');
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      // Récupérez le message d'erreur renvoyé par l'API, s'il existe
      const errorResponse = error.response ? error.response.data.detail : 'Une erreur est survenue. Veuillez réessayer.';
      setErrorMessage(errorResponse);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Réinitialisation du mot de passe</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirmez le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
    </div>
  );
};

export default PasswordReset;
