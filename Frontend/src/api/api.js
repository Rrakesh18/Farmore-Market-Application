import axios from 'axios';

// Add "proxy": "http://localhost:8088" to your package.json

export const authAPI = {
    register: (userData) => axios.post('/api/auth/register', userData),
    login: (credentials) => axios.post('/api/auth/login', credentials)
};

export const cropAPI = {
    getByFarmer: (farmerId) => axios.get(`/api/crops/farmer/${farmerId}`),
    getAll: () => axios.get('/api/crops/all'),
    addMultiple: (cropsData, farmerId) => {
        const requests = cropsData.map(crop => {
            const { id, ...cropPayload } = crop;
            return axios.post('/api/crops', { ...cropPayload, farmerId });
        });
        return Promise.all(requests);
    },
    update: (cropId, cropData) => axios.put(`/api/crops/${cropId}`, cropData),
    delete: (cropId) => axios.delete(`/api/crops/${cropId}`)
};