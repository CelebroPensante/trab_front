import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  const handleAddToCart = async (item) => {
    const token = localStorage.getItem('jwtToken');
    const email = localStorage.getItem('userEmail');

    if (!token || !email) {
      alert('Você precisa estar logado para adicionar itens ao carrinho.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/cart/addItem', {
        userid: email,
        item: item
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        alert('Item adicionado ao carrinho com sucesso!');
      } else {
        alert('Erro ao adicionar item ao carrinho.');
      }
    } catch (error) {
      alert('Erro ao adicionar item ao carrinho.');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Produtos Disponíveis</h3>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.nome}</h5>
                <p className="card-text">{product.descricao}</p>
                <p className="card-text"><strong>Preço:</strong> R$ {product.preco.toFixed(2)}</p>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product.nome)}>Adicionar ao Carrinho</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;