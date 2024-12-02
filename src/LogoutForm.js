import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LogoutForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpa o token JWT do localStorage
    localStorage.removeItem('jwtToken');
    // Redireciona para a página de login
    navigate('/login');
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="user-account-form card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-4 text-center">Você saiu da conta</h3>
        <p className="text-center">Redirecionando para a página de login...</p>
      </div>
    </div>
  );
};

export default LogoutForm;