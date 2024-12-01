import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserAccountForm from './UserAccountForm';
import ProductDataForm from './ProductList';
import UserLogin from './UserLogin';
import CreateProductForm from './CreateProductForm';
import EditProductForm from './EditProductForm';
import DeleteProductForm from './DeleteProductForm';
import LogoutForm from './LogoutForm';
import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div className='App'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <span className='navbar-brand' style={{ cursor: 'default' }}>Loja do vitão</span>
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
              <li className='nav-item'>
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    Produtos
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/createProduct">Criar Produto</Dropdown.Item>
                    <Dropdown.Item href="/editProduct">Editar Produto</Dropdown.Item>
                    <Dropdown.Item href="/deleteProduct">Deletar Produto</Dropdown.Item>
                    <Dropdown.Item href="/listProducts">Listar Produtos</Dropdown.Item>
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
            <Route path="/landing" element={<div className='mt-4'><h1 className='display-4'>Bem-vindo a Loja do Vitão</h1></div>} />
            <Route path="/createAccount" element={<UserAccountForm />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/logout" element={<LogoutForm />} />
            <Route path="/createProduct" element={<ProtectedRoute><CreateProductForm /></ProtectedRoute>} />
            <Route path="/editProduct" element={<ProtectedRoute><EditProductForm /></ProtectedRoute>} />
            <Route path="/deleteProduct" element={<ProtectedRoute><DeleteProductForm /></ProtectedRoute>} />
            <Route path="/listProducts" element={<ProtectedRoute><ProductDataForm /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;