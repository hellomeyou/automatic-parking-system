<template lang="pug">
    .login
        <!--router-link.usermode(to="/calibrationmodel/index") 校准模式-->
        <!--router-link.usermode(to="/usermode/index") 用户模式-->
        i.el-icon-loading
</template>

<script>
    import { ipcRenderer } from 'electron'
    export default {
        name: 'index',
        created () {
            ipcRenderer.send('is_initialize')
            ipcRenderer.on('is_initialize-reply', (event, args) => {
                console.log(args)
                if (args.is_initialize === 'no') {
                    this.$router.push('/calibrationmodel/index')
                } else if (args.is_initialize === 'yes') {
                    this.$router.push('/usermode/index')
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .login {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        a {
            margin: 0 20px;
            display: block;
            color: rgba(255, 255, 255, 0.6);
        }
    }
</style>
