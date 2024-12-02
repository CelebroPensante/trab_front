import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/login/', formData);
      if (response.status === 200) {
        const token = response.data.token; // Supondo que o token JWT está na resposta
        localStorage.setItem('jwtToken', token); // Armazena o token no localStorage
        localStorage.setItem('userEmail', formData.email); // Armazena o email do usuário no localStorage
        setResponseMessage('Login efetuado com sucesso!');
      } else {
        setResponseMessage('Erro ao efetuar login.');
      }
    } catch (error) {
      setResponseMessage('Falha ao conectar ao servidor.');
    }
  };

  const [responseMessage, setResponseMessage] = useState('');

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="user-account-form card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-4 text-center">Faça seu login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Senha:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary w-100">Entrar</button>
          </div>
        </form>
        <div className="text-center">
          <p>{responseMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;