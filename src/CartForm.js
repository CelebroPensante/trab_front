import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartForm = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [responseMessage, setResponseMessage] = useState('');

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const email = localStorage.getItem('userEmail'); // Supondo que o email do usuário está armazenado no localStorage
      const response = await axios.get(`http://localhost:8080/cart/showCart`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          userid: email // Corrigido para enviar o parâmetro correto
        }
      });
      console.log('Response data:', response.data); // Adiciona um log para verificar o conteúdo da resposta
      if (response.data && Array.isArray(response.data.itens)) {
        const itemCounts = response.data.itens.reduce((acc, item) => {
          acc[item] = (acc[item] || 0) + 1;
          return acc;
        }, {});
        setCartItems(Object.entries(itemCounts));
        setTotalPrice(response.data.totalPrice);
        setResponseMessage('');
      } else {
        setCartItems([]);
        setTotalPrice(0);
        setResponseMessage('Erro ao carregar itens do carrinho');
      }
    } catch (error) {
      setResponseMessage('Erro ao carregar itens do carrinho');
    }
  };

  const handleDeleteItem = async (item) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const email = localStorage.getItem('userEmail');
      const response = await axios.delete('http://localhost:8080/cart/deleteItem', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          userid: email,
          item: item
        }
      });
      if (response.status === 200) {
        fetchCartItems(); // Atualiza a lista de itens do carrinho após a exclusão
      } else {
        setResponseMessage('Erro ao excluir item do carrinho');
      }
    } catch (error) {
      setResponseMessage('Erro ao excluir item do carrinho');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <h3 className="mb-4 text-center">Itens no Carrinho</h3>
        {responseMessage && <div className="alert alert-info">{responseMessage}</div>}
        <ul className="list-group mb-3">
          {cartItems.map(([item, count], index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>Produto:</strong> {item} <br />
                <strong>Quantidade:</strong> {count}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(item)}>Remover item</button>
            </li>
          ))}
        </ul>
        <div className="text-end">
          <strong>Preço Total:</strong> R$ {totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartForm;