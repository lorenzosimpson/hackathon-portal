import axios from 'axios';

export const axiosWithAuth = async () => {
    let token;
    try {
        let response = (await axios.get('http://localhost:3001/token'))
        token = response.data.access_token;
    } catch(err) {
        console.log('Error getting token', err)
    }
    finally {
    return axios.create({
         baseURL: 'http://localhost:3001/api',
         headers: {
            Authorization: `Bearer ${token}`,
        }
   })
}
};