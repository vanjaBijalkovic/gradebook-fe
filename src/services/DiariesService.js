import axios from 'axios'

export default class DiariesService {
    constructor() {
        axios.defaults.baseURL = 'http://www.gradebooktest.com/api/'
        axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('loginToken')}`
    }

    getAll(page) {
        console.log(page)
        return axios.get(`diaries?page=${page}`)
    }
    get(id) {
        console.log(id);
        return axios.get(`diaries/${id}`)
    }

    diaryAdd( diary ) {
        return axios.post('diaries', diary);
    }
    diaryCommentAdd(id, comment) {
        return axios.post(`diaries/${id}/comments`, comment);
    }
    diaryStudentAdd(id, student) {
        return axios.post(`diaries/${id}/students`, student);
    }
    diaryEdit(id, newDiary) {
        return axios.put(`diaries/${id}`, newDiary);
    }
    delete(id) {
        return axios.delete(`diaries/${id}`)
    }

    searchDiary(term, page) {
        return axios.get(`search?search_term=${term}&page=${page}`);
    }

    myDiary(id) {
        return axios.get(`diaries/my-diary/${id}`)
    }
}

export const diariesService = new DiariesService();