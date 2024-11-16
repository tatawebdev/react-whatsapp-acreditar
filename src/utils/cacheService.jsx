// services/cacheService.js

// Função para carregar a imagem do cache
export const loadImageFromCache = (fileID, cacheEnabled = true) => {
  if (!cacheEnabled) return null; // Se o cache estiver desativado, retorna null

  const cachedData = localStorage.getItem("cacheImg");

  if (cachedData) {
    const cache = JSON.parse(cachedData);
    // Busca a imagem correspondente ao fileID
    const cachedImage = cache?.find((item) => item.fileID === fileID);
    return cachedImage ? cachedImage.imageUrl : null;
  }
  return null; // Caso não tenha dado certo, retorna null
};

// Função para salvar a imagem no cache
export const saveImageToCache = (fileID, imageUrl, cacheEnabled = true) => {
  if (cacheEnabled) {
    const cachedData = localStorage.getItem("cacheImg");
    let cache = cachedData ? JSON.parse(cachedData) : [];

    // Verifica se o fileID já existe no cache
    const existingIndex = cache.findIndex((item) => item.fileID === fileID);
    if (existingIndex > -1) {
      // Atualiza a URL da imagem
      cache[existingIndex].imageUrl = imageUrl;
    } else {
      // Adiciona novo item no cache
      cache.push({ fileID, imageUrl });
    }

    // Salva o novo cache no localStorage
    localStorage.setItem("cacheImg", JSON.stringify(cache));
  }
};
