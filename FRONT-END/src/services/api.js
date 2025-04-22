import axios from "axios";

const api = axios.create({
    baseURL: 'https://user-registration-fullstack.onrender.com'
})

export default api 
