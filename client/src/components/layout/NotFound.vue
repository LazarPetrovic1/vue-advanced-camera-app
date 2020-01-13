<template lang="html">
  <div class="custom">
    <div class='text-center'>
      <h2>
        <span class='text-warning'>Warning: </span>
        <span class='text-danger'>Page not found</span>
      </h2>
      <p class='text-info'>
        This action might have been accidental or the page you were looking for has since been removed.
      </p>
      <small class='text-secondary'>
        Either way, there's nothing for you here, so you can just...
      </small>
      <router-link class='mt-5 btn btn-outline-primary btn-block animated infinite heartBeat' :to="{ name: 'Dashboard' }">
        Go back
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  name: "NotFound"
}
</script>

<style lang="css" scoped>
.custom {
  margin: 10% auto 0 auto;
  max-width: 500px;
}
</style>
