<template lang="pug">
    .usermode
        .title 用户模式界面
        .usermode__main
            .car.garage
                .car__main(:style="{'transform': 'rotate(' + carDegree + 'deg)', bottom: circleCenter.y + 'px', left: circleCenter.x + 'px' }")
                    .car__LeftFrontWheel.car--wheel(:style="{'transform': 'rotate(' + LeftFrontWheelDegree + 'deg)'}")
                    .car__RightFrontWheel.car--wheel(:style="{'transform': 'rotate(' + RightFrontWheelDegree + 'deg)'}")
                    .car__LeftRearWheel.car--wheel
                    .car__RightRearWheel.car--wheel
</template>

<script>
  export default {
    name: 'usermode',
    data () {
      return {
        // carDegree: '0',
        carDegree: -12.949,
        LeftFrontWheelDegree: -11.099,
        RightFrontWheelDegree: -12.549,
        carWidth: '174.7',
        carHeight: '448.6',
        carCenter: {
          x: '368.7',
          y: '207.9'
        },
        circleCenter: {}
      }
    },
    created () {
      this.circleCenter = {
        x: this.carCenter.x - this.carHeight / 2,
        y: this.carCenter.y - this.carWidth / 2
      }
      this.LeftFrontWheelDegree += 0 - this.carDegree
      this.RightFrontWheelDegree += 0 - this.carDegree
    }
  }
</script>

<style scoped lang="scss">
    .usermode {
        &__main {
            height: 100vh;
            display: flex;
            justify-content: center;
            .car {
                /*width: 400px;*/
                /*height: 700px;*/
                width: 700px;
                height: 400px;
                background-color: rgba(0, 0, 0, 0.3);
                position: relative;
                &__main {
                    position: absolute;
                    height: 174.7px;
                    width: 448.6px;
                    background-color: #ffffff;
                    /*transform-origin: left bottom;*/
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
