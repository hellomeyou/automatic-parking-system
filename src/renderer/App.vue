<template lang="pug">
    .app
        <!--.app__top Automatic parking-->
        .app__main
            router-view
</template>

<script>
  export default {
    name: 'automatic-parking-system'
  }
</script>

<style lang="scss">
    /* CSS */
    * {
        padding: 0;
        margin: 0;
    }
    .app {
        min-height: 100vh;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        display: flex;
        flex-direction: column;
        background-color: black;
        &__top {
            -webkit-app-region: drag;
            height: 30px;
            line-height: 30px;
            color: #fff;
            text-align: center;
        }
        &__main {
            flex: 1;
            display: flex;
        }
    }
</style>
