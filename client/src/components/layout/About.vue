<template lang="html">
  <div
    class='container text-center animated bounceInDown p-3 shadow border-left border-bottom border-primary'
    id="about"
  >
    <h2>RandomApp using React and Redux</h2>
    <p class='mt-2'>Created on: {{dayMade}}</p>
    <p>Version: 1.0.0</p>
    <router-link class='btn btn-block btn-primary p-2' :to="{ name: 'Landing' }">Back</router-link>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "About",
  data() {
    return {
      date: new Date("Wed Dec 25 2019 15:31:59 GMT-0500 (Eastern Standard Time)")
    }
  },
  computed: {
    dayMade() {
      return moment().format("DD.MM.YYYY")
    }
  }
}
</script>

<style lang="css" scoped>
#about {
  max-width: 550px;
  margin-top: 10%
}
</style>
