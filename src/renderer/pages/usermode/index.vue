<template lang="pug">
    .usermode
        router-link.usermode(to="/") 首页
        .title 用户模式界面
        .status
            span(v-html="frontStatusMessage")

            span(v-html="sideStatusMessage")
        .usermode__main
            .car.garage
                .stopline
                <!--.car__main(:style="{'transform': 'rotate(' + carDegree + 'deg)', bottom: carPosition.y + 'px', left: carPosition.x + 'px' }")-->
                .car__main(:style="{'transform': 'translate('+ carPosition.x +'px, '+ (400 - carWidth - carPosition.y) +'px) rotate(' + carDegree + 'deg)'}")
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
        // carDegree: -12.949,
        // LeftFrontWheelDegree: -11.099,
        // RightFrontWheelDegree: -12.549,
        carDegree: 0,
        LeftFrontWheelDegree: 0,
        RightFrontWheelDegree: 0,
        carWidth: '174.7',
        carHeight: '448.6',
        carCenter: {
          // x: '368.7',
          // y: '207.9'
          x: '1100',
          y: '207.9'
        },
        carPosition: {},
        garageCenter: {
          x: 350,
          y: 200
        },
        beforeEndline: 70,
        leftEndline: 70,
        rightEndline: 330,
        frontStatusMessage: '',
        sideStatusMessage: ''
      }
    },
    created () {
      this.carPosition = {
        x: this.carCenter.x - this.carHeight / 2,
        y: this.carCenter.y - this.carWidth / 2
      }
      this.LeftFrontWheelDegree += 0 - this.carDegree
      this.RightFrontWheelDegree += 0 - this.carDegree

      setTimeout(() => {
        this.carCenter = {
          x: 500.0,
          y: 300.0
        }
      }, 2000)
      setTimeout(() => {
        this.carCenter = {
          x: 300.0,
          y: 100.0
        }
      }, 4000)
      setTimeout(() => {
        this.carCenter = {
          x: 400.0,
          y: 201.0
        }
      }, 8000)
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
                /*width: 400px;*/
                /*height: 700px;*/
                width: 700px;
                height: 400px;
                background-color: grey;
                position: relative;
                .stopline {
                    border: 1px dashed red;
                    width: 560px;
                    height: 260px;
                    position: absolute;
                    top: 70px;
                    left: 70px;
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
