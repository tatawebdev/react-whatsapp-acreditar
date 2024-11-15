// App.jsx
import React, { useEffect, useState } from 'react';
import { requestFCMPermission } from './services/firebaseConfig';
import useFCMToken from './hooks/useFCMToken';


import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/appRouter";


function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const fcmToken = await requestFCMPermission();
      if (fcmToken) {
        setToken(fcmToken);
      }
    };

    getToken();
  }, [token]);

  useFCMToken(token);




  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default App;
