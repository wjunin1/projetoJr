import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getGames = () => {
  return apiClient.get('/games');
};

export const createGame = (game) => {
  return apiClient.post('/games', game);
};

export const updateGame = (id, game) => {
  return apiClient.put(`/games/${id}`, game);
};

export const deleteGame = (id) => {
  return apiClient.delete(`/games/${id}`);
};

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post('/games/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const downloadTemplate = () => {
  return apiClient.get('/games/template', {
    responseType: 'blob',
  });
};
