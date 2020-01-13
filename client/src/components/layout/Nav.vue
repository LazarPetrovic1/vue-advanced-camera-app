<template lang="html">
  <nav class='navbar navbar-expand-lg navbar-dark bg-primary'>
    <router-link class='navbar-brand' :to="{ name: 'Landing' }">RandomApp</router-link>
    <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
      <span class='navbar-toggler-icon' />
    </button>

    <div class='collapse navbar-collapse' id='navbarSupportedContent'>
      <ul class='navbar-nav ml-auto'>
        <li class='nav-item active' v-if="!token">
          <router-link class='nav-link' :to="{ name: 'Landing' }">
            <i class="fas fa-home"></i>&nbsp;&nbsp;Home
          </router-link>
        </li>
        <li class='nav-item active'>
          <router-link class='nav-link' :to="{ name: 'About' }">
            <i class="fas fa-info"></i>&nbsp;&nbsp;About
          </router-link>
        </li>
        <li class='nav-item active' v-if="!token">
          <router-link class='nav-link' :to="{ name: 'Login' }">
            <i class="fas fa-sign-in-alt"></i>&nbsp;&nbsp;Login
          </router-link>
        </li>
        <li class='nav-item active' v-if="!token">
          <router-link class="nav-link" :to="{ name: 'Register' }">
            <i class="fas fa-user-plus"></i>&nbsp;&nbsp;Register
          </router-link>
        </li>
        <li class='nav-item active' v-if="token">
          <router-link class="nav-link" :to="{ name: 'Features' }">
            <i class="fas fa-camera"></i>&nbsp;&nbsp;Snap!
          </router-link>
        </li>
        <li class='nav-item active' v-if="token">
          <router-link class="nav-link" :to="{ name: 'Dashboard' }">
            <i class="fas fa-tachometer-alt"></i>&nbsp;&nbsp;Dashboard
          </router-link>
        </li>
        <li class='nav-item active' v-if="token">
          <router-link class="nav-link" :to="{ name: 'Images' }">
            <i class="fas fa-images"></i>&nbsp;&nbsp;Images
          </router-link>
        </li>
        <li class='nav-item active' v-if="token">
          <span class="nav-link pointer" @click="logout">
            <i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Logout
          </span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      token: localStorage.getItem("token")
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token")
      this.$router.push({name: "Login"})
    }
  }
}
</script>

<style lang="css" scoped>
.pointer {
  cursor: pointer;
}
</style>
