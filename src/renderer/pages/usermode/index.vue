<template lang="pug">
    .usermode
        router-link.usermode(to="/") 首页
        .title 用户模式界面
        .status
            span(v-html="frontStatusMessage")
        .status
            span(v-html="sideStatusMessage")
        .status
            span(v-html="stopStatusMessage")
        .usermode__main
            .car.garage(:style="{width: garage.length + 'px', height: garage.height + 'px'}")
                .stopline(:style="{width: targetArea.length + 'px', height: targetArea.height + 'px', top: leftEndline + 'px', left: beforeEndline + 'px'}")
                <!--.car__main(:style="{'transform': 'rotate(' + carDegree + 'deg)', bottom: carPosition.y + 'px', left: carPosition.x + 'px' }")-->
                .car__main(:style="{'transform': 'translate('+ carPosition.x +'px, '+ (400 - carWidth - carPosition.y) +'px) rotate(' + carDegree + 'deg)'}")
                    .car__LeftFrontWheel.car--wheel(:style="{'transform': 'rotate(' + LeftFrontWheelDegree + 'deg)'}")
                    .car__RightFrontWheel.car--wheel(:style="{'transform': 'rotate(' + RightFrontWheelDegree + 'deg)'}")
                    .car__LeftRearWheel.car--wheel
                    .car__RightRearWheel.car--wheel
</template>

<script>
    import { ipcRenderer } from 'electron'
    export default {
        name: 'usermode',
        data () {
            return {
                carDegree: 0, // 车体旋转角度
                LeftFrontWheelDegree: 0, // 左前轮旋转角度
                RightFrontWheelDegree: 0, // 右前轮旋转角度
                carWidth: 0, // 车体宽度
                carHeight: 0, // 车体长度
                carCenter: { // 车体位置，以左下角为圆心
                    x: 0,
                    y: 0
                },
                carPosition: {}, // 车体坐标换算为left ，botton 距离
                garageCenter: {}, // 车库中心点

                // 标准线
                garage: {
                    length: 0,
                    height: 0
                },
                targetArea: {
                    length: 0,
                    height: 0
                },
                beforeEndline: 70,
                leftEndline: 70,
                rightEndline: 330,

                wheelAngle: 0,
                // 提醒
                frontStatusMessage: '',
                sideStatusMessage: '',
                stopStatusMessage: '',

                temporaryData: {
                    x: [],
                    y: []
                }
            }
        },
        created () {
            // 切换模式
            ipcRenderer.send('runtime_mode', 3)
            ipcRenderer.on('runtime_para-reply', (event, args) => {
                console.log(args)
                if (args.success) {
                    const data = args.data
                    this.garageCenter = {
                        x: data.parking_x / 10 / 2,
                        y: data.parking_y / 10 / 2
                    }

                    this.garage = {
                        length: data.parking_x / 10,
                        height: data.parking_y / 10
                    }
                    this.targetArea = {
                        length: data.target_x / 10,
                        height: data.target_y / 10
                    }
                    this.wheelAngle = data.wheel_angle
                    this.beforeEndline = (data.parking_x - data.target_x) / 10 / 2
                    this.leftEndline = (data.parking_y - data.target_y) / 10 / 2
                    this.rightEndline = (data.parking_y - (data.parking_y - data.target_y) / 2) / 10
                } else {
                    this.$message({
                        message: args.message,
                        type: 'success'
                    })
                }
            })
            /*
            *  重新请求当前车库标准
            * */
            if (!this.garageCenter.x && !this.garageCenter.y) {
                ipcRenderer.send('runtime_para')
            }

            ipcRenderer.on('vehicle_attitude-reply', (event, args) => {
                // {
                //     car_length: 4600,
                //     car_width: 1800,
                //     car_angle: 1500,
                //     car_center: {
                //         x: 4000,
                //         y: 3000
                //     },
                //     left_front_wheel_angle: 1350,
                //     right_front_wheel_angle: 1350,
                //     wheel2front: 650,
                //     wheel2behind: 750,
                //     wheelbase: 2600
                // }
                if (args.success) {
                    const data = args.data
                    this.carDegree = -data.car_angle / 1000
                    this.carWidth = data.car_width / 10
                    this.carHeight = data.car_length / 10
                    this.carCenter = {
                        x: data.car_center.x / 10,
                        y: data.car_center.y / 10
                    }

                    this.carPosition = {
                        x: data.car_center.x / 10 - data.car_length / 10 / 2,
                        y: data.car_center.y / 10 - data.car_width / 10 / 2
                    }
                    console.log(this.carPosition)
                    this.LeftFrontWheelDegree = -data.left_front_wheel_angle / 1000 - -data.car_angle / 1000
                    this.RightFrontWheelDegree = -data.right_front_wheel_angle / 1000 - -data.car_angle / 1000

                    this.temporaryData.x.push(data.car_center.x)
                    this.temporaryData.y.push(data.car_center.y)
                } else {
                    this.$message({
                        message: args.message,
                        type: 'success'
                    })
                }
            })
            this.onVehicleAttitude()
            // setInterval(() => {
            //     this.onVehicleAttitude()
            // }, 100)
            setInterval(() => {
                if (this.onStddev(this.temporaryData.x) < 2 && this.onStddev(this.temporaryData.y) < 2) {
                    console.log(this.wheelAngle)
                    if (this.carPosition.x - this.beforeEndline < 0 || (this.carPosition.y < this.leftEndline || (parseInt(this.carPosition.y) + parseInt(this.carWidth)) > this.rightEndline)) {
                        this.stopStatusMessage = '请将车停在停车区域内'
                    } else if (Math.abs(this.LeftFrontWheelDegree) > this.wheelAngle) {
                        if (this.LeftFrontWheelDegree < 0) {
                            this.stopStatusMessage = '请将左前轮向右打正'
                        } else if (this.LeftFrontWheelDegree > 0) {
                            this.stopStatusMessage = '请将左前轮向左打正'
                        }
                    } else if (Math.abs(this.RightFrontWheelDegree) > this.wheelAngle) {
                        if (this.RightFrontWheelDegree < 0) {
                            this.stopStatusMessage = '请将右前轮向右打正'
                        } else if (this.RightFrontWheelDegree > 0) {
                            this.stopStatusMessage = '请将左右轮向左打正'
                        }
                    } else {
                        this.stopStatusMessage = '请下车'
                    }
                } else {
                    console.log('运动状态')
                }
                this.temporaryData = {
                    x: [],
                    y: []
                }
            }, 3000)
        },
        watch: {
            'carCenter.x': {
                handler (newName, oldName) {
                    this.carPosition = {
                        ...this.carPosition,
                        x: this.carCenter.x - this.carHeight / 2
                    }
                    console.log(this.carPosition.x - this.beforeEndline)
                    if (this.carPosition.x - this.beforeEndline > 150) {
                        this.frontStatusMessage = `<span style="color: orange">请继续驶入</span>`
                    } else if (this.carPosition.x - this.beforeEndline < 150) {
                        const level = this.carPosition.x - this.beforeEndline
                        switch (true) {
                            case level >= 50:
                                this.frontStatusMessage = `距离前端线<span style="color: orange">${(level / 100).toFixed(2)}</span>米`
                                break
                            case level >= 0:
                                this.frontStatusMessage = `距离前端线<span style="color: green">${(level / 100).toFixed(2)}</span>米`
                                break
                            case level < 0:
                                this.frontStatusMessage = `您已经超出前端线<span style="color: red">${Math.abs(parseFloat(level / 100)).toFixed(2)}</span>米`
                                break
                        }
                    } else {
                        this.frontStatusMessage = ''
                    }
                },
                immediate: true
            },
            'carCenter.y': {
                handler (newName, oldName) {
                    this.carPosition = {
                        ...this.carPosition,
                        y: newName - this.carWidth / 2
                    }
                    const distance = parseInt(this.carPosition.y) + parseInt(this.carWidth)
                    console.log(`距左距离:${distance}`)
                    console.log(distance - this.rightEndline)
                    if (this.carPosition.y < this.leftEndline) {
                        const beyondDistance = 70 - this.carPosition.y - this.leftEndline
                        this.sideStatusMessage = `您已经超出左端线<span style="color: red">${Math.abs(parseFloat(beyondDistance / 100)).toFixed(2)}</span>米`
                    } else if (distance > this.rightEndline) {
                        const beyondDistance = distance - this.rightEndline
                        this.sideStatusMessage = `您已经超出右端线<span style="color: red">${Math.abs(parseFloat(beyondDistance / 100)).toFixed(2)}</span>米`
                    } else {
                        this.sideStatusMessage = ''
                    }
                },
                immediate: true
            }
        },
        methods: {
            onVehicleAttitude () {
                ipcRenderer.send('vehicle_attitude')
            },
            // 数据标准差
            onStddev (data) {
                const sum = function (x, y) { return x + y } // 求和函数
                const square = function (x) { return x * x } // 数组中每个元素求它的平方

                const mean = data.reduce(sum) / data.length
                const deviations = data.map(function (x) { return x - mean })

                return Math.sqrt(deviations.map(square).reduce(sum) / (data.length - 1))
            }
        }
    }
