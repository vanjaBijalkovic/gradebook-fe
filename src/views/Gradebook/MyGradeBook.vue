<template>
  <div>
    <h3>My Gradebook Page</h3>
    <table class="table table-striped table-bordered" style="width:100%">
      <thead>
        <tr>
          <th>
            <button
              v-if="user.professor.id"
              class="btn btn-secondary"
              @click="navigateToStudends()"
            >Add Student</button>
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
              <button v-if="user" class="btn btn-danger" @click="deleteDiary()">Delete Gradebook</button>
            </div>
            <div class="route">
              <router-link v-if="user" class="btn btn-secondary" :to="editRoute()">Edit Gradebook</router-link>
            </div>
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
          <button class="btn btn-secondary" v-if="user" @click="handleDelete(comment.id)">Delete</button>
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
import { professorsService } from "@/services/ProfessorsService";
import { commentsService } from "@/services/CommentsService";
import { authService } from "@/services/Auth";
import { mapGetters, mapActions } from "vuex";
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
        diariesService.myDiary(this.diary.id, this.newComment).then(() => {
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
        this.error =
          "You dont have your diary. Please first set your own diary";
      }
    },
    navigateToStudends() {
      if (this.diary.id) {
        this.$router.push(`add-student/${this.diary.id}`);
      } else {
        this.error =
          "You dont have your diary. Please first set your own diary";
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