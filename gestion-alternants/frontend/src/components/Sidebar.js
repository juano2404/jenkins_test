import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation
import './style/Sidebar.css'; // Importer le fichier CSS pour le style
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const nom = localStorage.getItem('nom');      
  const prenom = localStorage.getItem('prenom');

  useEffect(() => {
    // Récupérer le type d'utilisateur et le nom d'utilisateur depuis le localStorage
    const storedUserType = localStorage.getItem('user_type');
    const storedUsername = localStorage.getItem('username');
    setUserType(storedUserType);
    setUsername(storedUsername);
  }, []);

  return (
    <div className="sidebar">
      <ul>
        <li className='header'>
          <Link to="/profile">
            <img className="icon" src="/images/icon-compte.png" alt="Icon Compte" />
            <h2>{nom && prenom && <p>{prenom} {nom}</p>}</h2>
            <p>{userType === 'apprenti' ? 'Alternant' : 'Coordinateur'}</p> {/* Affiche "Alternant" ou "Coordinateur" */}
          </Link>
        </li>

        {/* Liens communs */}
        <li className='list center'>
          <Link to="/home">
            <img src="/images/icon-accueil.png" alt="Home Icon" className="icon-list" />
            Accueil
          </Link>
        </li>

        <li className='list center'>
          <Link to="/notification">
            <img src="/images/icon-accueil.png" alt="Dashboard Icon" className="icon-list" />
            Notification
          </Link>
        </li>

        {/* Liens spécifiques aux apprentis */}
        {userType === 'apprenti' && (
          <>
            <li className='list center'>
              <Link to="/mes-formations">
              <img src="/images/icon-accueil.png" alt="Home Icon" className="icon-list" />
              Mes Formations
              </Link>
            </li>
            <li className='list center'>
              <Link to="/mes-projets">
                <img src="/images/icon-accueil.png" alt="Home Icon" className="icon-list" />
                Mes Projets
              </Link>
            </li>
            <li className='list center'>
              <Link to="/mon-suivi">
                <img src="/images/icon-accueil.png" alt="Home Icon" className="icon-list" />
                Mon Suivi
              </Link>
            </li>
          </>
        )}

        {/* Liens spécifiques aux coordinateurs */}
        {userType === 'coordinateur' && (
          <>
            <li className='list center'>
              <Link to="/entreprise-partenaire">
                <img src="/images/icon-accueil.png" alt="Home Icon" className="icon-list" />
                Entreprise partenaire
              </Link>
            </li>
            <li className='list center'>
              <Link to="/equipe-tutoral">
                <img src="/images/icon-accueil.png" alt="Planning Icon" className="icon-list" />
                Equipe tutoral
              </Link>
            </li>
            <li className='list center'>
              <Link to="/journal-formation">
                <img src="/images/icon-accueil.png" alt="Rapports Icon" className="icon-list" />
                Journaux de formations
              </Link>
            </li>
            <li className='list center'>
              <Link to="/calendrier">
                <img src="/images/icon-accueil.png" alt="Rapports Icon" className="icon-list" />
                Calendrier
              </Link>
            </li>
          </>
        )}

        {/* Liens communs */}
        <li className='list center'>
          <Link to="/profile">
            <img src="/images/icon-accueil.png" alt="Settings Icon" className="icon-list" />
            Profile
          </Link>
        </li>
        <li className='list center'>
          <img src="/images/icon-accueil.png" alt="Logout Icon" className="icon-list" />
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
