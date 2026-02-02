import axios from 'axios';

const BASE_URL = "http://localhost:8087"; // backend base URL

export const authAPI = {
    register: (userData) => axios.post(`${"http://localhost:8087"}/api/auth/register`, userData),
    login: (credentials) => axios.post(`${"http://localhost:8087"}/api/auth/login`, credentials)
};

export const cropAPI = {
    getByFarmer: (farmerId) => axios.get(`${"http://localhost:8087"}/api/crops/farmer/${farmerId}`),
    getAll: () => axios.get(`${"http://localhost:8087"}/api/crops/all`),
    addMultiple: (cropsData, farmerId) => {
        const requests = cropsData.map(crop => {
            const { id, ...cropPayload } = crop;
            const payload = {
                ...cropPayload,
                farmer: { id: farmerId }
            };
            return axios.post(`${"http://localhost:8087"}/api/crops`, payload);
        });
        return Promise.all(requests);
    },
    update: (cropId, cropData, farmerId) => {
        const payload = {
            ...cropData,
            farmer: { id: farmerId }
        };
        return axios.put(`${"http://localhost:8087"}/api/crops/${cropId}`, payload);
    },
    delete: (cropId) => axios.delete(`${"http://localhost:8087"}/api/crops/${cropId}`)
};

export const farmerAPI = {
    getAll: () => axios.get(`${"http://localhost:8087"}/api/farmers/all`)
};
