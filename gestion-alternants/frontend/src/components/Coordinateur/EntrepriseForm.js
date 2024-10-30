// src/components/Coordinateur/EntrepriseForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './style/EntrepriseForm.css'

const EntrepriseForm = ({ onEntrepriseCreated }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');

    const token = localStorage.getItem('access_token');

    if (!token) {
      setMessage('Erreur : Token d\'authentification manquant. Veuillez vous reconnecter.');
      setLoading(false);
      return;
    }

    try {
      const userResponse = await axios.post(
        'http://127.0.0.1:8000/api/users/create/',
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userId = userResponse.data.id;

      await axios.post(
        'http://127.0.0.1:8000/api/entreprises/assign-user/',
        {
          user_id: userId,
          nom: data.nomEntreprise,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('L\'utilisateur et l\'entreprise ont été créés et associés avec succès.');
      reset();
      onEntrepriseCreated(); // Appeler la fonction pour rafraîchir la liste
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de la création ou de l\'assignation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Ajouter une entreprise partenaire</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            {...register('username', { required: true })}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Mot de passe"
            {...register('password', { required: true })}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Nom de l'entreprise"
            {...register('nomEntreprise', { required: true })}
          />
        </div>

        <button className="button-form-entreprise" type="submit" disabled={loading}>
          {loading ? 'Chargement...' : 'Soumettre'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default EntrepriseForm;
