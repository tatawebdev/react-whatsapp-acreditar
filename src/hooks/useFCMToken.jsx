// hooks/useFCMToken.js
import { useEffect } from 'react';
import { post } from '../services/api';

function useFCMToken(token) {
    useEffect(() => {
        const storedToken = localStorage.getItem('fcm_token');

        if (token && token !== storedToken) {
            const data = {
                fcm_token: token,
            };

            post('/phone/token', data)
                .then((response) => {
                    console.log('Resposta do servidor:', response);
                    localStorage.setItem('fcm_token', token);
                })
                .catch((error) => {
                    console.error('Resposta do servidor Erro ao enviar o token FCM:', error);
                });
        }
    }, [token]);
}

export default useFCMToken;
