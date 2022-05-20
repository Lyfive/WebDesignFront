<template>
  <div>
    <a href="/userList">百度</a>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  setup() {
    // todo
    return {}
  }
})
</script>

<style scoped>
a:link {
  color: red;
}

a:visited {
  color: purple;
}

a:hover {
  color: blue;
}

a:active {
  color: green;
}

</style>
