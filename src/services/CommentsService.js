import axios from 'axios'

export default class CommentsService {
    constructor() {
        axios.defaults.baseURL = 'http://www.gradebooktest.com/api/'
    }
    commentDelete(id) {
        return axios.delete(`comments/${id}`)
    }
}

export const commentsService = new CommentsService();