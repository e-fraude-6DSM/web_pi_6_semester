import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../services/api_service';
import './Detalhe.css';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatDateTime = (dateString) => {
  return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const Detalhe = () => {
  const { id } = useParams();
  const [transacao, setTransacao] = useState(null);
  const [error, setError] = useState(null);
  const [isFraud, setIsFraud] = useState(null);

  useEffect(() => {
    const fetchTransacao = async () => {
      try {
        const data = await apiService.getInputById(id);
        setTransacao(data);

        const fraudResult = await apiService.getFraudById(data.id);
        if (fraudResult.is_fraud === 1) {
          setIsFraud(true);
        } else {
          setIsFraud(false);
        }
      } catch (err) {
        toast.error(`${err.message}`);
        setError(`${err.message}`);
      }
    };
    fetchTransacao();
  }, [id]);


  if (error) return (
    <div className="detalhe">
      <h1 className='titulo'>Detalhes da transação</h1>
      <ToastContainer />
      <p><strong>Data e Hora:</strong> {formatDateTime(transacao.trans_date_trans_time)}</p>
      <p><strong>Número do Cartão:</strong> {transacao.cc_num}</p>
      <p><strong>Estabelecimento:</strong> {transacao.merchant}</p>
      <p><strong>Categoria:</strong> {transacao.category}</p>
      <p><strong>Valor:</strong> {formatCurrency(transacao.amt)}</p>
      <p><strong>Nome:</strong> {`${transacao.first} ${transacao.last}`}</p>
      <p><strong>Gênero:</strong> {transacao.gender}</p>
      <p><strong>Endereço:</strong> {`${transacao.street}, ${transacao.city}, ${transacao.state}`}</p>
      <p><strong>Latitude:</strong> {transacao.lat}</p>
      <p><strong>Longitude:</strong> {transacao.long}</p>
      <p><strong>População da Cidade:</strong> {transacao.city_pop}</p>
      <p><strong>Profissão:</strong> {transacao.job}</p>
      <p><strong>Data de Nascimento:</strong> {formatDateTime(transacao.dob)}</p>
      <p><strong>Número da Transação:</strong> {transacao.trans_num}</p>
      <p><strong>Unix_time da transação:</strong> {transacao.unix_time}</p>
      <p><strong>Resultado da análise:</strong></p>
      <button onClick={() => window.history.back()} className='botao'>VOLTAR</button>
    </div>   
  );

  if (!transacao) return (
    <div className="detalhe">
      <h1 className='titulo'>Detalhes da transação</h1>
      <p><strong>Data e Hora:</strong></p>
      <p><strong>Número do Cartão:</strong></p>
      <p><strong>Estabelecimento:</strong></p>
      <p><strong>Categoria:</strong></p>
      <p><strong>Valor:</strong> </p>
      <p><strong>Nome:</strong></p>
      <p><strong>Gênero:</strong></p>
      <p><strong>Endereço:</strong></p>
      <p><strong>Latitude:</strong></p>
      <p><strong>Longitude:</strong></p>
      <p><strong>População da Cidade:</strong></p>
      <p><strong>Profissão:</strong> </p>
      <p><strong>Data de Nascimento:</strong></p>
      <p><strong>Número da Transação:</strong> </p>
      <p><strong>Unix_time da transação:</strong></p>
      <p><strong>Resultado da análise:</strong></p>
      <button onClick={() => window.history.back()} className='botao'>VOLTAR</button>
    </div>   
  );
  
  return (
    <div className="detalhe">
      <h1 className='titulo'>Detalhes da transação</h1>
      <p><strong>Data e Hora:</strong> {formatDateTime(transacao.trans_date_trans_time)}</p>
      <p><strong>Número do Cartão:</strong> {transacao.cc_num}</p>
      <p><strong>Estabelecimento:</strong> {transacao.merchant}</p>
      <p><strong>Categoria:</strong> {transacao.category}</p>
      <p><strong>Valor:</strong> {formatCurrency(transacao.amt)}</p>
      <p><strong>Nome:</strong> {`${transacao.first} ${transacao.last}`}</p>
      <p><strong>Gênero:</strong> {transacao.gender}</p>
      <p><strong>Endereço:</strong> {`${transacao.street}, ${transacao.city}, ${transacao.state}`}</p>
      <p><strong>Latitude:</strong> {transacao.lat}</p>
      <p><strong>Longitude:</strong> {transacao.long}</p>
      <p><strong>População da Cidade:</strong> {transacao.city_pop}</p>
      <p><strong>Profissão:</strong> {transacao.job}</p>
      <p><strong>Data de Nascimento:</strong> {formatDateTime(transacao.dob)}</p>
      <p><strong>Número da Transação:</strong> {transacao.trans_num}</p>
      <p><strong>Unix_time da transação:</strong> {transacao.unix_time}</p>
      <p>
        <strong>Resultado da análise:</strong>{" "}
        {isFraud === null ? (
          <span>Carregando análise...</span>
        ) : isFraud ? (
          <span className="fraud-alert">É FRAUDE!</span>
        ) : (
          <span className="no-fraud">NÃO É FRAUDE!</span>
        )}
      </p>
      <button onClick={() => window.history.back()} className='botao'>VOLTAR</button>
    </div>   
  );
};

export default Detalhe;
