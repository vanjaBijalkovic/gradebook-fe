import axios from 'axios'

export default class CommentsService {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }
    commentDelete(id) {
        return axios.delete(`comments/${id}`)
    }
}

export const commentsService = new CommentsService();