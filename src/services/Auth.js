import axios from 'axios'

export default class AuthService {

  constructor() {
    this.setAxiosDefaultAuthorizationHeader()
  }

  login(email, password) {
    return axios.post('http://localhost:8000/api/login', {
      email, password
    }).then(({data}) => {
      window.localStorage.setItem('user', JSON.stringify(data.user))
      window.localStorage.setItem('loginToken', data.token)
      this.setAxiosDefaultAuthorizationHeader()
      
      return data.user;
    })
  }

  setAxiosDefaultAuthorizationHeader() {
    const TOKEN = window.localStorage.getItem('loginToken')
    axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`
  }

  logout() {
    window.localStorage.removeItem('loginToken')
    delete axios.defaults.headers.common['Authorization']
  }

  isAuthenticated() {
    return !!window.localStorage.getItem('loginToken')
  }

  register(firstName, lastName, password,email) {
    return axios.post('http://localhost:8000/api/register', {
      firstName,lastName, email, password
    })
  }
  get (id) {
    return axios.get(`users/${id}`)
  }
}

export const authService = new AuthService()