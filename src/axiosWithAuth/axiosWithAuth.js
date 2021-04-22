import axios from 'axios';
const baseURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001'


export const axiosWithAuth = async () => {
    let token;
    try {
        let response = (await axios.get(`${baseURL}/token`))
        token = response.data.access_token;
    } catch(err) {
        console.log('Error getting token', err)
    }
    finally {
    return axios.create({
         baseURL: `${baseURL}/api`,
         headers: {
            Authorization: `Bearer ${token}`,
        }
   })
}
};
