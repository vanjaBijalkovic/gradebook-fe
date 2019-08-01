<template>
  <div>
      <h3>Single Professor Page</h3>
      <table class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr>
                <th>Professor</th>
                <th>Gradebook</th>
                <th>Image</th>
                <th>Number of students</th>
            </tr>
        </thead>
        <tbody>
            <td v-for="image in professor.professor_has_many_images" :key="image.id">
              <img :src="image.url" alt="" width="64" height="64">
            </td>
            <template v-if="professor && professor.user">
              <td>{{ professor.user.firstName }} {{ professor.user.lastName }}</td>
            </template>

            <td v-if="professor && professor.diary"><router-link :to="{ name: 'single-gradebook', params: { id: professor.diary.id }}">{{professor.diary.title}}</router-link></td>
            <td v-if="professor && professor.diary">{{ professor.diary.students.length }} </td>
        </tbody>
        </table>
    </div>
</template>

<script>
import { professorsService } from '../services/ProfessorsService'
export default {
  data() {
    return {
      professor: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      professorsService.get(vm.$route.params.id).then(response => {
        vm.professor = response.data;
        console.log(vm.professor);
      }).catch(error => {console.log(error)});
    });
  },
  
  }

</script>

<style>
h3 {
  font-weight: bold;
  padding: 2rem;
  font-family: serif;
}
</style>