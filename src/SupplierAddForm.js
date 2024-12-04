import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SupplierForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    productId: ''
  });

  const [products, setProducts] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

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
        setResponseMessage('Erro ao carregar produtos');
      }
    };

    fetchProducts();
  }, []);

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
      const response = await axios.post('http://localhost:8080/suppliers/newSupplier', formData);
      if (response.status === 200) {
        setResponseMessage('Fornecedor criado com sucesso!');
      } else {
        setResponseMessage('Erro ao criar o fornecedor.');
      }
    } catch (error) {
      setResponseMessage('Falha ao conectar ao servidor.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="supplier-form card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-4 text-center">Adicionar Fornecedor</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
            <label>Telefone:</label>
            <input
              className="form-control"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Endereço:</label>
            <input
              className="form-control"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Produto:</label>
            <select
              className="form-control"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um produto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.nome}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">Adicionar Fornecedor</button>
        </form>
        <p className="text-center mt-3">{responseMessage}</p>
      </div>
    </div>
  );
};

export default SupplierForm;