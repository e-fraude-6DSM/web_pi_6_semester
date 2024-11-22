import React, { useState } from "react";
import apiService from "../../services/api_service";
import "./Cadastro.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    trans_date_trans_time: "",
    cc_num: "",
    merchant: "",
    category: "",
    amt: "",
    first: "",
    last: "",
    gender: "",
    street: "",
    city: "",
    state: "",
    lat: "",
    long: "",
    city_pop: "",
    job: "",
    dob: "",
    trans_num: "",
    unix_time: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const transformData = (data) => {
    return {
      ...data,
      amt: parseFloat(data.amt), 
      lat: parseFloat(data.lat), 
      long: parseFloat(data.long), 
      city_pop: parseInt(data.city_pop, 10),
      unix_time: parseInt(data.unix_time, 10), 
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transformedData = transformData(formData);
      await apiService.createInput(transformedData);
      toast.success("Transação cadastrada com sucesso!");
      setFormData({
        trans_date_trans_time: "",
        cc_num: "",
        merchant: "",
        category: "",
        amt: "",
        first: "",
        last: "",
        gender: "",
        street: "",
        city: "",
        state: "",
        lat: "",
        long: "",
        city_pop: "",
        job: "",
        dob: "",
        trans_num: "",
        unix_time: ""
      });
    } catch (error) {
      toast.error(`Erro ao cadastrar transação.`);
    }
  };

  return (
    <div className="cadastro-transacao">
      <h1 className='titulo'>Cadastro de Transação</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Data e Hora da Transação
          <input
            type="datetime-local"
            name="trans_date_trans_time"
            value={formData.trans_date_trans_time}
            onChange={handleChange}
          />
        </label>
        <label>
          Número do Cartão
          <input
            type="text"
            name="cc_num"
            value={formData.cc_num}
            onChange={handleChange}
          />
        </label>
        <label>
          Estabelecimento
          <input
            type="text"
            name="merchant"
            value={formData.merchant}
            onChange={handleChange}
          />
        </label>
        <label>
          Categoria
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Valor
          <input
            type="number"
            name="amt"
            value={formData.amt}
            onChange={handleChange}
          />
        </label>
        <label>
          Nome
          <input
            type="text"
            name="first"
            value={formData.first}
            onChange={handleChange}
          />
        </label>
        <label>
          Sobrenome
          <input
            type="text"
            name="last"
            value={formData.last}
            onChange={handleChange}
          />
        </label>
        <label>
          Gênero
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </label>
        <label>
          Endereço
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
        </label>
        <label>
          Cidade
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <label>
          Estado
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
            <option value="EX">Estrangeiro</option>
          </select>
        </label>
        <label>
          Latitude
          <input
            type="number"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
          />
        </label>
        <label>
          Longitude
          <input
            type="number"
            name="long"
            value={formData.long}
            onChange={handleChange}
          />
        </label>
        <label>
          População da Cidade
          <input
            type="number"
            name="city_pop"
            value={formData.city_pop}
            onChange={handleChange}
          />
        </label>
        <label>
          Profissão
          <input
            type="text"
            name="job"
            value={formData.job}
            onChange={handleChange}
          />
        </label>
        <label>
          Data de Nascimento
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </label>
        <label>
          Número da Transação
          <input
            type="text"
            name="trans_num"
            value={formData.trans_num}
            onChange={handleChange}
          />
        </label>
        <label>
          Unix Time
          <input
            type="number"
            name="unix_time"
            value={formData.unix_time}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Cadastro;
