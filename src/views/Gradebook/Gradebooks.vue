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
      <button class="btn btn-sm btn-primary" v-if="lastPage > 0" @click="getDiaries(false)">Previous</button>
      <button class="btn btn-sm btn-primary ml-3" @click="getDiaries(true)">Next</button>
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
      currentPage: 0,
      lastPage: 0
    };
  },
  methods: {
    getDiaries(isNext) {
      if (isNext) {
        if (this.currentPage < this.lastPage) {
          this.currentPage ++;
        }
      } else if (this.currentPage > 1) {
        this.currentPage --;
      }
      diariesService.getAll(this.currentPage).then(response => {
        this.currentPage = response.data.current_page;
        this.diaries = response.data.data;
      })
    },
    search() {
      diariesService.searchDiary(this.currentPage).then(response => {
        this.currentPage = response.data.current_page;
        this.diaries = response.data.data;
      })
    }
  },
  beforeRouteEnter(to, from, next) {
      if(window.localStorage.getItem('loginToken')) {
        diariesService.getAll(1).then(response => {
          next(vm => {
            vm.currentPage = response.data.current_page;
            vm.diaries = response.data.data;
            vm.lastPage = response.data.last_page;
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
