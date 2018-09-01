<template>
  <div>
    <hello-world />
    ssnedkw
  </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue'

export default {
  components: {
    HelloWorld
  },

  data () {
    return {}
  }
}
</script>

<style>
body {
  color: #333333;
}
.nav > a.active {
  font-weight: bold;
  font-size: 1.2em;
}
.view {
  transition: opacity .2s ease;
}
.view.fade-enter-active,
.view.fade-leave-active {
  opacity: 0;
}
</style>
