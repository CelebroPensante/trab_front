import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'; // Adiciona a importação do axios
import UserAccountForm from './UserAccountForm';
import UserLogin from './UserLogin';
import CreateProductForm from './CreateProductForm';
import EditProductForm from './EditProductForm';
import DeleteProductForm from './DeleteProductForm';
import LogoutForm from './LogoutForm';
import CartForm from './CartForm';
import ProtectedRoute from './ProtectedRoute';
import ProductList from './ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8080/products/getAllProducts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao listar produtos', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Router>
      <div className='App'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <span className='navbar-brand' style={{ cursor: 'default' }}>Loja do Vitão</span>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <a className='nav-link btn' href="/createAccount">Criar Conta</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link btn' href="/login">Login</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link btn' href="/logout">Sair</a>
              </li>
              <li>
                <a className='nav-link btn' href="/landing">Home</a>
              </li>
              <li>
                <a className='nav-link btn' href="/cart">Carrinho</a>
              </li>
              <li className='nav-item'>
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    Produtos
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/createProduct">Criar Produto</Dropdown.Item>
                    <Dropdown.Item href="/editProduct">Editar Produto</Dropdown.Item>
                    <Dropdown.Item href="/deleteProduct">Deletar Produto</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
        {/*conteudo principal*/}
        <div className='container text-center mt-5'>
          <Routes>
            <Route path="/" element={<Navigate to="/landing" />} />
            <Route path="/landing" element={<ProductList products={products} />} />
            <Route path="/createAccount" element={<UserAccountForm />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/logout" element={<LogoutForm />} />
            <Route path="/cart" element={<ProtectedRoute><CartForm /></ProtectedRoute>} />
            <Route path="/createProduct" element={<ProtectedRoute><CreateProductForm /></ProtectedRoute>} />
            <Route path="/editProduct" element={<ProtectedRoute><EditProductForm /></ProtectedRoute>} />
            <Route path="/deleteProduct" element={<ProtectedRoute><DeleteProductForm /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;