<template>
  <div>
    <div class="container">
      <div class="form-group row">
        <label for="firstName" class="form-control col-sm-2">First Name</label>
        <input
          type="text"
          class="form-control col-sm-8"
          id="firstName"
          name="firstName"
          v-model="newStudent.firstName"
        />
      </div>

      <div class="form-group row">
        <label for="lastName" class="form-control col-sm-2">Last Name</label>
        <input
          type="text"
          class="form-control col-sm-8"
          id="lastName"
          name="lastName"
          v-model="newStudent.lastName"
        />
      </div>

      <div>
        <button class="btn btn-sml" @click.prevent="addNewImageInput">Add more images</button>

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
            <button  class="btn btn-sml" @click.prevent="removeImage(index)" >Remove image</button>
            <button  class="btn btn-sml" @click.prevent="moveUp(index)" >Move image up</button>
            <button  class="btn btn-sml" @click.prevent="moveDown(index)" >Move image down</button>
          </div>
        </div>
      </div>

      <button class="btn btn-primary" @click="handleStudent">Submit</button>
    </div>
  </div>
</template>

<script>
import { diariesService } from '@/services/DiariesService'
import { authService } from '@/services/Auth'

export default {
  data() {
    return {
      diary:{},
      newStudent: {
        firstName: '',
        lastName:'',
        url: []
      },
      isAuthenticated: authService.isAuthenticated(),
    }
  },
  methods: {
    handleStudent() {
      this.newStudent.url = this.newStudent.url.map((obj) => {
        return obj.url
      })
      diariesService
        .diaryStudentAdd(this.diary.id, this.newStudent)
        .then( response => {
          this.newStudent = {};
          this.$router.push("/");
        }).catch( error => {
          console.log(error);
        });
    },
    addNewImageInput() {
      this.newStudent.url.push({ id: this.id++, url: "" });
    },
    moveUp(index){
				if (index !=0) {	
					this.newStudent.url.splice(index-1, 0, this.newStudent.url[index])
					this.newStudent.url.splice(index+1,1)		
				}
			},
			moveDown(index){
				if(index != this.newStudent.url.length-1){
					this.newStudent.url.splice(index+2, 0, this.newStudent.url[index])
					this.newStudent.url.splice(index,1)
				}
			},
			cancel(){
				this.$router.push({ name: 'my-galleries' })
      },
      removeImage(index){
				if (Object.keys(this.newStudent.url).length > 1){
					this.newStudent.url.splice(index, 1)
				}else{
					this.notifyOneImage = true
				}
				
			},
  },
  
  created() {
    diariesService
      .get(this.$route.params.id)
      .then(response => {
        this.diary = response.data;
        console.log(this.diary);
      })
      .catch(error => {
        console.log(error);
      })
  }
  
}
</script>

<style>
</style>