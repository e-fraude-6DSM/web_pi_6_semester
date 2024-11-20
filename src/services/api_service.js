import axios from 'axios';

class ApiService {
  constructor() {
    this.baseUrl = 'http://localhost:8000'; // URL da API
    this.api = axios.create({
      baseURL: this.baseUrl,
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Realizar login
  async login(email, password) {
    const url = `/auth`;
    try {
      const response = await this.api.post(url, { email, password });
      if (response && response.data) {
        localStorage.setItem('authToken', response.data.access_token);
        localStorage.setItem('name', response.data.user.name); 
        return response.data;
      } else {
        throw new Error('Falha ao realizar login');
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data ? error.response.data : error.message;
      throw new Error(`Falha ao realizar login: ${errorMessage}`);
    }
  }

  // Criar um novo input
  async createInput(inputData) {
    const url = `/input`;
    try {
      const response = await this.api.post(url, inputData);
      return response.data;
    } catch (error) {
      throw new Error(`Falha ao criar input: ${error.message}`);
    }
  }

  // Obter input pelo ID
  async getInputById(inputId) {
    const url = `/input/${inputId}`;
    try {
      const response = await this.api.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Falha ao buscar input: ${error.message}`);
    }
  }

  // Listar todos os inputs
  async listInputs() {
    const url = `/input`;
    try {
      const response = await this.api.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Falha ao buscar inputs: ${error.message}`);
    }
  }

  // Obter fraude pelo ID
  async getFraudById(fraudId) {
    const url = `/fraud/${fraudId}`;
    try {
      const response = await this.api.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Falha ao buscar fraude: ${error.message}`);
    }
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }
}

const apiService = new ApiService();
export default apiService;
