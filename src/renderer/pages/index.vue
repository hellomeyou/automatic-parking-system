<template lang="pug">
    .login
        router-link.usermode(to="/calibrationmodel/index") 校准模式
        router-link.usermode(to="/usermode/index") 用户模式
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style scoped lang="scss">
    .login {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        a {
            display: block;
            color: rgba(255, 255, 255, 0.6);
        }
    }
</style>
