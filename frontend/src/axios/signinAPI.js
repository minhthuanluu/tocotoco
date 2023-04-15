import axios from 'axios';

async function signinAPI(email, pass) {
    console.log(email, pass);
    try {
        const response = await axios.put(`http://192.168.100.7:3000/api/v1/users/signin?lang=en`, {
            email,
            pass
        });

        return response
    } catch (error) {
        console.error(error);
    }
}

export default signinAPI