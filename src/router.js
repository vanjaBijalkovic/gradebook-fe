import Vue from 'vue'
import Router from 'vue-router'
import Gradebooks from './views/Gradebook/Gradebooks'
import Login from './views/User/Login'
import Register from './views/User/Register'
import AddNewStudent from './views/Student/AddNewStudent'
import AllProfessors from './views/Professor/AllProfessors'
import CreateNewGradebook from './views/Gradebook/CreateNewGradebook'
import CreateNewProfessor from './views/Professor/CreateNewProfessor'
import MyGradeBook from './views/Gradebook/MyGradeBook'
import SingleGradebook from './views/Gradebook/SingleGradebook'
import SingleProfessor from './views/Professor/SingleProfessor'

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
      path: '/add-student/:id',
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
      path: '/my-gradebook/:id',
      name: 'my-gradebook',
      component: MyGradeBook
    },
    {
      path: '/single-gradebook/:id',
      name: 'single-gradebook',
      component: SingleGradebook
    },
    {
      path: '/single-professor/:id',
      name: 'single-professor',
      component: SingleProfessor
    },
    {
      path: '/single-gradebook/:id/edit',
      name: 'edit-gradebook',
      component: CreateNewGradebook
    },
  ]
})
