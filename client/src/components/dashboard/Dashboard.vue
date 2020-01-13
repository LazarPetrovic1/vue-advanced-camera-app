<template lang="html">
  <div class="custom-cont container mt-4 animated zoomInUp">
    <h1 class="text-center mt-2" v-if="user">
      Welcome, {{user.name}}
    </h1>
    <h1 class="text-center mt-2" v-else>
      Loading...
    </h1>
    <div class='mt-4 shadow p-3 border-bottom border-left border-primary'>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus provident non reprehenderit rerum ratione obcaecati consectetur laboriosam eum quisquam nemo soluta, cum et, quasi facere sapiente repudiandae vero atque. Qui odit debitis perferendis. Quibusdam ipsam sint quisquam labore consequuntur pariatur, velit a exercitationem nesciunt. Debitis repellendus nam, praesentium aspernatur, accusamus error? Commodi recusandae eligendi sint veritatis optio id voluptas eaque reiciendis repellat itaque voluptate, rerum, molestiae consequatur libero dicta temporibus nihil asperiores illum nam minima dolor. Reiciendis odio expedita beatae velit alias delectus corrupti eligendi quod, illo ratione amet, dolores aspernatur. Officia tempore maxime minima debitis quos. Temporibus eum ipsam dolorum labore consequuntur, delectus, soluta molestias, tenetur eos reprehenderit praesentium perferendis distinctio et sapiente molestiae harum vitae. Enim, ipsa quas.
    </div>
    <router-link class="btn btn-primary btn-block mt-4" :to="{ name: 'Features' }">Go to features</router-link>
  </div>
</template>

<script>
import axios from 'axios'
import setAuthToken from '@/utils/setAuthToken'

export default {
  name: "Dashboard",
  data() {
    return {
      user: null
    }
  },
  created() {
    const getUser = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token)
      }
      try {
        const res = await axios.get("http://localhost:5000/api/auth")
        this.user = await res.data
      } catch (e) {
        return e.message;
      }
    }
    getUser()
  },
  computed: {
    token() {
      return localStorage.getItem("token")
    }
  }
}
</script>

<style lang="css" scoped>
.custom-cont {
  max-width: 850px;
}
</style>
