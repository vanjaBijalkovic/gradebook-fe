<template>
  <div>
    <h3>Create Professor</h3>
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
        <input type="text" id="lastName" v-model="newProfessor.lastName" required minlength="2" />
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
              v-validate="{ required: true,  url , regex: /(?:(?:(?:\.jpg))|(?:(?:\.jpeg))|(?:(?:\.png)))/ }"
              required
            />
            <button class="btn btn-sml" @click.prevent="removeImage(index)">Remove image</button>
            <button class="btn btn-sml" @click.prevent="moveUp(index)">Move image up</button>
            <button class="btn btn-sml" @click.prevent="moveDown(index)">Move image down</button>
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
        firstName: "",
        lastName: ""
      }
    };
  },
  methods: {
    handleForm() {
      this.newProfessor.url = this.newProfessor.url.map(obj => {
        return obj.url;
      });
      professorsService.add(this.newProfessor);
      this.$router.push("/all-professors");
    },
    addNewImageInput() {
      this.newProfessor.url.push({ id: this.id++, url: "" });
      console.log(this.newProfessor);
    },
    moveUp(index) {
      if (index != 0) {
        this.newProfessor.url.splice(index - 1, 0, this.newProfessor.url[index]);
        this.newProfessor.url.splice(index + 1, 1);
      }
    },
    moveDown(index) {
      if (index != this.newProfessor.url.length - 1) {
        this.newProfessor.url.splice(index + 2, 0, this.newProfessor.url[index]);
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
  }
};
</script>

<style>
</style>
