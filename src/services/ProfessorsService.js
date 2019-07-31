import axios from 'axios'

export default class ProfessorsService {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }
    getAll() {
        return axios.get('professors')
    }

    get(id) {
        return axios.get('professor/' + id);
    }

    professorAdd( professor ) {
        return axios.post('professor', professor);
    }
}

export const professorsService = new ProfessorsService();