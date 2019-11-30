<template>
  <div>
    <h3>All Gradebooks Page</h3>
    <div class="filter">
      <label class="input" for="term">Gradebook Filter</label>
      <input type="text" v-model="term" autofocus />
    </div>
    <p v-if="diaries.length == 0">There is no more gradebooks in base, try again</p>
      <table class="table table-striped table-bordered" style="width:100%">
        <thead>
          <tr>
            <th>Gradebook</th>
            <th>Professor</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody v-for="diary in diaries" :key="diary.id">
          <tr>
            <router-link :to="{ name: 'single-gradebook', params: { id: diary.id }}">{{diary.title}}</router-link>
            <td>
              <router-link
                :to="{ name: 'single-professor', params: { id: diary.professor.id }}"
              >{{diary.professor.user.firstName}} {{diary.professor.user.lastName}}</router-link>
            </td>
            <td>{{humanFormat(diary.created_at)}}</td>
          </tr>
        </tbody>
      </table>
    <!-- <div>
      <paginate-links
        class="btn btn-primary mt-3"
        for="diaries"
        :simple="{
        prev: 'Back',
        next: 'Next'
        }"
      ></paginate-links> -->
    </div>
  </div>
</template>

<script>
import { diariesService } from "@/services/DiariesService";
import { dataMixin } from "@/mixins/mixin";
import { authService } from '../../services/Auth'

export default {
  mixins: [dataMixin],
  data() {
    return {
      diaries: [],
      paginate: ["diaries"],
      term: "",
    };
  },
  computed: {
    filteredArray() {
      console.log(this.diaries)
      // return this.diaries.filter(diary => {
      //   return diary.title.toLowerCase().includes(this.term.toLowerCase());
      // });
    }
  },
  beforeRouteEnter(to, from, next) {
      if(window.localStorage.getItem('loginToken')) {
        diariesService.getAll().then(response => {
          next(vm => {
            console.log(response.data)
            vm.diaries = response.data.data;
          });
        });
      }

  }
};
</script>
<style>
.filter {
  padding: 2rem;
}
</style>
