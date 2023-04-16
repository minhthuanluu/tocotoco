import axios from 'axios';
import { BASE_URL } from './base';
import moment from 'moment';

async function orderAPI(product, user) {
    try {
        const createAt = moment()._d;
        const data = {
            product,
            createAt,
            user,
            "__v": 0
        };

        return await axios.post(`${BASE_URL}/orders`, data );
    } catch (error) {
        return error;
    }
}

export default orderAPI;