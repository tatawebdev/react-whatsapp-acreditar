import React, { createContext, useState, useContext } from 'react';

const FullScreenContext = createContext();

export const useFullScreen = () => {
  return useContext(FullScreenContext);
};

export const FullScreenProvider = ({ children }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    setIsFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <FullScreenContext.Provider value={{ isFullScreen, handleFullScreen, handleCloseFullScreen }}>
      {children}
    </FullScreenContext.Provider>
  );
};
