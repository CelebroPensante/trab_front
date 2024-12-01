import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ProductDataForm = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [products, setProducts] = useState([]); // Estado para armazenar os produtos

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

  // UseEffect para carregar os produtos ao montar o componente
  useEffect(() => {
    handleListAll();
  }, []);

  return (
    <div className='user-account-form'>
      <h3>Lista de produtos</h3>
      {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
      <div className='mt-4'>
        <ul className='list-group'>
          {products.map((product) => (
            <li key={product.id} className='list-group-item'>
              <strong>ID:</strong> {product.id} <br />
              <strong>Produto:</strong> {product.nome} <br />
              <strong>Descrição:</strong> {product.descricao} <br />
              <strong>Preço:</strong> {product.preco} <br />
              <strong>Estoque:</strong> {product.estoque}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDataForm;