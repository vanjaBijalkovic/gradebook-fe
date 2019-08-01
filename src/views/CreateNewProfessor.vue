<template>
  <div>
    <form @submit.prevent="handleForm">
      <div>
        <label for="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          v-model="newProfessor.firstName"
          required
          minlength="2"
          maxlength="255"
        />
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model="newProfessor.lastName" required />
      </div>
      <div>
        <button class="btn btn-sml" @click.prevent="addNewImageInput">Add more images</button>

        <div class="form-group" v-for="(url, index) in newProfessor.url" :key="index">
          <div>
            <input
              :key="newProfessor.url.id"
              autofocus
              v-model="url.url"
              placeholder="Image URL"
              class="form-control"
              :name="'image_' + newProfessor.url[index].id"
              v-validate="{ required: true, url}"
              required
            />
          </div>
        </div>
      </div>
      <button name="submit" type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { professorsService } from "@/services/ProfessorsService";

export default {
  data() {
    return {
      newProfessor: {
        url: [],
        firstName: '',
        lastName:'',
      },
      
    };
  },
  methods: {
    handleForm() {
      this.newProfessor.url = this.newProfessor.url.map((obj) => {
        return obj.url
        
      })
      console.log(this.newProfessor.url)
      professorsService.add(this.newProfessor);
      // this.$router.push("/");
    },
    addNewImageInput() {
      this.newProfessor.url.push({ id: this.id++, url: "" });
      console.log(this.newProfessor);
    }
  }
};
</script>

<style>
</style>
