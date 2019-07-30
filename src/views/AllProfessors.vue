<template>
    <div>
        <div class="filter">
            <label for="term">Professors filter</label>
        <input type="text" v-model="term" autofocus /> 
        </div>
        <table class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Picture</th>
            </tr>
        </thead>
        <tbody v-for="professor in filteredArray" :key="professor.id">
            <tr>
                <td>{{professor.user.firstName}}</td>
                <td>{{professor.user.lastName}}</td>
                <td><img :src="professor.url" alt="" width="64" height="64"></td>
            </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import { professorsService } from '@/services/ProfessorsService'

export default {
    data() {
        return {
            professors:[],
            term:''
        }
    },
    computed: {
    filteredArray() {
        return this.professors.filter(professor => {
            return professor.user.firstName.toLowerCase().includes(this.term.toLowerCase())
        })
    }    

  }, 
    beforeRouteEnter (to, from, next) {
    professorsService.getAll()
      .then((response) => {
          next((vm) => {
            vm.professors = response.data
          })
      })
  }, 
}
</script>

<style>
.filter {
    padding: 2rem;
}
</style>
