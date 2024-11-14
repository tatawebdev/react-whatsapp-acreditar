const apiUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

// Lida com erros
function handleError(error) {
    if (error.name === 'TypeError') {
        console.log('Network Error:', error.message);
    } else {
        console.log('API Error:', error.message);
    }
}

// Requisição principal
async function request(endpoint, method = 'GET', body = null) {
    const url = `${apiUrl}${endpoint}`;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    };

    const options = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.message || 'Something went wrong'}`);
        }

        const data = await response.json();
        return { data, error: null };
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
