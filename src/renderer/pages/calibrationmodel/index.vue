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
        #myChart(style="width: 300px;height: 300px;")
</template>

<script>
    import { ipcRenderer } from 'electron'
    import echarts from 'echarts/lib/echarts'
    require('echarts/lib/chart/scatter')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
        name: 'index',
        data () {
            return {
                formData: {},
                formInit: {}
            }
        },
        created () {
            ipcRenderer.on('runtime_para-reply', (event, args) => {
                console.log(args)
            })
        },
        mounted () {
            this.drawLine()
        },
        methods: {
            onLevelCalibration () {
                console.log('提交了')
            },
            drawLine () {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: {text: '测量区扫描点'},
                    xAxis: {},
                    yAxis: {},
                    series: [{
                        symbolSize: 20,
                        data: [
                            [10.0, 8.04],
                            [8.0, 6.95],
                            [13.0, 7.58],
                            [9.0, 8.81],
                            [11.0, 8.33],
                            [14.0, 9.96],
                            [6.0, 7.24],
                            [4.0, 4.26],
                            [12.0, 10.84],
                            [7.0, 4.82],
                            [5.0, 5.68]
                        ],
                        type: 'scatter'
                    }]
                })
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
