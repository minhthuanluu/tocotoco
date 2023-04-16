import axios from 'axios';
import { BASE_URL } from './base';

async function signinAPI(email, pass) {
    console.log(email, pass);
    try {
        const response = await axios.put(`${BASE_URL}/users/signin?lang=en`, {
            email,
            pass
        });

        return response
    } catch (error) {
        console.error(error);
    }
}

export default signinAPI