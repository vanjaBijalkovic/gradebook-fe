<template>
  <div>
    <h3>Create Gradebook Page</h3>
    <div class="container">
      <div class="form-group row">
        <label for="title" class="form-control col-sm">Gradebook title</label>
        <input
          type="text"
          class="form-control col-sm-8"
          id="title"
          name="title"
          v-model="newDiary.title"
          minlength="2"
          maxlength="255"
          required
        />
      </div>

      <div class="form-group row">
        <label for="professor" class="form-control col-sm">Professor</label>
        <select
          class="form-control col-sm-4"
          name="professor"
          id="professor"
          v-model="newDiary.professor_id"
        >
          <option
            :value="professor.id"
            v-for="professor in professors"
            :key="professor.id"
          >{{ professor.user.firstName }} {{professor.user.lastName}}</option>
        </select>
      </div>

      <div>
   
      <div v-if="errorList.length > 0" class="alert alert-danger">
        <div v-for="(error, index) in errorList" :key="index">
          Message: {{ error.message }}
          <div v-for="(e, index) in error.errors" :key="index">
            {{ e }}
          </div>
        </div>
      </div>
    </div>

      <div>
        <button class="btn btn-primary" @click="handleDiary">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { professorsService } from "@/services/ProfessorsService";
import { diariesService } from "@/services/DiariesService";

export default {
  data() {
    return {
      newDiary: {},
      professors: {},
      id: "",
      errorList: [],
      currentProfessor: []
    };
  },
  methods: {
    handleDiary() {
      if (this.$route.params.id) {
        diariesService.diaryEdit(this.newDiary.id, this.newDiary)
        .then(() => {
          this.$router.push("/gradebooks");
        });
      } else {
        diariesService
          .diaryAdd(this.newDiary)
          .then(() => {
            this.$router.push("/gradebooks");
          })
          .catch(error => {
            this.errorList.push(error.response.data);
          });
      }
      }
    },
    created() {
      if (this.$route.params.id) {
        diariesService
          .get(this.$route.params.id)
          .then(response => {
            this.newDiary = response.data;
            this.currentProfessor.push(response.data.professor);
          })
          .catch(error => {
            this.errorList = error.response.data.errors;
          });
      }
      professorsService
        .getAll()
        .then(response => {
          this.professors = response.data.filter(professor => !professor.diary);
          this.professors = this.professors.concat(this.currentProfessor)
        })
        .catch(error => {
          this.errorList = error.response.data.errors;
        });
    }
  
};
</script>

<style>
</style>