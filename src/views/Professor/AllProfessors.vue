<template>
  <div class="container">
    <h3 class="h3">All Professors Page</h3>
    <div class="form-group">
      <label class="input" for="term">Professors filter</label>
      <input type="text" v-model="term" autofocus  class="form-control" />
    </div>
    <table class="table table-dark">
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
          <template v-if="professorArray.professor_has_many_images.length"> 
            <td v-for="image in professorArray.professor_has_many_images.slice(0,1)" :key="image.id">
              <img :src="image.url" alt width="64" height="64" />
            </td>
          </template>
          <template v-if="!professorArray.professor_has_many_images.length">
            <div>
              Professor dont have pictures
            </div>
          </template>
          <template>
            <td v-if="professorArray.diary">{{professorArray.diary.title}}</td>
            <td v-else>Professor is available</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { professorsService } from "@/services/ProfessorsService";

export default {
  data() {
    return {
      professorsArrays: [],
      term: ""
    };
  },
  computed: {
    filteredArray() {
      return this.professorsArrays.filter(professor => {
        return professor.user.firstName
          .toLowerCase()
          .includes(this.term.toLowerCase());
      });
    }
  },

  beforeRouteEnter(to, from, next) {
    professorsService.getAll().then(response => {
      next(vm => {
        vm.professorsArrays = response.data;
      });
    });
  }
};
</script>

<style>
.filter {
  padding: 2rem;
}
</style>
