<template lang="html">
  <div class="row">
    <div class="col-xl-7 col-lg-7 col-md-8">
      <h1>Take a picture!</h1>
        <video ref="video" autoplay id="video" width="640" height="480"></video>
        <div class="container">
          <button id="snap" class="btn btn-outline-success shadow btn-perfect" @click="capture()">Snap!</button>
        </div>
      <canvas class="nope" ref="canvas" id="canvas" width="640" height="480"></canvas>
    </div>
    <div class="col-xl-5 col-lg-5 col-md-4">
      {{msg}}
      <ul class="ul">
        <li v-for="c in captures" class="li" :key="c">
          <div class="d-flex align-items-center">
            <i class="fas fa-folder-open fa-5x pointer" @click="open"></i>&nbsp;&nbsp;<img :src="c" height="80">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Features",
  beforeCreate() {
    if (window.location.pathname === "/features") {
      document.body.className = "hide"
    } else {
      document.body.className = ""
    }
  },
  data() {
    return {
      video: {},
      canvas: {},
      captures: [],
      msg: ""
    }
  },
  mounted() {
    this.video = this.$refs.video
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => {
          this.video.srcObject = stream
      })
    }
  },
  methods: {
    async capture() {
      this.canvas = this.$refs.canvas
      let context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480)
      this.captures.push(canvas.toDataURL("image/png"))

      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        const img = this.captures[
          this.captures.length - 1
        ]

        const res = await axios.post("http://localhost:5000/api/auth/image", JSON.stringify({img}), config)
        await console.log(res.data)
      } catch (e) {
        console.error(e.message)
      }
      this.msg = "Image saved at '[APP_ROOT]/client/src/assets/images' folder"
    },
    async open() {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/image")
        await console.log(res.data)
      } catch (e) {
        console.error(e.message)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.nope {
  display: none;
}

.ul {
  list-style: none;
  list-style-type: none;
}

.li {
  display: inline-block;
  padding: 0.5em;
}

.btn-perfect {
  position: relative;
  display: block;
  margin: 10px auto;
  width: 640px;
  transition-duration: 0.4s;
  overflow: hidden;
}

.btn-perfect:active {
  transform: translateY(4px);
  box-shadow: 0 5px #666;
}

.btn-perfect:after {
  content: "";
  background: #f1f1f1;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

.btn-perfect:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}

.pointer {
  cursor: pointer;
}
</style>
