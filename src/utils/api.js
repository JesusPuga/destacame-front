import axios from 'axios'

const config = {
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000
}

if (window.localStorage.getItem('token')) {
  config['headers'] = {
    Authorization: 'Token ' + window.localStorage.getItem('token')
  }
}

export const api = axios.create(config)
