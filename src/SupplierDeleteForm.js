import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SupplierDeleteForm = () => {
  const [supplierId, setSupplierId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setSupplierId(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.delete(`http://localhost:8080/suppliers/deleteSupplier`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { id: supplierId }
      });
      if (response.status === 200) {
        setResponseMessage('Fornecedor deletado com sucesso!');
        setSupplierId('');
      } else {
        setResponseMessage('Erro ao deletar o fornecedor.');
      }
    } catch (error) {
      setResponseMessage('Falha ao conectar ao servidor.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="supplier-delete-form card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-4 text-center">Deletar Fornecedor</h3>
        <form onSubmit={handleDelete}>
          <div className="form-group">
            <label>ID do Fornecedor:</label>
            <input
              className="form-control"
              type="text"
              name="supplierId"
              value={supplierId}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger btn-block mt-3">Deletar Fornecedor</button>
        </form>
        <p className="text-center mt-3">{responseMessage}</p>
      </div>
    </div>
  );
};

export default SupplierDeleteForm;