<template>
  <div>
    <h3>All Gradebooks Page</h3>
    <div class="filter">
      <label for="term">Galerie filter</label>
      <input type="text" v-model="term" autofocus /> 
    </div>
    <p v-if="filteredArray.length == 0">There is no more gradebooks in base, try again</p>
    <paginate name="diaries" :list="filteredArray" :per="10">
      <table class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr>
                <th>Gradebook</th>
                <th>Professor</th>
                <th>Created at</th>
            </tr>
        </thead>
        <tbody v-for="diary in paginated('diaries')" :key="diary.id">
            <tr>
                <td>{{diary.title}}</td>
                <td>{{diary.professor.user.firstName}} {{diary.professor.user.lastName}}</td>
                <td>{{humanFormat(diary.created_at)}}</td>
            </tr>
        </tbody>
      </table>
    </paginate>
    <div>
      <paginate-links class="btn btn-primary" for="diaries" :simple="{
        prev: 'Back',
        next: 'Next'
        }">
      </paginate-links>
    </div>
  </div>
</template>

<script>
import { diariesService } from '@/services/DiariesService'
import { dataMixin } from  '@/mixins/mixin'


export default {
  mixins: [dataMixin],
  data() {
    return {
      diaries: [],
      paginate:['diaries'],
      term:''
    };
  },
  computed: {
    filteredArray() {
        return this.diaries.filter(diary => {
            return diary.title.toLowerCase().includes(this.term.toLowerCase())
        })
    }    

  },  
   beforeRouteEnter (to, from, next) {
    diariesService.getAll()
      .then((response) => {
          next((vm) => {
            vm.diaries = response.data
            console.log(response.data)
        })
      })
  }, 
};
</script>
<style>
h3 {
  font-weight: bold;
  padding: 2rem;
  font-family: serif;
}
.filter {
  padding: 2rem;
}

</style>
