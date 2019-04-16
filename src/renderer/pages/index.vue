<template lang="pug">
    .login
        .login__main
            router-link.usermode(to="/usermode/usermode") 用户模式
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style scoped lang="scss">
    .login {
        &__main {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
