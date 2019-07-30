import Vue from 'vue'
import Router from 'vue-router'
import Gradebooks from './views/Gradebooks'
import Login from './views/Login'
import Register from './views/Register'
import AddNewStudent from './views/AddNewStudent'
import AllProfessors from './views/AllProfessors'
import CreateNewGradebook from './views/CreateNewGradebook'
import CreateNewProfessor from './views/CreateNewProfessor'
import MyGradeBook from './views/MyGradeBook'
import SingleGradebook from './views/SingleGradebook'
import SingleProfessor from './views/SingleProfessor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'gradebooks',
      component: Gradebooks
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/add-student',
      name: 'add-student',
      component: AddNewStudent
    },
    {
      path: '/all-professors',
      name: 'allprofessors',
      component: AllProfessors
    },
    {
      path: '/create-gradebook',
      name: 'create-gradebook',
      component: CreateNewGradebook
    },
    {
      path: '/create-professor',
      name: 'create-professor',
      component: CreateNewProfessor
    },
    {
      path: '/my-gradebook',
      name: 'my-gradebook',
      component: MyGradeBook
    },
    {
      path: '/single-gradebook',
      name: 'single-gradebook',
      component: SingleGradebook
    },
    {
      path: '/single-professor',
      name: 'single-professor',
      component: SingleProfessor
    },
  ]
})
