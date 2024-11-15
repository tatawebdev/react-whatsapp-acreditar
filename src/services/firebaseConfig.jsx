// services/firebaseConfig.jsx
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

// Configurações do Firebase (substitua com suas credenciais do Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyBlSfmSaPpJAsDjPeW-UOS35KgIHN2Id4s",
    authDomain: "chat-bot-acreditar.firebaseapp.com",
    projectId: "chat-bot-acreditar",
    storageBucket: "chat-bot-acreditar.firebasestorage.app",
    messagingSenderId: "1086360314150",
    appId: "1:1086360314150:web:10af74f63b6268486ce1e7",
    measurementId: "G-JJSQ3E9G7L",
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar o serviço de mensagens (FCM)
const messaging = getMessaging(app);

// Função para solicitar permissão e obter o token do FCM
export const requestFCMPermission = async () => {
    try {
        if ('serviceWorker' in navigator) {
            await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            console.log('Service Worker registrado com sucesso');
        }

        const token = await getToken(messaging, {
            vapidKey: 'BK8YUUpSo8bUbMwPgfjAVYXQU0bMas_Gn-VZTphfjlgEq0y0s75Ua8z6AlXfXzsfMTP31rcbZ67bUaOz3lqnwgA',
        });

        if (token) {
            console.log('Token FCM:', token);
            return token;
        } else {
            console.log('Nenhum token FCM disponível.');
        }
    } catch (error) {
        console.error('Erro ao obter o token de FCM:', error);
    }
};

// Exportar o messaging e app
export { messaging };
export default app;