</script>

<style scoped lang="scss">
    .usermode {
        flex: 1;
        a {
            display: block;
            color: rgba(255, 255, 255, 0.6);
        }
        .title {
            text-align: center;
            color: rgba(#fff, 0.6);
        }
        .status {
            height: 40px;
            margin: 20px 0;
            font-size: 30px;
            text-align: center;
            color: rgba(#fff, 0.6);
        }
        &__main {
            display: flex;
            justify-content: center;
            .car {
                /*width: 700px;*/
                /*height: 400px;*/
                background-color: grey;
                position: relative;
                .stopline {
                    border: 1px dashed red;
                    /*width: 560px;*/
                    /*height: 260px;*/
                    position: absolute;
                    /*top: 70px;*/
                    /*left: 70px;*/
                }
                &__main {
                    position: absolute;
                    height: 174.7px;
                    width: 448.6px;
                    background-color: #ffffff;
                    transform-origin: center;
                    transition: transform 0.3s linear;
                    .car--wheel {
                        position: absolute;
                        height: 20px;
                        width: 64.8px;
                        background-color: red;
                        transition: transform 0.3s linear;
                        /*transform-origin: left bottom;*/
                        &.car__LeftFrontWheel {
                            left: 57.3px;
                            bottom: 0;
                        }
                        &.car__RightFrontWheel {
                            left: 57.3px;
                            top: 0;
                        }
                        &.car__LeftRearWheel {
                            right: 66.5px;
                            bottom: 0;
                        }
                        &.car__RightRearWheel {
                            right: 66.5px;
                            top: 0;
                        }
                    }
                }
            }
        }
    }
</style>
