<template>
  <div class="container mt-4">
    <form @submit.prevent="addUser">
      <h2>Register</h2>
      <div class="form-group row">
        <label for="name" class="col-4 col-form-label">First Name</label>
        <div class="col-8">
          <div class="input-group">
            <input
              id="firstName"
              name="firstName"
              type="text"
              class="form-control here"
              v-model="user.firstName"
              maxlength="255"
              required
            />
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="lastName" class="col-4 col-form-label">Last Name</label>
        <div class="col-8">
          <div class="input-group">
            <input
              id="lastName"
              name="lastName"
              type="text"
              class="form-control here"
              v-model="user.lastName"
              maxlength="255"
              required
            />
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="password" class="col-4 col-form-label">Password</label>
        <div class="col-8">
          <div class="input-group">
            <input
              id="password"
              name="password"
              type="text"
              class="form-control here"
              v-model="user.password"
              pattern="(?=.*\d).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="passwordConfirmation" class="col-4 col-form-label">Password Confirmation</label>
        <div class="col-8">
          <div class="input-group">
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="text"
              class="form-control here"
              v-model="user.passwordConfirmation"
              minlength="8"
            />
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-4 col-form-label">Email</label>
        <div class="col-8">
          <input
            id="email"
            name="email"
            type="email"
            class="form-control here"
            v-model="user.email"
            maxlength="255"
            required
          />
        </div>
      </div>
      <div>
        <label for="termsAndConditions">Accept terms and conditions</label>
        <input type="checkbox" id="termsAndConditions" v-model="user.termsAndConditions" />
      </div>
      <div class="form-group row">
        <div class="offset-4 col-8">
          <button name="submit" type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>

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
  </div>
</template>

<script>
import { authService } from "@/services/Auth";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        password: "",
        passwordConfirmation: "",
        email: "",
        termsAndConditions: true
      },
      errorsList: []
    };
  },

  computed: {
    ...mapGetters({
      errorsFromRest: "getError"
    })
  },

  methods: {
    ...mapActions({
      login: "login"
    }),
    addUser() {
      if (this.user.password == this.user.passwordConfirmation) {
        authService
          .register(
            this.user.firstName,
            this.user.lastName,
            this.user.password,
            this.user.email
          )
          .then(() => {
            this.login({
              email: this.user.email,
              password: this.user.password
            }).then(() => {
              this.$router.push("/gradebooks");
            });
          })
          .catch(e => {
            this.errorsList = e.response.data.errors;
          });
      } else {
        alert("Your passwords doesn`t match, try again, please");
      }
    }
  }
};
</script>
