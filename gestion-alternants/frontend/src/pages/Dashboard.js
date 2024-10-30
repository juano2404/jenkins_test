// src/components/Dashboard.js
import React from 'react';
import ApprentiDashboard from './Apprenti/ApprentiDashboard';
import CoordinateurDashboard from './Coordinateur/CoordinateurDashboard';
import Sidebar from '../components/Sidebar'; // Sidebar que tu as déjà créée

const Dashboard = () => {
  const userType = localStorage.getItem('user_type'); // Récupérer le type d'utilisateur

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        {userType === 'apprenti' && <ApprentiDashboard />}
        {userType === 'coordinateur' && <CoordinateurDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
