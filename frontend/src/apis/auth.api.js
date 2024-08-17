import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/auth",
    withCredentials: true
})

export const register_user = async (input) => {
    try {
        const response = await api.post('/register', input, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const login_user = async (input) => {
    try {
        const response = await api.post('/login', input, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return response.data
    } catch (error) {
        console.log(error);
    }
}