import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ProductDataForm = ({ setProducts }) => {
  const [responseMessage, setResponseMessage] = useState('');

  const handleListAll = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get('http://localhost:8080/products/getAllProducts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data); // Armazena os produtos no estado
      setResponseMessage('');
    } catch (error) {
      setResponseMessage('Erro ao listar produtos');
    }
  };

  useEffect(() => {
    handleListAll();
  }, []);

  return (
    <div className='user-account-form'>
      <h3>Lista de produtos</h3>
      {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
    </div>
  );
};

export default ProductDataForm;