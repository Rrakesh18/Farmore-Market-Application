import axios from 'axios';

const BASE_URL = "http://localhost:8083";

export const authAPI = {
    register: (userData) => axios.post(`${BASE_URL}/api/auth/register`, userData),
    login: (credentials) => axios.post(`${BASE_URL}/api/auth/login`, credentials)
};

export const cropAPI = {
    getByFarmer: (farmerId) => axios.get(`${BASE_URL}/api/crops/farmer/${farmerId}`),
    getAll: () => axios.get(`${BASE_URL}/api/crops/all`),
    addMultiple: (cropsData, farmerId) => {
        const requests = cropsData.map(crop => {
            const { id, ...cropPayload } = crop;
            const payload = {
                ...cropPayload,
                farmer: { id: farmerId }
            };
            return axios.post(`${BASE_URL}/api/crops`, payload);
        });
        return Promise.all(requests);
    },
    update: (cropId, cropData, farmerId) => {
        const payload = {
            ...cropData,
            farmer: { id: farmerId }
        };
        return axios.put(`${BASE_URL}/api/crops/${cropId}`, payload);
    },
    delete: (cropId) => axios.delete(`${BASE_URL}/api/crops/${cropId}`)
};

export const farmerAPI = {
    getAll: () => axios.get(`${BASE_URL}/api/farmers/all`)
};
