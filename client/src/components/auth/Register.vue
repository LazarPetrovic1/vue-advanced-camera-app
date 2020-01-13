<template lang="html">
  <div class="container">
    <h1 class='text-primary text-center mt-3'>
      <i class='fas fa-user-plus' />&nbsp;&nbsp;
      Sign up to our service
    </h1>
    <form
      @submit.prevent="signup"
      class='animated fadeIn p-3 border-bottom border-left shadow border-primary'
    >
      <div class='form-group'>
        <label for='name'>Your name</label>
        <input
          type='text'
          name="name"
          class='form-control'
          v-model="name"
        />
      </div>
      <div class='form-group'>
        <label for='email'>Email address</label>
        <input
          type='email'
          name="email"
          class='form-control'
          v-model="email"
        />
      </div>
      <div class='form-group'>
        <label for='password'>Password</label>
        <input
          type='password'
          name="password"
          class='form-control'
          v-model="password"
        />
      </div>
      <div class='form-group'>
        <label for='password2'>Verify password</label>
        <input
          type='password'
          name="password2"
          class='form-control'
          v-model="password2"
        />
      </div>
      <p class="text-danger text-center" v-if="msg">{{msg}}</p>
      <input type='submit' class='btn btn-primary btn-block' value='Sign me up!' />
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Register",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password2: '',
      msg: ''
    }
  },
  methods: {
    async signup() {
      if (
        this.name &&
        this.email &&
        this.password &&
        this.password2
      ) {
        this.msg = null
      }
      if (
        this.name &&
        this.email &&
        this.password &&
        this.password2
      ) {
        try {
          const body = {
            name: this.name,
            email: this.email,
            password: this.password
          }

          const config = {
            headers: {
              "Content-Type": "application/json",
            }
          }

          const res = await axios.post(
            "http://localhost:5000/api/users/",
            body,
            config
          )

          const {token} = await res.data
          await localStorage.setItem("token", token)
          await console.log(res);
          this.$router.push({name: "Dashboard", params: {token}})
        } catch (e) {
          console.log(e)
        }
      } else {
        this.msg = "You must enter e-mail and password."
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
