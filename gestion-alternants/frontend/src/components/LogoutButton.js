import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style/LogoutButton.css'; // Importer le fichier CSS pour le style

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Récupérer les tokens depuis le localStorage
      const refreshToken = localStorage.getItem('refresh_token');
      const accessToken = localStorage.getItem('access_token');

      // Vérifiez que les tokens existent
      if (!refreshToken || !accessToken) {
        console.error('Access token ou refresh token manquant');
        return;
      }

      // Affichez les tokens dans la console pour le débogage
      console.log('Access token:', accessToken);
      console.log('Refresh token:', refreshToken);

      // Envoie une requête à l'API pour la déconnexion
      const response = await axios.post('http://localhost:8000/api/logout/', 
        {
          refresh_token: refreshToken  // Envoyer le refresh_token dans le corps de la requête
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',  // S'assurer que le type de contenu est JSON
          }
        }
      );

      // Vérifiez la réponse de l'API
      console.log('Réponse de l\'API:', response.data);

      // Supprimer les tokens du localStorage après une déconnexion réussie
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      // Rediriger vers la page de connexion
      navigate('/login');
      
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error.response ? error.response.data : error.message);
      // Afficher le message d'erreur détaillé
    }
  };

  return (
    <button onClick={handleLogout}>
      Déconnexion
    </button>
  );
};

export default LogoutButton;
