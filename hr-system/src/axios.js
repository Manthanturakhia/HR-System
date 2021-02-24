import axios from "axios"


const instance = axios.create({
    baseURL: 'https://hr-system-backend.herokuapp.com'
})

export default instance