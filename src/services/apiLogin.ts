import axios from 'axios'

export const apiLogin = axios.create({
    baseURL:"http://192.168.10.12:3001/"
})