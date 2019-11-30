<template>
  <div class="container mt-4">
    <form class="form-signin" @submit.prevent="loginUser">
      <h2 class="form-signin-heading">Please login</h2>
      <input
        v-model="email"
        type="text"
        class="form-control"
        name="email"
        placeholder="Email Address"
        required
        autofocus
      />
      <input
        v-model="password"
        type="password"
        class="form-control mt-3"
        name="password"
        placeholder="Password"
        required
      />
      <div class="alert alert-danger mt-3" v-if="errorsFromRest">
          Message:     {{ errorsFromRest }}
      </div>

      <button class="btn btn-lg btn-primary btn-block mt-3" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions({
      login: "login"
    }),
    loginUser() {
      this.login({
        email: this.email,
        password: this.password
      }).then(r => {
        if (r) {
          this.$router.push("/gradebooks");
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      errorsFromRest: "getError"
    })
  }
};
</script>