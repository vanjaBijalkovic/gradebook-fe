<template>
  <div class=container>
    <h3 class="h3"> All Gradebooks Page</h3>
    <div class="form-group">
      <label  class="form-check-label" for="term">Gradebook Filter</label>
      <input type="text" v-model="term" @keyup.enter="search(1)" autofocus  class="form-control" />
      <button class="btn btn-md btn-primary mt-3" @click="search(1)">Search</button>
    </div>
    <p v-if="diaries.length == 0">There is no more gradebooks in base, try again</p>
      <table class="table table-dark">
        <thead>
          <tr>
            <th>Gradebook</th>
            <th>Professor</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody v-for="diary in diaries" :key="diary.id">
          <tr>
            <td>
              <router-link :to="{ name: 'single-gradebook', params: { id: diary.id }}" style="color: white">
                {{diary.title}}
              </router-link>
            </td>
            <td>
              <router-link :to="{ name: 'single-professor', params: { id: diary.professor.id }}"  style="color: white">
                {{diary.professor.user.firstName}} {{diary.professor.user.lastName}}
              </router-link>
            </td>
            <td>{{humanFormat(diary.created_at)}}</td>
          </tr>
        </tbody>
      </table>
      <button
        class="btn btn-md btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="getDiaries(false)"
      >Previous</button>
      <button
        :disabled="currentPage >= lastPage"
        class="btn btn-md btn-primary ml-2"
        @click="getDiaries(true)"
      >Next</button>
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
      currentPage: 1,
      lastPage: 0,
      canFetchNext: true
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
      this.search(this.currentPage);
    },
    search(currentPage) {
      diariesService.searchDiary(this.term, currentPage).then(response => {
        this.currentPage = response.data.current_page;
        this.diaries = response.data.data;
        this.lastPage = response.data.last_page;
      })
    }
  },
  beforeRouteEnter(to, from, next) {
      if(window.localStorage.getItem('loginToken')) {
         diariesService.searchDiary("", 1).then(response => {
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
