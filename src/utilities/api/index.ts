import axios from 'axios'
// this will be where the api call will be made
const verificationApiEndpoint = 'https://api.verified.africa/sfx-verify/v3/id-service/'

export const VerificationApi = axios.create({
  baseURL: verificationApiEndpoint,
  headers: {
    userid: '',
    apiKey: '',
  },
})
