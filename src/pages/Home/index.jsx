import React from 'react';
import './Home.css';
import Item from '../../components/Item';

const Home = () => {
  return (
    <div className="home">
      <h1 className='titulo'>Início</h1>
      <div className='items'>
        <Item title="Análise de Transação" to="/analise" />
        <Item title="Cadastro de Transação" to="/cadastro" />
      </div>
    </div>    
  );
};

export default Home;
