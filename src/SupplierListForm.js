import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SupplierListForm = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8080/suppliers/getAllSuppliers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSuppliers(response.data);
      } catch (error) {
        setResponseMessage('Erro ao carregar fornecedores');
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="supplier-list-form card p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <h3 className="mb-4 text-center">Lista de Fornecedores</h3>
        {responseMessage && <div className="alert alert-info">{responseMessage}</div>}
        <ul className="list-group mb-3">
          {suppliers.map((supplier, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>Nome:</strong> {supplier.name} <br />
                <strong>Email:</strong> {supplier.email} <br />
                <strong>Telefone:</strong> {supplier.phone} <br />
                <strong>Endereço:</strong> {supplier.address} <br />
                <strong>Produto:</strong> {supplier.productName}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SupplierListForm;