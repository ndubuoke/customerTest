import axios from 'axios'
// this will be where the  api call will be made

export const API = axios.create({
  baseURL: 'https://retailcore-customerservice.herokuapp.com/v1',
  headers: {
    userid: '',
    apiKey: '',
  },
})
