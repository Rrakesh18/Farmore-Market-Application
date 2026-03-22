import axios from 'axios';

// Use CRA proxy by default. Optionally override via REACT_APP_API_BASE_URL.
const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
const apiClient = axios.create({ baseURL: BASE_URL });

export const authAPI = {
  register: (userData) => apiClient.post('/api/auth/register', userData),
  login: (credentials) => apiClient.post('/api/auth/login', credentials),
};

export const cropAPI = {
  getByFarmer: (farmerId) => apiClient.get(`/api/crops/farmer/${farmerId}`),
  getAll: () => apiClient.get('/api/crops/all'),
  addMultiple: (cropsData, farmerId) => {
    const requests = cropsData.map((crop) => {
      const { id, ...cropPayload } = crop;
      const payload = {
        ...cropPayload,
        farmerId: farmerId,
      };
      return apiClient.post('/api/crops', payload);
    });
    return Promise.all(requests);
  },
  update: (cropId, cropData, farmerId) => {
    const payload = {
      ...cropData,
      farmerId: farmerId,
    };
    return apiClient.put(`/api/crops/${cropId}`, payload);
  },
  delete: (cropId) => apiClient.delete(`/api/crops/${cropId}`),
};

export const farmerAPI = {
  getAll: () => apiClient.get('/api/farmers/all'),
};
