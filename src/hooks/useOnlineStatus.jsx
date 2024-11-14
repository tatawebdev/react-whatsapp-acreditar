
import { useState, useEffect } from "react";

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };

  useEffect(() => {
    // Adiciona eventos para detectar mudanças no status de conexão
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Remove os eventos quando o componente for desmontado
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;
