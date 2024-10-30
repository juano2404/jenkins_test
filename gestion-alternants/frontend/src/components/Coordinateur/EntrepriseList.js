import React, { useState } from 'react';
import './style/EntrepriseList.css';
import Modal from './Modal';

const EntreprisesList = ({ entreprises, errorMessage, setEntreprises }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async () => {
    const token = localStorage.getItem('access_token'); // Récupérez le token JWT

    try {
      const response = await fetch(`http://localhost:8000/api/entreprises/delete/${selectedId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Ajoutez le token dans les headers
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'entreprise');
      }

      // Mettez à jour la liste des entreprises après la suppression
      setEntreprises((prevEntreprises) => prevEntreprises.filter((entreprise) => entreprise.id !== selectedId));
      setIsModalOpen(false); // Fermez le modal après la suppression

    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la suppression de l\'entreprise.');
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="list-entreprise-container">
      <h2>Liste des entreprises partenaires</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ul>
        {entreprises.length > 0 ? (
          entreprises.map((entreprise) => (
            <React.Fragment key={entreprise.id}>
              <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{entreprise.nom}</span>
                <img 
                  src="/images/icon-corbeille.png" 
                  alt="Supprimer" 
                  style={{ cursor: 'pointer', width: '14px', height: '14px' }} 
                  onClick={() => confirmDelete(entreprise.id)} // Appel de la fonction de confirmation
                />
              </li>
              <hr className="list-divider" />
            </React.Fragment>
          ))
        ) : (
          <li>Aucune entreprise trouvée.</li>
        )}
      </ul>

      {/* Modal de confirmation */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleDelete} 
      />
    </div>
  );
};

export default EntreprisesList;
