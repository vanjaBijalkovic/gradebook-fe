<template>
  <div>
    <div class="container">
      <div class="form-group row mt-3">
        <label for="firstName" class="form-control col-sm">First Name</label>
        <input
          type="text"
          class="form-control col-sm-8"
          id="firstName"
          name="firstName"
          v-model="newStudent.firstName"
        />
      </div>

      <div class="form-group row mt-3">
        <label for="lastName" class="form-control col-sm">Last Name</label>
        <input
          type="text"
          class="form-control col-sm-8"
          id="lastName"
          name="lastName"
          v-model="newStudent.lastName"
        />
      </div>

      <div>
        <button class="btn btn-sm btn-primary mt-3" @click.prevent="addNewImageInput">Add images</button>

        <div class="form-group" v-for="(url, index) in newStudent.url" :key="index">
          <div>
            <input
              :key="newStudent.url.id"
              autofocus
              v-model="url.url"
              placeholder="Image URL"
              class="form-control"
              :name="'image_' + newStudent.url[index].id"
              v-validate="{ required: true,  url , regex: /(?:(?:(?:\.jpg))|(?:(?:\.jpeg))|(?:(?:\.png)))/ }"
              required
            />
            <button class="btn btn-sm mt-3" @click.prevent="removeImage(index)">Remove image</button>
            <button class="btn btn-sm mt-3" @click.prevent="moveUp(index)">Move image up</button>
            <button class="btn btn-sm mt-3" @click.prevent="moveDown(index)">Move image down</button>
          </div>
        </div>
      </div>

      <div v-if="errorsList.length > 0" class="alert alert-danger">
        <p v-for="(error, index) in errors" :key="index">
          Message: {{ error.message }}
          <br />
          <span v-for="(err, i) in errors[index].errors" :key="i">
            <span v-for="(e, j) in err" :key="j">
              Error: {{ err[j] }}
              <br />
            </span>
          </span>
        </p>
      </div>

      <button class="btn btn-primary mt-3" @click="handleStudent">Submit</button>
    </div>
  </div>
</template>

<script>
import { diariesService } from "@/services/DiariesService";
import { authService } from "@/services/Auth";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      diary: {},
      newStudent: {
        firstName: "",
        lastName: "",
        url: []
      },
      isAuthenticated: authService.isAuthenticated(),
      errorsList: []
    };
  },
  methods: {
    handleStudent() {
      this.newStudent.url = this.newStudent.url.map(obj => {
        return obj.url;
      });
      diariesService
        .diaryStudentAdd(this.diary.id, this.newStudent)
        .then(response => {
          this.newStudent = {};
          this.$router.push(`/single-gradebook/${this.$route.params.id}`);
        })
        .catch(error => {
          this.errorsList = error.response.data.errors;
        });
    },
    addNewImageInput() {
      this.newStudent.url.push({ id: this.id++, url: "" });
    },
    moveUp(index) {
      if (index != 0) {
        this.newStudent.url.splice(index - 1, 0, this.newStudent.url[index]);
        this.newStudent.url.splice(index + 1, 1);
      }
    },
    moveDown(index) {
      if (index != this.newStudent.url.length - 1) {
        this.newStudent.url.splice(index + 2, 0, this.newStudent.url[index]);
        this.newStudent.url.splice(index, 1);
      }
    },
    cancel() {
      this.$router.push({ name: "my-galleries" });
    },
    removeImage(index) {
      if (Object.keys(this.newStudent.url).length > 1) {
        this.newStudent.url.splice(index, 1);
      } else {
        this.notifyOneImage = true;
      }
    }
  },

  computed: {
    ...mapGetters({
      user: "getUser"
    })
  },

  created() {
    console.log("fdsafdsafdsa");
    diariesService
      .get(this.$route.params.id)
      .then(response => {
        this.diary = response.data;
        console.log(this.diary);
      })
      .catch(error => {
        this.errorsList = error.response.data.errors;
      });
  }
};
</script>

<style>
</style>