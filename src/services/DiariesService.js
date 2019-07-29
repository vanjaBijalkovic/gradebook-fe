import axios from 'axios'

export default class DiariesService {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }
    getAll() {
        return axios.get('diaries')
    }
}

export const diariesService = new DiariesService();