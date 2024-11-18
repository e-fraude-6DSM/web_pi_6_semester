import React from 'react';
import './ItemTransacao.css';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatDateTime = (dateString) => {
  return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const ItemTransacao = ({ transaction, onClick }) => {
  return (
    <div className="itemTransacao" onClick={() => onClick(transaction.id)}>
      <p><strong>Data e Hora:</strong> {formatDateTime(transaction.trans_date_trans_time)}</p>
      <p><strong>Categoria:</strong> {transaction.category}</p>
      <p><strong>Valor:</strong> {formatCurrency(transaction.amt)}</p>
    </div>
  );
};

export default ItemTransacao;
