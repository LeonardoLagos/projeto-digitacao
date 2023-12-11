import axios from 'axios'

export const apiLogin = axios.create({
    baseURL:"http://ec2-15-229-109-146.sa-east-1.compute.amazonaws.com:3001/"
})