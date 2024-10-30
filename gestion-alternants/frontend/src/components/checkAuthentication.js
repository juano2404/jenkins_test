import axios from 'axios';

export const checkAuthentication = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Token non trouvé');
    }

    const response = await axios.get('http://localhost:8000/api/check-auth/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data.message; // Retourne le message de succès si l'utilisateur est authentifié
  } catch (error) {
    localStorage.removeItem('access_token'); // Si erreur, retirer le token du localStorage
    throw new Error('Utilisateur non authentifié');
  }
};
