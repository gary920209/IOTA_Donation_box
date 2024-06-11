import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Function to get all items
export const getItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/items`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

// Function to get a specific item by name
export const getItemByName = async (name: string) => {
    try {
        const response = await axios.get(`${API_URL}/item`, { params: { name: name } });
        return response.data;
    } catch (error) {
        console.error(`Error fetching item with name ${name}:`, error);
        throw error;
    }
};

// Function to create a new item
export const createItem = async (item: { _id: string; name: string; amount: number; status: string; date?: string }) => {
    try {
        const response = await axios.post(`${API_URL}/items`, item);
        return response.data;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
};

// Function to modify an existing item
export const modifyItem = async (id: string, item: { name?: string; amount?: number; status?: string; date?: string }) => {
    try {
        const response = await axios.put(`${API_URL}/items/${id}`, item);
        return response.data;
    } catch (error) {
        console.error(`Error modifying item with id ${id}:`, error);
        throw error;
    }
};

export const sendTransaction = async (accountName: string, amount: number, recvAddress: string) => {
    try {
        const response = await axios.post(`${API_URL}/send_transaction`, { accountName, amount, recvAddress });
        return response.data;
    } catch (error) {
        console.error('Error sending transaction:', error);
        throw error;
    }
}

export const checkBalance = async () => {
    try {
        const response = await axios.get(`${API_URL}/checkbalance`);
        return response.data;
    } catch (error) {
        console.error('Error checking balance:', error);
        throw error;
    }
}