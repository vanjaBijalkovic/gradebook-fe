<template>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark top">
    <ul class="navbar-nav">
    <li class="nav-item">
      <router-link class="nav-link" to="/">Home</router-link>
    </li>
    
    <li class="nav-item dropdown">
      <router-link class="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
        Gradebooks
      </router-link>
      <div class="dropdown-menu">
        <router-link class="dropdown-item" to="/">Gradebooks</router-link>
        <router-link class="dropdown-item" :to="{ name: 'my-gradebook', params: { id: 4 }}">My Gradebook</router-link>
        <router-link class="dropdown-item" to="/create-gradebook">Create Gradebook</router-link>
      </div>
    </li>
    <li class="nav-item dropdown">
      <router-link class="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
        Professors
      </router-link>
      <div class="dropdown-menu">
        <router-link class="dropdown-item" to="/all-professors">All Professors</router-link>
        <router-link class="dropdown-item" to="/single-professor">Single Professor</router-link>
        <router-link class="dropdown-item" to="/create-professor">Create Professor</router-link>
      </div>
    </li>
    </ul>
  <ul class="navbar-nav">>
      <router-link class="nav-item nav-link" to="/login" v-if="!isAuthenticated">Sign in</router-link>
      <a href="#" class="nav-item nav-link" @click="logout" v-if="isAuthenticated">Sign out</a>    |
      <li class="nav-item">
        <router-link class="nav-link" to="/">Register</router-link>
    </li>
  </ul>
</nav> 
</template>

<script>
import { authService } from '@/services/Auth'
import { professorsSerivce } from '@/services/ProfessorsService'
export default {
  data() {
      return {
        isAuthenticated: authService.isAuthenticated(),
        professor:[]
      }
    },
    methods: {
      logout() {
        authService.logout()
        this.isAuthenticated = false
      }
    },
    computed: {
      test() {
        console.log(this.isAuthenticated)
        return this.isAuthenticated
      }
    },
    beforeRouteEnter(to, from, next) {
    next(vm => {
      professorService.get(vm.$route.params.id).then(response => {
        vm.professor = response.data;
      }).catch(error => {console.log(error)});
    })
  }
  }
    

</script>
<style>
.top {
    justify-content: space-between;
    
}
</style>
