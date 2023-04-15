import axios from 'axios';

async function getOrderAPI(product_order, user) {
    console.log(product_order, user);
    try {
        const response = await axios.post('http://192.168.100.7:3000/api/v1/orders');
        return response
    } catch (error) {
        console.error(error);
    }
}

export default getOrderAPI