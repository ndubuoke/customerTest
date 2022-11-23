import axios from 'axios'

export const API = axios.create({
  baseURL: 'https://retailcore-customerservice.herokuapp.com/v1',
  headers: {
    userid: '',
    apiKey: '',
  },
})
