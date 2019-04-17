<template lang="pug">
    .index 校准模式
        router-link.usermode(to="/") 首页
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style scoped lang="scss">
    .index {
        color: rgba(255, 255, 255, 0.6);
        a {
            display: block;
            color: rgba(255, 255, 255, 0.6);
        }
    }
</style>
