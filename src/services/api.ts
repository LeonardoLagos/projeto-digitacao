import axios from 'axios'

export const api = axios.create({
    baseURL:"http://ec2-18-230-187-230.sa-east-1.compute.amazonaws.com:3000/"
})