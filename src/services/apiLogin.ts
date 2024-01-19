import axios from 'axios'

export const apiLogin = axios.create({
    baseURL:"http://ec2-18-230-187-230.sa-east-1.compute.amazonaws.com:3001/"
})