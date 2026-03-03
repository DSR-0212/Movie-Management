import axios from "axios";
const api = axios.create({
    // baseURL: 'http://localhost:3000'
   baseURL:  'https://movie-management-system-ui2u.onrender.com'
})
export default api
