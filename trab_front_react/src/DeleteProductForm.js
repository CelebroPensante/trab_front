import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const DeleteProductForm = () => {
    const [productId, setProductId] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setProductId(e.target.value);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            console.log('Deletando produto com ID:', productId); // Log para depuração
            const token = localStorage.getItem('jwtToken');
            const response = await axios.delete(`http://localhost:8080/products/deleteProduct`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { id: productId }
            });
            console.log('Resposta da API:', response.data); // Log para depuração
            setResponseMessage(response.data.message || 'Produto deletado com sucesso');
            setProductId('');
        } catch (error) {
            console.error('Erro ao deletar o produto:', error); // Log para depuração
            setResponseMessage('Erro ao deletar o produto');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm">
                <h3>Deletar Produto</h3>
                <form className="form-group" onSubmit={handleDelete}>
                    <div className="mb-3">
                        <label className="fw-bold text-center d-block">ID do Produto:</label>
                        <input
                            type='text'
                            name='productId'
                            value={productId}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <button type='submit' className='btn btn-danger btn-block mt-3 mx-1'>Deletar</button>
                </form>
                {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
            </div>
        </div>
    );
};

export default DeleteProductForm;