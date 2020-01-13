<template lang="html">
  <div class="container">
    <h1 class="text-center mt-3">Recently taken images</h1>
    <router-link :to="{ name: 'Editor' }" class="btn btn-primary btn-block">
      Go to the Editor
    </router-link>
    <div class="d-flex flex-row flex-wrap" v-if="imgs.length > 1">
      <div class="rel" v-for="img in imgs">
        <img :src="imageLink(img)" :title="img" class="image">
        <i class="fas fa-trash fa-2x abs1" title="Delete the image" @click="remove(img)"></i>
        <i class="fas fa-folder-open fa-2x abs2" title="Open folder" @click="open"></i>
      </div>
    </div>
    <div v-else class="container marg text-secondary">
      <h1>{{msg}}</h1>
      <router-link class="btn btn-secondary btn-block" :to="{ name: 'Features' }">
        Snap some
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Images",
  data() {
    return {
      imgs: null,
      msg: null
    }
  },
  mounted() {
    const getImages = async () => {
      const res = await axios.get("http://localhost:5000/api/auth/images")
      this.imgs = await res.data.images
      await console.log(res.data.images)
      if (res.data.images.length < 1) {
        this.msg = "There are no images in the folder"
      }
    }
    getImages()
  },
  methods: {
    imageLink(img) {
      return require(`../../assets/images/${img}`)
    },
    async remove(name) {
      await axios.delete(`http://localhost:5000/api/auth/images/${name}`)
    },
    async open() {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/image")
      } catch (e) {
        console.error(e.message)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.image {
  max-width: 500px;
  margin: 10px;
  cursor: pointer;
}

.rel {
  position: relative;
}

.abs1 {
  position: absolute;
  top: 30px;
  right: 40px;
  cursor: pointer;
  transition: 100ms linear all;
  color: white;
}

.abs2 {
  position: absolute;
  top: 30px;
  left: 40px;
  cursor: pointer;
  transition: 100ms linear all;
  color: white;
}

.abs1:hover {
  color: red;
}

.abs2:hover {
  color: navy;
}

.marg {
  margin-top: 8em;
}
</style>
