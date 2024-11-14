import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Chat from '../screens/Chat';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
    </Routes>
  );
};

export default AppRouter;
