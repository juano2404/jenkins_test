import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/password-reset/', {
        email,
      });
      setMessage(response.data.detail);
      setErrorMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
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
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Envoyer le lien de réinitialisation</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
