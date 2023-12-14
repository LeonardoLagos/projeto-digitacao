import axios from 'axios'

export const apiLogin = axios.create({
    baseURL:"http://ec2-54-94-226-196.sa-east-1.compute.amazonaws.com:3001/"
})