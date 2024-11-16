import axios from 'axios';

// Configura o URL base e o cabeçalho de autenticação
const apiUrl = import.meta.env.VITE_BASE_URL + "/api";
const apiKey = import.meta.env.VITE_API_KEY;

// Cria uma instância do axios
const AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
});

// Lida com erros
function handleError(error) {
  if (error.response) {
    // O servidor respondeu com um código de status fora da faixa de 2xx
    //console.log('API Error:', error.response.data.message || error.message);
  } else if (error.request) {
    // A solicitação foi feita, mas nenhuma resposta foi recebida
    //console.log('Network Error:', error.message);
  } else {
    // Algo aconteceu ao configurar a solicitação
    //console.log('Error:', error.message);
  }
}

// Função específica para enviar imagens usando FormData
export const postImage = async (endpoint, formData) => {
    try {
      const response = await AxiosInstance.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Define o cabeçalho correto para upload de arquivos
        },
      });
      return { data: response.data, error: null };
    } catch (error) {
      handleError(error);
      return { data: null, error };
    }
  };
  

// Requisição principal usando axios
async function request(endpoint, method = 'GET', body = null) {
  try {
    const response = await AxiosInstance({
      url: endpoint,
      method,
      data: body,
    });

    return { data: response.data, error: null };
  } catch (error) {
    handleError(error);
    return { data: null, error };
  }
}

// Métodos de requisição específicos
export const get = (endpoint) => request(endpoint, 'GET');
export const post = (endpoint, body) => request(endpoint, 'POST', body);
export const put = (endpoint, body) => request(endpoint, 'PUT', body);
export const del = (endpoint) => request(endpoint, 'DELETE');
