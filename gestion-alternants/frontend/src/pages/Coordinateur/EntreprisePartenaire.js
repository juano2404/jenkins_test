// src/components/EntreprisePartenaire.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar'; // Sidebar que tu as déjà créée
import EntreprisesList from '../../components/Coordinateur/EntrepriseList';
import './style/EntreprisePartenaire.css';
import EntrepriseForm from '../../components/Coordinateur/EntrepriseForm';
import axios from 'axios';

const EntreprisePartenaire = () => {
  const [entreprises, setEntreprises] = useState([]); // Assurez-vous que setEntreprises est ici
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour récupérer la liste des entreprises
  const fetchEntreprises = async () => {
    const accessToken = localStorage.getItem('access_token');

    try {
      const response = await axios.get('http://localhost:8000/api/entreprises/', {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Utiliser le token JWT pour l'authentification
        },
      });
      setEntreprises(response.data); // Stocker les entreprises dans l'état
    } catch (error) {
      setErrorMessage("Erreur lors du chargement des entreprises.");
      console.error('Erreur de chargement des entreprises:', error);
    }
  };

  // Appel de la fonction pour charger les entreprises lors du premier rendu
  useEffect(() => {
    fetchEntreprises();
  }, []);

  // Fonction pour rafraîchir la liste des entreprises
  const refreshEntreprises = () => {
    fetchEntreprises(); // Appeler fetchEntreprises pour mettre à jour la liste
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <h1>Entreprise partenaires</h1>
        <div className="flex-container">
          <div className="entreprises-list">
            {/* Assurez-vous que setEntreprises est passé comme prop */}
            <EntreprisesList entreprises={entreprises} errorMessage={errorMessage} setEntreprises={setEntreprises} />
          </div>
          <div className="entreprise-form">
            <EntrepriseForm onEntrepriseCreated={refreshEntreprises} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntreprisePartenaire;
