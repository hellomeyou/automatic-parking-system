<template lang="pug">
    .index 校准模式
        router-link.usermode(to="/") 首页
        .index__main
            .index__main--title 测量仪校准
            el-form.demo-form-inline(:inline='true', :model='formData')
                el-form-item(label='测量矩形长')
                    el-col.line(:span='20')
                        el-input(v-model='formData.user', placeholder='7000')
                    el-col.line(:span='4') mm
                el-form-item(label='测量矩形宽')
                    el-col.line(:span='20')
                        el-input(v-model='formData.user', placeholder='4000')
                    el-col.line(:span='4') mm
            el-form.demo-form-inline(:model='formInit')
                el-form-item(label='1号测量值')
                    el-col.line(:span='1') 长边
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                    el-col.line(:span='1') 宽边
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                el-form-item(label='2号测量值')
                    el-col.line(:span='1') 长边
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                    el-col.line(:span='1') 宽边
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                el-form-item(label='3号测量值')
                    el-col.line(:span='1') 长边
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                    el-col.line(:span='1') 宽边
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                el-form-item(label='4号测量值')
                    el-col.line(:span='1') 长边
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                    el-col.line(:span='1') 宽边
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                el-form-item
                    el-button(type='primary', @click='onLevelCalibration') 测量水平校准
            .index__main--title 水平参数校准
            el-form.demo-form-inline(:inline='true', :model='formData')
                el-form-item(label='校准轮胎直径')
                    el-col.line(:span='20')
                        el-input(v-model='formData.user', placeholder='7000')
                    el-col.line(:span='4') mm)
            el-form.demo-form-inline(:model='formInit')
                el-form-item(label='当前')
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                    el-col.line(:span='1') 平均
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                    el-col.line(:span='1') 测量次数
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                el-form-item(label='当前')
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                    el-col.line(:span='1') 平均
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                    el-col.line(:span='1') 测量次数
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                el-form-item(label='当前')
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                    el-col.line(:span='1') 平均
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                    el-col.line(:span='1') 测量次数
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                el-form-item(label='当前')
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                    el-col.line(:span='1') 平均
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                    el-col.line(:span='1') 测量次数
                    el-col.line(:span='3')
                        el-input(v-model='formData.user', placeholder='')
                el-form-item
                    el-button(type='primary', @click='onLevelCalibration') 测量车轮
</template>

<script>
  import { ipcRenderer } from 'electron'
  export default {
    name: 'index',
    data () {
      return {
        formData: {},
        formInit: {}
      }
    },
    created () {
      ipcRenderer.send('sendMessage')
    },
    methods: {
      onLevelCalibration () {
        console.log('提交了')
      }
    }
  }
</script>

<style scoped lang="scss">
    .index {
        flex: 1;
        width: 100%;
        color: rgba(255, 255, 255, 0.6);
        a {
            display: block;
            color: rgba(255, 255, 255, 0.6);
        }
    }
</style>
