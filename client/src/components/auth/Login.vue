<template lang="html">
  <div class="container">
    <h1 class='text-primary text-center mt-5'>
      <i class='fas fa-user'></i>&nbsp;&nbsp;
        Sign in to your account
    </h1>
    <form
      @submit.prevent="login"
      class='animated fadeIn p-3 border-bottom border-left shadow border-primary'
    >
      <div class='form-group'>
        <label for='email'>Email address</label>
        <input
          type='email'
          class='form-control'
          v-model="email"
          placeholder="e.g. test@test.com"
          aria-describedby='emailHelp'
        >
        <small
          id='emailHelp'
          class='form-text text-muted'
        >
          We'll never share your email with anyone else.
        </small>
      </div>
      <div class='form-group'>
        <label for='password'>Password</label>
        <input
          type='password'
          class='form-control'
          v-model="password"
        >
      </div>
      <p class="text-danger text-center" v-if="msg">{{msg}}</p>
      <input
        type='submit'
        class='btn btn-primary btn-block'
        value='Log me in!'
      >
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      msg: ''
    }
  },
  methods: {
    async login() {
      if (this.email && this.password) {
        this.msg = null
      } else {
       this.msg = "You must enter e-mail and password."
      }

      try {
        const body = {
          email: this.email,
          password: this.password
        }

        // Fallback config
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        const res = await axios.post(
          "http://localhost:5000/api/auth/",
          body,
          config
        )

        const {token} = await res.data
        await localStorage.setItem("token", token)
        this.$router.push({name: "Dashboard", params: {token}})
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="css" scoped>
form {
  max-width: 550px;
  margin: 3em auto;
}
</style>
