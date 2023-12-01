import axios from 'axios'

export const apiLogin = axios.create({
    baseURL:"http://localhost:3001/"
})