import { default as axios } from 'axios';

//const API_URL = process.env.APP_API_URL;//'http://app:30080/items'; // Замените на ваш URL

const API_URL = `${window.location.protocol}//${window.location.hostname}:30080/items`;

export const fetchItems = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createItem = async (item) => {
    const response = await axios.post(API_URL, item);
    return response.data;
};

export const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const updateItem = async (id, item) => {
    const response = await axios.put(`${API_URL}/${id}`, item);
    return response.data;
};
