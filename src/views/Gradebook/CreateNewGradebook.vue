<template>
  <div>
    <h3>Create Gradebook Page</h3>
    <div class="container">
      <div class="form-group row">
        <label for="title" class="form-control col-sm-2">Gradebook title</label>
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
        <label for="professor" class="form-control col-sm-2">Professor</label>
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
      id: ""
    };
  },
  methods: {
    handleDiary() {
      if (this.$route.params.id) {
        diariesService.diaryEdit(this.newDiary.id, this.newDiary)
        .then(() => {
          this.$router.push("/");
        });
      }
        diariesService
          .diaryAdd(this.newDiary)
          .then(response => {
            this.$router.push("/");
          })
          .catch(error => {
            alert(error);
          });
      }
    },
    created() {
      if (this.$route.params.id) {
        diariesService
          .get(this.$route.params.id)
          .then(response => {
            this.newDiary = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
      professorsService
        .getAll()
        .then(response => {
          this.professors = response.data.filter(professor => !professor.diary);
        })
        .catch(error => {
          console.log(error);
        });
    }
  
};
</script>

<style>
</style>