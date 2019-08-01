<template>
  <div>
    <table class="table table-striped table-bordered" style="width:100%">
      <thead>
        <tr>
          <th></th>
          <th>Gradebook</th>
          <th>Professor</th>
          <th>Students</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td width="200">
            <router-link class="btn btn-primary" :to="{ name: 'add-student', params: { id: diary.id }}">Add Student</router-link>
          </td>
          <td>{{diary.title}}</td>
          <td>{{diary.professor.user.firstName}} {{diary.professor.user.lastName}}</td>
          <div class="container">
            <ol class="list-group">
              <li
                class="list-group-item"
                v-for="student in diary.students"
                :key="student.id"
              >{{student.firstName }} {{student.lastName}}</li>
            </ol>
          </div>
        </tr>
      </tbody>
    </table>
    <div class="comments-box">
      <h4>Comments</h4>
      <div class="comments" v-for="comment in diary.comments" :key="comment.id">
        <li>{{comment.text}}</li>
        <p>
          <b>Comment Author:</b>
          {{comment.user.firstName}} {{comment.user.lastName}}
        </p>
        <div>
          <button @click="handleDelete(comment.id)">Delete</button>
        </div>
      </div>
    </div>
    <div class="container">
      <textarea v-model="newComment.text" cols="100" rows="5" placeholder="Writte your comment"></textarea>
      <div>
        <button class="btn btn-primary" @click="submitComment">Submit Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
import { diariesService } from "@/services/DiariesService";
import { commentsService } from "@/services/CommentsService";

export default {
  data() {
    return {
      diary: [],
      newComment:{
          text:''
      }
    }
  },

  methods: {
      submitComment() {
      this.newComment.user_id = this.diary.professor.user.id;
      diariesService.diaryCommentAdd(this.diary.id, this.newComment)
        .then(() => {
          this.newComment = {};
          diariesService
            .get(this.$route.params.id)
            .then(response => {
              this.diary = response.data;
            })
            .catch(error => {
              console.log(error);
            });
        });
    },
    handleDelete(id) {
            commentsService.commentDelete(id)
            .then(response => {
               this.diary.comments = this.diary.comments.filter(comment => comment.id !== id)
           })
  }
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
