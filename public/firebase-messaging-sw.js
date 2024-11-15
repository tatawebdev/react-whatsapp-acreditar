// Importar scripts Firebase no Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBlSfmSaPpJAsDjPeW-UOS35KgIHN2Id4s",
    authDomain: "chat-bot-acreditar.firebaseapp.com",
    projectId: "chat-bot-acreditar",
    storageBucket: "chat-bot-acreditar.firebasestorage.app",
    messagingSenderId: "1086360314150",
    appId: "1:1086360314150:web:10af74f63b6268486ce1e7",
    measurementId: "G-JJSQ3E9G7L"
};

// Inicializar Firebase no Service Worker
firebase.initializeApp(firebaseConfig);

// Inicializar o Firebase Messaging
const messaging = firebase.messaging();

// Escutar mensagens recebidas em segundo plano
messaging.onBackgroundMessage(function (payload) {
    console.log('Mensagem de segundo plano recebida:', payload);
    // const notificationTitle = payload.notification.title;
    // const notificationOptions = {
    //     body: payload.notification.body,
    //     icon: '/firebase-logo.png'  // Substitua pelo caminho correto do ícone
    // };

    self.registration.showNotification(notificationTitle, notificationOptions);
});



