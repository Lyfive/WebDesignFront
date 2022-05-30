<template>
  <div id="main">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    this.$router.push("/login")
  },
}
</script>

<style>
* {
  overflow: hidden;
}

#app {
  position: absolute;
  height: 100%;
  width: 100%;
}

#main {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
