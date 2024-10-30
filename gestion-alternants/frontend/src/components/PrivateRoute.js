// src/components/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuthentication } from './checkAuthentication'; // Assurez-vous que le chemin est correct

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // État pour suivre l'authentification

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        await checkAuthentication(); // Vérifie si l'utilisateur est authentifié
        setIsAuthenticated(true); // L'utilisateur est authentifié
      } catch (error) {
        setIsAuthenticated(false); // L'utilisateur n'est pas authentifié
      }
    };

    verifyAuthentication(); // Appel de la fonction pour vérifier l'authentification
  }, []);

  // Si l'état d'authentification est null, vous pouvez afficher un loader ou rien
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Vous pouvez remplacer cela par un loader
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
