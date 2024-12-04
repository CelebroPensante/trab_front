import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SupplierEditForm = () => {
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

  const handleFetchSupplier = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get(`http://localhost:8080/suppliers/getSupplierByName`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: { name: formData.name }
      });
      if (response.status === 200) {
        setFormData(response.data);
      } else {
        setResponseMessage('Erro ao buscar fornecedor.');
      }
    } catch (error) {
      setResponseMessage('Falha ao conectar ao servidor.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put('http://localhost:8080/suppliers/updateSupplierByName', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setResponseMessage('Fornecedor atualizado com sucesso!');
      } else {
        setResponseMessage('Erro ao atualizar o fornecedor.');
      }
    } catch (error) {
      setResponseMessage('Falha ao conectar ao servidor.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="supplier-edit-form card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-4 text-center">Editar Fornecedor</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Fornecedor:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <button type="button" className="btn btn-secondary btn-block mt-3" onClick={handleFetchSupplier}>Buscar Fornecedor</button>
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
              {products && products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.nome}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">Atualizar Fornecedor</button>
        </form>
        <p className="text-center mt-3">{responseMessage}</p>
      </div>
    </div>
  );
};

export default SupplierEditForm;