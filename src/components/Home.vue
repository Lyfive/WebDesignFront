<script>
export default {
    data() {
        return {
            "msg": "hello world"
        }
    }
}
</script>

<template>
    <div id="home">
        {{ msg }}
    </div>
</template>
<style scoped>
#home {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #fff;
}
</style>