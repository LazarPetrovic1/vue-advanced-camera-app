<template lang="html">
  <div class="animated bounceInUp">
    <ul>
      <div class='container d-flex justify-content-between'>
        <li v-if="!token">
          <span>
            <h2>What are you waiting for?</h2>
            <router-link class="nav-link sticky-item" :to="{ name: 'Login' }">
              Log in &nbsp;
              <i class="fas fa-sign-in-alt"></i>
            </router-link>
          </span>
        </li>
        <li v-if="token">
          <span>
            <h2>Try our features!</h2>
            <router-link class="nav-link sticky-item" :to="{ name: 'Features' }">
              Snap away &nbsp;
              <i class="fas fa-camera"></i>
            </router-link>
          </span>
        </li>
        <li v-if="!token">
          <span>
            <h2>Don't have an account?</h2>
            <router-link class="nav-link sticky-item" :to="{ name: 'Register' }">
              Sign up &nbsp;
              <i class="fas fa-user-plus"></i>
            </router-link>
          </span>
        </li>
        <li v-if="token">
          <span>
            <h2>See your pictures</h2>
            <router-link class="nav-link sticky-item" :to="{ name: 'Images' }">
              Gallery &nbsp;
              <i class="fas fa-images"></i>
            </router-link>
          </span>
        </li>
        <li>
          <span>
            <h2>What is this?</h2>
            <router-link class="nav-link sticky-item" :to="{ name: 'About' }">
              About our application &nbsp; <i class='fas fa-info'></i>
            </router-link>
          </span>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Landing",
  computed: {
    token() {
      return localStorage.getItem("token")
    }
  }
}
</script>

<style lang="css" scoped>

h2, p {
  font-family:"Reenie Beanie",arial,sans-serif;
  font-size: 300%;
  font-weight:normal;
}

ul, li {
  list-style:none;
}

ul {
  overflow:hidden;
  padding:3em;
}

ul li span {
  text-decoration:none;
  color:#000;
  background:#ffc;
  display:block;
  height:17em;
  width:17em;
  padding:1em;
  -moz-box-shadow:5px 5px 7px rgba(33,33,33,1);
  -webkit-box-shadow: 5px 5px 7px rgba(33,33,33,.7);
  box-shadow: 5px 5px 7px rgba(33,33,33,.7);
  -moz-transition:-moz-transform .15s linear;
  -o-transition:-o-transform .15s linear;
  -webkit-transition:-webkit-transform .15s linear;
  -webkit-transform: rotate(-6deg);
  -o-transform: rotate(-6deg);
  -moz-transform:rotate(-6deg);
}

ul li {
  margin:1em;
  float:left;
}

ul li h2 {
  font-weight:bold;
  padding-bottom:10px;
}

.sticky-item {
  font-family:"Reenie Beanie",arial,sans-serif;
  font-size:250%;
}

ul li:nth-child(2) span {
  -o-transform:rotate(4deg);
  -webkit-transform:rotate(4deg);
  -moz-transform:rotate(4deg);
  position:relative;
  top:5px;
  background:#cfc;
}

ul li:nth-child(3) span {
  -o-transform:rotate(-3deg);
  -webkit-transform:rotate(-3deg);
  -moz-transform:rotate(-3deg);
  position:relative;
  top:-5px;
  background:#ccf;
}

ul li span:hover,ul li span:focus{
  box-shadow:10px 10px 7px rgba(0,0,0,.7);
  -moz-box-shadow:10px 10px 7px rgba(0,0,0,.7);
  -webkit-box-shadow: 10px 10px 7px rgba(0,0,0,.7);
  -webkit-transform: scale(1.25);
  -moz-transform: scale(1.25);
  -o-transform: scale(1.25);
  position:relative;
  z-index:5;
}

</style>
