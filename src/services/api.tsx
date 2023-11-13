import axios from 'axios'

export const api = axios.create({
    baseURL:"http://localhost:3000/"
})

// export const HOST = 'http://geoweb.wcogeo.com.br'