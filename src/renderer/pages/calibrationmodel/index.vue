<template lang="pug">
    .index 校准模式
        router-link.usermode(to="/") 首页
        .index__main
            .index__main--flex
                .index__main--title 测量仪校准
                el-form.demo-form-inline(:inline='true', :model='standard')
                    el-form-item(label='测量矩形长')
                        el-col.line(:span='24')
                            el-input(v-model.number='standard.length', placeholder='请输入测量车库的长')
                                template(slot="append") mm
                    el-form-item(label='测量矩形宽')
                        el-col.line(:span='24')
                            el-input(v-model.number='standard.height', placeholder='请输入测量车库的宽')
                                template(slot="append") mm
                el-form.demo-form-inline(:model='parkingSide')
                    el-form-item(label='1号测量值')
                        el-row( :gutter="20")
                            el-col.line(:span='6')
                                el-input(v-model='parkingSide.No1.length', placeholder='', :disabled="true")
                                    template(slot="prepend") 长边
                                    template(slot="append") mm
                            el-col.line(:span='6')
                                el-input(v-model='parkingSide.No1.height', placeholder='', :disabled="true")
                                    template(slot="prepend") 宽边
                                    template(slot="append") mm
                    el-form-item(label='2号测量值')
                        el-row( :gutter="20")
                            el-col.line(:span='6')
                                el-input(v-model='parkingSide.No2.length', placeholder='', :disabled="true")
                                    template(slot="prepend") 长边
                                    template(slot="append") mm
                            el-col.line(:span='6')
                                el-input(v-model='parkingSide.No2.height', placeholder='', :disabled="true")
                                    template(slot="prepend") 宽边
                                    template(slot="append") mm
                    el-form-item(label='3号测量值')
                        el-row( :gutter="20")
                            el-col.line(:span='6')
                                el-input(v-model='parkingSide.No3.length', placeholder='', :disabled="true")
                                    template(slot="prepend") 长边
                                    template(slot="append") mm
                            el-col.line(:span='6')
                                el-input(v-model='parkingSide.No3.height', placeholder='', :disabled="true")
                                    template(slot="prepend") 宽边
                                    template(slot="append") mm
                    el-form-item(label='4号测量值')
                        el-row( :gutter="20")
                            el-col.line(:span='6')
                                el-input(v-model='parkingSide.No4.length', placeholder='', :disabled="true")
                                    template(slot="prepend") 长边
                                    template(slot="append") mm
                            el-col.line(:span='6')
                                el-input(v-model='parkingSide.No4.height', placeholder='', :disabled="true")
                                    template(slot="prepend") 宽边
                                    template(slot="append") mm
                    el-form-item(label="已通过测量校准次数")
                        el-row( :gutter="20")
                            el-col.line(:span='6')
                                el-input(v-model='calibrationCount', placeholder='', :disabled="true")
                                    template(slot="prepend") 次数
                            el-col.line(:span='6') 需测量通过校准5次
                    el-form-item
                        el-button(type='primary', @click='onLevelCalibration', :disabled="runtimeMode == 1 ? false : true") 测量水平校准

                .index__main--title 水平参数校准
                el-form.demo-form-inline(:inline='true', :model='standard')
                    el-form-item(label='校准轮胎直径')
                        el-col.line(:span='24')
                            el-input(v-model.number='standard.diameter', placeholder='请输入校准轮胎直径')
                                template(slot="append") mm
                el-form.demo-form-inline(:model='formInit')
                    el-form-item(label="一号轮胎高度")
                        el-row( :gutter="20")
                            el-col.line(:span='6')
                                el-input(v-model='heightFromGround.No1', placeholder='', :disabled="true")
                                    template(slot="prepend") 当前
                                    template(slot="append") mm
                            el-col.line(:span='6')
                                el-input(v-model='wheel1Height', placeholder='', :disabled="true")
                                    template(slot="prepend") 平均
                                    template(slot="append") mm
                            el-col.line(:span='6')
                                el-input(v-model='heightFromGroundAverage.No1.count', placeholder='', :disabled="true")
                                    template(slot="prepend") 测量次数平均
                    el-form-item(label="二号轮胎高度")
                        el-row( :gutter="20")
                            el-col.line(:span='6')
                                el-input(v-model='heightFromGround.No2', placeholder='', :disabled="true")
                                    template(slot="prepend") 当前
                                    template(slot="append") mm
                            el-col.line(:span='6')
                                el-input(v-model='wheel2Height', placeholder='', :disabled="true")
                                    template(slot="prepend") 平均
                                    template(slot="append") mm
                            el-col.line(:span='6')
                                el-input(v-model='heightFromGroundAverage.No2.count', placeholder='', :disabled="true")
                                    template(slot="prepend") 测量次数平均
                    el-form-item(label="三号轮胎高度")
                        el-row( :gutter="20")
                            el-col.line(:span='6')
                                el-input(v-model='heightFromGround.No3', placeholder='', :disabled="true")
                                    template(slot="prepend") 当前
                                    template(slot="append") mm
                            el-col.line(:span='6')
                                el-input(v-model='wheel3Height', placeholder='', :disabled="true")
                                    template(slot="prepend") 平均
                                    template(slot="append") mm
                            el-col.line(:span='6')
                                el-input(v-model='heightFromGroundAverage.No3.count', placeholder='', :disabled="true")
                                    template(slot="prepend") 测量次数平均
                    el-form-item(label="四号轮胎高度")
                        el-row( :gutter="20")
                            el-col.line(:span='6')
                                el-input(v-model='heightFromGround.No4', placeholder='', :disabled="true")
                                    template(slot="prepend") 当前
                                    template(slot="append") mm
                            el-col.line(:span='6')
                                el-input(v-model='wheel4Height', placeholder='', :disabled="true")
                                    template(slot="prepend") 平均
                                    template(slot="append") mm
                            el-col.line(:span='6')
                                el-input(v-model='heightFromGroundAverage.No4.count', placeholder='', :disabled="true")
                                    template(slot="prepend") 测量次数平均
                    el-form-item
                        el-button(type='primary', @click='onCalibrationHeightFromGroundCount', :disabled="runtimeMode == 2 && allowSaveSet ? false : true") 测量车轮
            .index__main--flex
                #myChart(style="width: 600px;height: 600px;")
                el-button(type='primary', @click='onRefreshViewLayerData', :disabled="runtimeMode == 2 ? false : true") 刷新数据
                el-button(type='primary', @click='viewLayer("all")', :disabled="runtimeMode == 2 ? false : true") 全景
                el-button(type='primary', @click='viewLayer("no1")', :disabled="runtimeMode == 2 ? false : true") 一号轮
                el-button(type='primary', @click='viewLayer("no2")', :disabled="runtimeMode == 2 ? false : true") 二号轮
                el-button(type='primary', @click='viewLayer("no3")', :disabled="runtimeMode == 2 ? false : true") 三号轮
                el-button(type='primary', @click='viewLayer("no4")', :disabled="runtimeMode == 2 ? false : true") 四号轮
        el-button(type='primary', @click='onSaveSettings', :disabled="allowSaveSet") 保存设置
