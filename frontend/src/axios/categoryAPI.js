import axios from 'axios';
import { BASE_URL } from './base';

async function categoryAPI(params) {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response
    } catch (error) {
        console.error(error);
    }
}

export default categoryAPI