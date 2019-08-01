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
                <th>Gradebook</th>
            </tr>
        </thead>
        <tbody v-for="professorArray in filteredArray" :key="professorArray.id">
            <tr>
                <td>{{professorArray.user.firstName}}</td>
                <td>{{professorArray.user.lastName}}</td>
                <td v-for="image in professorArray.professor_has_many_images.slice(0,1)" :key="image.id">
                    <img :src="image.url" alt="" width="64" height="64"></td>
                <td>{{professorArray.diary}}</td>
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
            professorsArrays:[],
            term:''
        }
    },
    computed: {
    filteredArray() {
        return this.professorsArrays.filter(professor => {
            return professor.user.firstName.toLowerCase().includes(this.term.toLowerCase())
        })
    }
    },    

   
    beforeRouteEnter (to, from, next) {
    professorsService.getAll()
      .then((response) => {
          next((vm) => {
            vm.professorsArrays = response.data
            console.log(response.data)
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
