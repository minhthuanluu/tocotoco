import axios from 'axios';

async function categoryAPI(params) {
    try {
        const response = await axios.get('http://192.168.100.7:3000/api/v1/categories');
        return response
    } catch (error) {
        console.error(error);
    }
}

export default categoryAPI