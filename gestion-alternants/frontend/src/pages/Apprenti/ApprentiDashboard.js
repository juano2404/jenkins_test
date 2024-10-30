// src/components/Dashboard.js
import React from 'react';
import Sidebar from '../../components/Sidebar';
import './style/Dashboard.css'; // Assurez-vous d'importer le fichier CSS


const Dashboard = () => {
  const username = localStorage.getItem('username'); // Récupérer le nom d'utilisateur du stockage local

  return (
    
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <h2>Tableau de Bord</h2>
        {username && <p>Bienvenue, {username}!</p>} {/* Afficher le nom d'utilisateur */}
        <p>Ceci est votre tableau de bord. Vous pouvez y ajouter vos fonctionnalités ici.</p>

        {/* Ajoutez d'autres composants ou sections selon vos besoins */}
        <div>
          <h3>Fonctionnalités à venir :</h3>
          <ul>
            <li>Gestion des utilisateurs</li>
            <li>Statistiques</li>
            <li>Rapports</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
