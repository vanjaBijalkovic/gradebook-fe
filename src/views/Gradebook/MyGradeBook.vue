<template>
  <div class=container>
    <h3 class="h3">My Gradebook Page</h3>
    <table class="table table-dark">
      <thead>
        <tr>
          <th>
            <button
              v-if="user.professor.id"
              class="btn btn-md btn-primary"
              @click="navigateToStudends()"
              style="min-width: 160px;"
            >
                Add Student
              </button>
          </th>
          <th>Gradebook</th>
          <th>Professor</th>
          <th>Students</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="diary && diary.professor">
          <td width="200">
            <div class="route">
              <button v-if="user" class="btn btn-md btn-danger" @click="deleteDiary()" style="min-width: 160px;">Delete Gradebook</button>
            </div>
            <div class="route">
              <router-link v-if="user" class="btn btn-md btn-warning" :to="editRoute()" style="min-width: 160px;">Edit Gradebook</router-link>
            </div>
          </td>
          <td>{{diary.title}}</td>
          <td>{{diary.professor.user.firstName}} {{diary.professor.user.lastName}}</td>
          <td>
            <ul style="list-style:none;">
              <li
                v-for="student in diary.students"
                :key="student.id"
              >
                {{student.firstName }} {{student.lastName}}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="comments-box">
      <h4 clas="h4">Comments</h4>
      <div class="comments" v-for="comment in diary.comments" :key="comment.id">
        <p>{{comment.text}}</p>
        <p><b>Comment Author:</b></p>
        <p><b>{{comment.user.firstName}} {{comment.user.lastName}}</b></p>
        <div>
          <button class="btn btn-md btn-danger mt-3 mb-3" v-if="user" @click="handleDelete(comment.id)">Delete</button>
        </div>
      </div>
    </div>
    <div v-if="errorsList.length > 0" class="alert alert-danger">
      <p v-for="(error, index) in errorsList" :key="index">
        Message: {{ error }}
      </p>
    </div>
    <div class="input-group mb-3">
      <textarea v-model="newComment.text" cols="100" rows="5" placeholder="Writte your comment" class="form-control"></textarea>
    </div>
    <div>
      <button class="btn btn-md btn-primary" @click="submitComment">Submit Comment</button>
    </div>
  </div>
</template>

<script>
import { diariesService } from "@/services/DiariesService";
import { commentsService } from "@/services/CommentsService";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      diary: [],
      newComment: {
        text: ""
      },
      loggedUser: "",
      errorsList: []
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      errors: "getError"
    })
  },
  methods: {
    submitComment() {
      if (this.diary && this.diary.id) {
        this.newComment.user_id = this.diary.professor.user.id;
        diariesService.diaryCommentAdd(this.diary.id, this.newComment).then(() => {
          this.newComment = {};
          diariesService
            .get(this.$route.params.id)
            .then(response => {
              this.diary = response.data;
            })
            .catch(error => {
              this.errorsList = error.response.data.errors;
            });
        });
      } else {
        if (this.errorsList.length < 1) {
          this.errorsList.push( "You dont have your diary. Please first set your own diary");
        }
      }
    },
    navigateToStudends() {
      if (this.diary.id) {
        this.$router.push(`add-student/${this.diary.id}`);
      } else {
        if (this.errorsList.length < 1) {
          this.errorsList.push( "You dont have your diary. Please first set your own diary");
        }
      }
    },
    handleDelete(id) {
      if (confirm("Are you sure?")) {
        commentsService.commentDelete(id).then(response => {
          this.diary.comments = this.diary.comments.filter(
            comment => comment.id !== id
          );
        });
      }
    },
    deleteDiary() {
      if (confirm("Are you sure?")) {
        diariesService.delete(this.diary.id).then(() => {
          this.$router.push("/gradebooks");
        });
      }
    },
    editRoute() {
      return `/single-gradebook/${this.diary.id}/edit`;
    }
  },
  created() {
    diariesService
      .myDiary(JSON.parse(window.localStorage.getItem("user")).professor.id)
      .then(response => {
        this.diary = response.data;
      })
      .catch(error => {
        this.errorsList = error.response.data.errors;
      });
  },
  beforeDestroy() {
    this.$eventHub.$off("logged-in");
  }
};
</script>
<style>
</style>