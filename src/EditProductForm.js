import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProductForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    descricao: '',
    preco: '',
    estoque: ''
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
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put(`http://localhost:8080/products/updateProduct`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setResponseMessage('Produto editado com sucesso!');
      } else {
        setResponseMessage('Erro ao editar produto.');
      }
    } catch (error) {
      setResponseMessage('Falha ao conectar ao servidor.');
    }
  };

  const [responseMessage, setResponseMessage] = useState('');

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="user-account-form card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-4 text-center">Editar Produto</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID:</label>
            <input
              className="form-control"
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Nome:</label>
            <input
              className="form-control"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descrição:</label>
            <input
              className="form-control"
              type="text"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Preço:</label>
            <input
              className="form-control"
              type="number"
              name="preco"
              value={formData.preco}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Estoque:</label>
            <input
              className="form-control"
              type="number"
              name="estoque"
              value={formData.estoque}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary w-100">Editar</button>
          </div>
        </form>
        <div className="text-center">
          <p>{responseMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;