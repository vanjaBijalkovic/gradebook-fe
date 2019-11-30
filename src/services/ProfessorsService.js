import axios from 'axios'

export default class ProfessorsService {
    constructor() {
        axios.defaults.baseURL = 'http://www.gradebooktest.com/api/'
    }
    getAll() {
        return axios.get('professors')
    }

    get (id) {
        return axios.get(`professors/${id}`)
      }
    add( professor ) {
        return axios.post('professors', professor);
    }
}

export const professorsService = new ProfessorsService();