</template>

<script>
    import { ipcRenderer } from 'electron'
    import echarts from 'echarts/lib/echarts'
    require('echarts/lib/chart/scatter')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
        name: 'index',
        computed: {
            wheel1Height: {
                get: function () {
                    let average = 0
                    this.heightFromGroundAverage.No1.value.forEach(item => {
                        average += item
                    })
                    return average / this.heightFromGroundAverage.No1.count || 0
                }
            },
            wheel2Height: {
                get: function () {
                    let average = 0
                    this.heightFromGroundAverage.No2.value.forEach(item => {
                        average += item
                    })
                    return average / this.heightFromGroundAverage.No2.count || 0
                }
            },
            wheel3Height: {
                get: function () {
                    let average = 0
                    this.heightFromGroundAverage.No3.value.forEach(item => {
                        average += item
                    })
                    return average / this.heightFromGroundAverage.No3.count || 0
                }
            },
            wheel4Height: {
                get: function () {
                    let average = 0
                    this.heightFromGroundAverage.No4.value.forEach(item => {
                        average += item
                    })
                    return average / this.heightFromGroundAverage.No4.count || 0
                }
            }
        },
        data () {
            return {
                formData: {},
                standard: {},
                formInit: {},
                runtimeMode: 1,
                parkingSide: {
                    No1: {},
                    No2: {},
                    No3: {},
                    No4: {}
                },
                calibrationError: {},
                calibrationQualified: [],
                calibrationCount: 0,

                heightFromGround: {},
                heightFromGroundAverage: {
                    No1: {
                        value: [],
                        count: 0
                    },
                    No2: {
                        value: [],
                        count: 0
                    },
                    No3: {
                        value: [],
                        count: 0
                    },
                    No4: {
                        value: [],
                        count: 0
                    }
                },
                heightFromGroundCount: 0,
                viewLayerData: null,
                allowSaveSet: true,

                sendAverage: false
            }
        },
        created () {
            ipcRenderer.on('runtime_para-reply', (event, args) => {
                console.log(args)
                if (args.success) {
                    this.calibrationError = args.data
                    for (let item in args.data) {
                        if (!args.data[item]) {
                            this.$message({
                                message: `${item}数据不正常，"${item}:${args.data[item]}"`,
                                type: 'success'
                            })
                        }
                    }
                } else {
                    this.$message({
                        message: args.message,
                        type: 'success'
                    })
                }
            })
            ipcRenderer.send('runtime_mode', 1)
            ipcRenderer.on('runtime_mode-reply', (event, args) => {
                if (args.success) {
                    console.log(args)
                } else {
                    this.$message({
                        message: args.message,
                        type: 'success'
                    })
                }
            })

            ipcRenderer.on('view_layer2-reply', (event, args) => {
                if (args.success) {
                    console.log(args)
                    this.viewLayerData = args.data
                } else {
                    this.$message({
                        message: args.message,
                        type: 'success'
                    })
                }
            })
            ipcRenderer.on('parking_side-reply', (event, args) => {
                if (args.success) {
                    const data = args.data
                    if (data.parking && data.parking === 'yes') {
                        // 切换到校准离地高度
                        ipcRenderer.send('runtime_mode', 2)
                        // 视角
                        ipcRenderer.send('view_layer2')

                        this.runtimeMode = 2
                    } else {
                        this.parkingSide = data
                        const lengthAbs1 = Number(data.No1.length) + Number(data.No4.length)
                        const lengthAbs2 = Number(data.No2.length) + Number(data.No3.length)
                        const heightAbs1 = Number(data.No1.height) + Number(data.No2.height)
                        const heightAbs2 = Number(data.No3.height) + Number(data.No3.height)
                        switch (true) {
                            case Math.abs(this.standard.length - lengthAbs1) >= this.calibrationError.calibration_abs_error :
                            case Math.abs(this.standard.length - lengthAbs2) >= this.calibrationError.calibration_abs_error :
                                this.$message({
                                    message: `本次测量矩形长误差不在合理范围内，请调准传感器，1号和4号边矩形长：${lengthAbs1}，2号和3号边矩形长：${lengthAbs2}`,
                                    type: 'warning'
                                })
                                break
                            case Math.abs(this.standard.height - heightAbs1) >= this.calibrationError.calibration_rel_error :
                            case Math.abs(this.standard.height - heightAbs2) >= this.calibrationError.calibration_rel_error :
                                this.$message({
                                    message: `本次测量矩形宽误差不在合理范围内，请调准传感器，1号和2号边矩形宽：${heightAbs1}，3号和4号边矩形宽：${heightAbs2}`,
                                    type: 'warning'
                                })
                                break
                            default:
                                this.calibrationQualified.push(data)
                                this.calibrationCount += 1

                                console.log(this.calibrationQualified)
                                if (this.calibrationCount === 5) {
                                    let Length = 0
                                    let Height = 0
                                    this.calibrationQualified.forEach(item => {
                                        console.log(item)
                                        Length += item.No1.length + item.No2.length + item.No3.length + item.No4.length
                                        Height += item.No1.height + item.No2.height + item.No3.height + item.No4.height
                                    })
                                    // 发送平均校准长宽
                                    console.log(Length)
                                    const data = `{length: ${Length / 10}, height: ${Height / 10}`
                                    console.log(data)
                                    ipcRenderer.send('parking_side', data)
                                }
                                this.$message({
                                    message: `本次测量校准在合理范围内`,
                                    type: 'success'
                                })
                        }
                    }
                } else {
                    this.$message({
                        message: args.message,
                        type: 'success'
                    })
                }
            })
            ipcRenderer.on('height_from_the_ground-reply', (event, args) => {
                if (args.success) {
                    const data = args.data
                    if (data.height_from_the_ground && data.height_from_the_ground === 'yes') {
                        this.allowSaveSet = false
                    } else {
                        this.heightFromGround = data

                        if (this.heightFromGround.No1 >= this.calibrationError.hog_min && this.heightFromGround.No1 <= this.calibrationError.hog_max) {
                            if (this.heightFromGroundAverage.No1.count < 5) {
                                this.heightFromGroundAverage.No1.value.push(this.heightFromGround.No1)
                                this.heightFromGroundAverage.No1.count = this.heightFromGroundAverage.No1.value.length
                            }
                        } else {
                            this.$message({
                                message: `测量高度不符合[${this.calibrationError.hog_min}, ${this.calibrationError.hog_max}], 请重新校准，该次测量不参与计算`,
                                type: 'warning'
                            })
                        }
                        if (this.heightFromGround.No2 >= this.calibrationError.hog_min && this.heightFromGround.No2 <= this.calibrationError.hog_max) {
                            if (this.heightFromGroundAverage.No2.count < 5) {
                                this.heightFromGroundAverage.No2.value.push(this.heightFromGround.No2)
                                this.heightFromGroundAverage.No2.count = this.heightFromGroundAverage.No2.value.length
                            }
                        } else {
                            this.$message({
                                message: `测量高度不符合[${this.calibrationError.hog_min}, ${this.calibrationError.hog_max}], 请重新校准，该次测量不参与计算`,
                                type: 'warning'
                            })
                        }
                        if (this.heightFromGround.No3 >= this.calibrationError.hog_min && this.heightFromGround.No3 <= this.calibrationError.hog_max) {
                            if (this.heightFromGroundAverage.No3.count < 5) {
                                this.heightFromGroundAverage.No3.value.push(this.heightFromGround.No3)
                                this.heightFromGroundAverage.No3.count = this.heightFromGroundAverage.No3.value.length
                            }
                        } else {
                            this.$message({
                                message: `测量高度不符合[${this.calibrationError.hog_min}, ${this.calibrationError.hog_max}], 请重新校准，该次测量不参与计算`,
                                type: 'warning'
                            })
                        }
                        if (this.heightFromGround.No4 >= this.calibrationError.hog_min && this.heightFromGround.No4 <= this.calibrationError.hog_max) {
                            if (this.heightFromGroundAverage.No4.count < 5) {
                                this.heightFromGroundAverage.No4.value.push(this.heightFromGround.No4)
                                this.heightFromGroundAverage.No4.count = this.heightFromGroundAverage.No4.value.length
                            }
                        } else {
                            this.$message({
                                message: `测量高度不符合[${this.calibrationError.hog_min}, ${this.calibrationError.hog_max}], 请重新校准，该次测量不参与计算`,
                                type: 'warning'
                            })
                        }

                        if (this.heightFromGroundAverage.No1.count === 5 && this.heightFromGroundAverage.No2.count === 5 && this.heightFromGroundAverage.No3.count === 5 && this.heightFromGroundAverage.No4.count === 5) {
                            const data = `{No1:${this.wheel1Height},No2:${this.wheel2Height},No3:${this.wheel3Height},No4:${this.wheel4Height}}`
                            console.log(data)
                            // this.runtimeMode = 0
                            ipcRenderer.send('height_from_the_ground', data)
                        }
                    }
                } else {
                    this.$message({
                        message: args.message,
                        type: 'success'
                    })
                }
            })
            /*
            * 完成初始化
            * */
            ipcRenderer.on('finish_initialize-reply', (event, args) => {
                if (args.success) {
                    console.log(args)
                    this.$router.push('/usermode/index')
                } else {
                    this.$message({
                        message: args.message,
                        type: 'success'
                    })
                }
            })
        },
        mounted () {
            this.drawLine()
        },
        methods: {
            onLevelCalibration () {
                if (this.standard.length && this.standard.height) {
                    // 5次合格校准
                    ipcRenderer.send('parking_side')
                } else {
                    this.$message({
                        message: `请填写测量矩形实际长宽`,
                        type: 'warning'
                    })
                }
            },
            onCalibrationHeightFromGroundCount () {
                if (this.standard.diameter) {
                    if (this.standard.diameter >= this.calibrationError.wheel_r_min && this.standard.diameter <= this.calibrationError.wheel_r_max) {
                        // 5次合格校准
                        ipcRenderer.send('height_from_the_ground')
                    } else {
                        this.$message({
                            message: `轮胎直径的范围应为[${this.calibrationError.wheel_r_min}, ${this.calibrationError.wheel_r_max}]`,
                            type: 'warning'
                        })
                    }
                } else {
                    this.$message({
                        message: `请填写测量校准轮胎直径`,
                        type: 'warning'
                    })
                }
            },
            viewLayer (type) {
                let array = []
                this.viewLayerData.No1.filter((item, index) => {
                    const x = item * Math.cos((0.25 * index) * Math.PI / 180)
                    const y = item * Math.sin((0.25 * index) * Math.PI / 180)
                    if (x < this.standard.length && y < this.standard.height) {
                        array.push([x, y])
                        return true
                    }
                })
                let array2 = []
                this.viewLayerData.No2.filter((item, index) => {
                    const angle = index + 550 - 190
                    const x = -item * Math.cos((0.25 * angle) * Math.PI / 180)
                    const y = this.standard.height - item * Math.sin((0.25 * angle) * Math.PI / 180)
                    if ((x > 0 && x < this.standard.length) && (y > 0 && y < this.standard.height)) {
                        array2.push([x, y])
                        return true
                    }
                })
                let array3 = []
                this.viewLayerData.No3.filter((item, index) => {
                    const angle = index
                    const x = this.standard.length - item * Math.cos((0.25 * angle) * Math.PI / 180)
                    const y = this.standard.height - item * Math.sin((0.25 * angle) * Math.PI / 180)
                    if ((x > 0 && x < this.standard.length) && (y > 0 && y < this.standard.height)) {
                        array3.push([x, y])
                        return true
                    }
                })
                let array4 = []
                this.viewLayerData.No4.filter((item, index) => {
                    const angle = index + 550 - 190
                    const x = this.standard.length + item * Math.cos((0.25 * angle) * Math.PI / 180)
                    const y = item * Math.sin((0.25 * angle) * Math.PI / 180)
                    if ((x > 0 && x < this.standard.length) && (y > 0 && y < this.standard.height)) {
                        array4.push([x, y])
                        return true
                    }
                })
                let option = []
                if (type === 'all') {
                    option = [
                        {
                            symbolSize: 2,
                            data: array,
                            type: 'scatter'
                        },
                        {
                            symbolSize: 2,
                            data: array2,
                            type: 'scatter'
                        },
                        {
                            symbolSize: 2,
                            data: array3,
                            type: 'scatter'
                        },
                        {
                            symbolSize: 2,
                            data: array4,
                            type: 'scatter'
                        }
                    ]
                } else if (type === 'no1') {
                    option = [
                        {
                            symbolSize: 2,
                            data: array,
                            type: 'scatter'
                        }
                    ]
                } else if (type === 'no2') {
                    option = [
                        {
                            symbolSize: 2,
                            data: array2,
                            type: 'scatter'
                        }
                    ]
                } else if (type === 'no3') {
                    option = [
                        {
                            symbolSize: 2,
                            data: array3,
                            type: 'scatter'
                        }
                    ]
                } else if (type === 'no4') {
                    option = [
                        {
                            symbolSize: 2,
                            data: array4,
                            type: 'scatter'
                        }
                    ]
                }
                this.drawLine(option)
            },
            drawLine (option) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: {text: '测量区扫描点'},
                    xAxis: {
                        name: '矩形长',
                        min: 0,
                        max: this.standard.length
                    },
                    yAxis: {
                        name: '矩形宽',
                        min: 0,
                        max: this.standard.height
                    },
                    series: option
                }, true)
            },
            onSaveSettings () {
                ipcRenderer.send('finish_initialize')
            },
            onRefreshViewLayerData () {
                // 视角
                ipcRenderer.send('view_layer2')
                // this.$message({
                //     message: `请填写测量校准轮胎直径`,
                //     type: 'warning'
                // })
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
        &__main {
            display: flex;
            &--flex {
                flex: 1;
            }
        }
    }
</style>
