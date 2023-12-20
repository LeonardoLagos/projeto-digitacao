import axios from 'axios'

export const api = axios.create({
    baseURL:"http://ec2-15-228-13-22.sa-east-1.compute.amazonaws.com:3000/"
})