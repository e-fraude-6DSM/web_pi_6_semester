import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Analise.css';
import Input from '../../components/Input';
import apiService from '../../services/api_service';
import ItemTransacao from '../../components/ItemTransacao';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Analise = () => {
  const [inputId, setInputId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiService.listInputs();
        setTransactions(response);
      } catch (error) {
        toast.error(`Erro ao carregar transações: ${error.message}`);
      }
    };

    fetchTransactions();
  }, []);

  const handleBuscarTransacao = async () => {
    if (inputId.trim() === '') {
      const response = await apiService.listInputs();
      setTransactions(response);
      return;
    }
    toast.dismiss();

    try {
      const response = await apiService.getInputById(inputId);
      if (response) {
        setTransactions([response]);
      } else {
        toast.error('Transação não encontrada.');
      }
    } catch (error) {
      toast.error(`Erro ao buscar transação: ${error.message}`);
    }
  };

  const handleVerDetalhes = (id) => {
    navigate(`/detalhe/${id}`);
  };

  return (
    <div className="analise">
      <h1 className='titulo'>Análise de Transação</h1>
      <div className='analise-container'>
        <Input className='input-analise'
          label='ID da transação'
          type='text'
          style={{ color: 'black' }}
          placeholder=''
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button onClick={handleBuscarTransacao} className='botao'>BUSCAR TRANSAÇÃO</button>
        <div className="lista-transacao">
          {transactions.map((transaction) => (
            <ItemTransacao
              key={transaction.id}
              transaction={transaction}
              onClick={handleVerDetalhes}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Analise;
