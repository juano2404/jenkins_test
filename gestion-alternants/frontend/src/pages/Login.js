import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './style/Login.css';
import logo from '../eseo-logo.webp'; // Importer le logo ici
import eyeIcon from '../oeil.png'; // Importer l'icône de l'œil fermée
import eyeIconOpen from '../oeil-ouvert.png'; // Importer l'icône de l'œil ouverte

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // État pour la visibilité du mot de passe
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Authentifier l'utilisateur et obtenir les tokens
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      // Récupérer les informations de l'utilisateur
      const userResponse = await axios.get('http://localhost:8000/api/check-auth/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = userResponse.data;
      const userType = userData.user_type; // Type d'utilisateur
      const nom = userData.nom; // Récupérer le nom
      const prenom = userData.prenom; // Récupérer le prénom

      // Stocker le type d'utilisateur dans le localStorage
      localStorage.setItem('user_type', userType);
      localStorage.setItem('nom', nom);
      localStorage.setItem('prenom', prenom);



      setSuccessMessage(`Bienvenue, ${username}!`);
      setErrorMessage('');

      // Nettoyer les champs de saisie
      setUsername('');
      setPassword('');

      // Rediriger vers le tableau de bord commun
      setTimeout(() => {
        navigate('/dashboard'); // Rediriger vers le tableau de bord
      }, 1000);

    } catch (error) {
      console.error('Erreur lors de la connexion:', error);

      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage('Identifiants invalides.');
        } else {
          setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
        }
      } else {
        setErrorMessage('Erreur de connexion au serveur.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Connexion</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={showPassword ? eyeIconOpen : eyeIcon} // Change d'icône selon l'état
              alt={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div className="password-link-container">
            <p style={{ margin: 0, color: '#000000' }}>Mot de passe oublié ?</p>
            <Link to="/forgot-password" className="link-cliquez-ici">Cliquez ici</Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" style={{ width: '45%', marginRight: '0' }}>
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
