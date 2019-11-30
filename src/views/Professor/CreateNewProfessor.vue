<template>
  <div>
    <h3>Create Professor</h3>
    <form class="container" @submit.prevent="handleForm">
      <div>
        <label for="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          class="ml-3"
          v-model="newProfessor.firstName"
          required
          minlength="2"
          maxlength="255"
        />
      </div>
      <div class="mt-3">
        <label for="lastName mt-3">Last Name</label>
        <input
          type="text"
          id="lastName"
          class="ml-3"
          v-model="newProfessor.lastName"
          required
          minlength="2"
        />
      </div>
      <div class="mt-3 mb-2">
        <button class="btn btn-sm btn-primary" @click.prevent="addNewImageInput">Add images</button>
        <br />

        <div class="form-group mt-2" v-for="(url, index) in newProfessor.url" :key="index">
          <div>
            <input
              :key="newProfessor.url.id"
              autofocus
              v-model="url.url"
              placeholder="Image URL"
              class="form-control"
              :name="'image_' + newProfessor.url[index].id"
              v-validate="{ required: true,  url , regex: /(?:(?:(?:\.jpg))|(?:(?:\.jpeg))|(?:(?:\.png)))/ }"
              required
            />
            <button class="btn btn-sm" @click.prevent="removeImage(index)">Remove image</button>
            <button class="btn btn-sm" @click.prevent="moveUp(index)">Move image up</button>
            <button class="btn btn-sm" @click.prevent="moveDown(index)">Move image down</button>
          </div>
        </div>
        <div class="form-group row diary mt-2">
          <label for="diary" class="form-control col-sm-2 mr-3">Diary</label>
          <select
            class="form-control col-sm-4"
            name="diary"
            id="diary"
            v-model="newProfessor.diary_id"
          >
            <option :value="diary.id" v-for="diary in diaries" :key="diary.id">{{ diary.title}}</option>
          </select>
        </div>
      </div>
      <div v-if="errorsArray.length > 0" class="alert alert-danger">
        <div v-for="(error, index) in errorsArray" :key="index">
          Message: {{ error.message }}
          <div v-for="(e, index) in error.errors" :key="index">
            {{ e }}
          </div>
        </div>
      </div>
      <button name="submit" type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { professorsService } from "@/services/ProfessorsService";
import { diariesService } from "@/services/DiariesService";

export default {
  data() {
    return {
      newProfessor: {
        url: [],
        firstName: "",
        lastName: "",
        diary_id: ""
      },
      diaries: {},
      errorsList: []
    };
  },
  computed: {
    errorsArray() {
      return this.errorsList 
    }
  },
  methods: {
    handleForm() {
      this.newProfessor.url = this.newProfessor.url.map(obj => {
        return obj.url;
      });
      professorsService
        .add(this.newProfessor)
        .then(() => {
          this.$router.push("/all-professors");
        })
        .catch(e => {
          console.log(e.response)
          this.errorsList.push(e.response.data);
          console.log(this.errorsList)
        });
    },
    addNewImageInput() {
      this.newProfessor.url.push({ id: this.id++, url: "" });
    },
    moveUp(index) {
      if (index != 0) {
        this.newProfessor.url.splice(
          index - 1,
          0,
          this.newProfessor.url[index]
        );
        this.newProfessor.url.splice(index + 1, 1);
      }
    },
    moveDown(index) {
      if (index != this.newProfessor.url.length - 1) {
        this.newProfessor.url.splice(
          index + 2,
          0,
          this.newProfessor.url[index]
        );
        this.newProfessor.url.splice(index, 1);
      }
    },
    cancel() {
      this.$router.push({ name: "my-galleries" });
    },
    removeImage(index) {
      if (Object.keys(this.newProfessor.url).length > 1) {
        this.newProfessor.url.splice(index, 1);
      } else {
        this.notifyOneImage = true;
      }
    }
  },
  created() {
    diariesService
      .getAll()
      .then(response => {
        if (response.data) {
          this.diaries = response.data.filter(diary => !diary.professor_id);
        }
      })
      .catch(error => {
        console.log(error)
        if (error.response) {
          this.errorsList = error.response.data.errors;
        }
      });
  }
};
</script>

<style>
</style>
