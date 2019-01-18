<template>
    <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <slot>

        </slot>
      </div>
      <div class="dots">
        <span class="dot" v-for="(item ,index) in dots" :class="{active: currentPageIndex === index }"></span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {addClass} from 'common/js/dom.js'
    import BScroll from 'better-scroll'
    export default {
        // 循环轮播
        name: 'slider',
        data() {
          return {
            dots: [],
            currentPageIndex: 0
          }
        },
        props: {
          loop: { // 可不可以无缝循环轮播
            type: Boolean,
            default: true
          },
          autoPlay: { // 自动轮播
            type: Boolean,
            default: true
          },
          interval: { // 间隔时间-snapspeed 轮播的动画时间
            type: Number,
            default: 4000
          }
        },
        mounted() {
          // 时机，选择mounted
          // 加个延时保证dom刷新 20ms huozhe nextTick方法,
            setTimeout(() => {
              this._setSliderWidth()
              this._initDots()
              this._initSlider()
              // 如果自动播放 那么自动播放
              if (this.autoPlay) {
                this._play()
              }
            }, 20)
          // 监听一个窗口改变事件
          window.addEventListener('resize', () => {
            if (!this.slider) {
              return
            }
            this.refresh()
          })
        },
        methods: {
          refresh() {
            if (this.slider) {
              this._setSliderWidth(true)
              this.slider.refresh()
            }
          },
          _setSliderWidth(isResize){
            this.children = this.$refs.sliderGroup.children
            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth
            for (let i = 0; i < this.children.length; i++) {
              let child = this.children[i]
              addClass(child, 'slider-item')

              child.style.width = sliderWidth + 'px'
              width += sliderWidth
            }
            if (this.loop && !isResize) {
              width += 2 * sliderWidth
            }
            this.$refs.sliderGroup.style.width = width + 'px'
          },
          _initSlider(){
            this.slider = new BScroll(this.$refs.slider, {
              scrollX: true,
              scrollY: false,
              momentum: false,
              snap: {
                loop: this.loop,
                threshold: 0.3,
                speed: 400
              }
              // click:true 组织浏览器自己的click ， click 派发后 fastclick 组织了店家事件
            })
            // 添加 slider 事件
            this.slider.on('scrollEnd', this._onScrollEnd)
          },
          _onScrollEnd() {
              // pageindex
              let pageIndex = this.slider.getCurrentPage().pageX
              this.currentPageIndex = pageIndex
              if (this.autoPlay) {
                this._play()
              }
          },
          _initDots() {
            this.dots = new Array(this.children.length)
          },
          _play() {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.slider.next()
              }, this.interval)
          },

        },
        destroyed() {
          // 不用当前组件 就会调用destroy
          console.log('当前崩了')
          clearTimeout(this.timer)
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .slider
      min-height: 1px
      position:relative
      .slider-group
        position:relative
        overflow:hidden
        white-space: nowrap
        .slider-item
          float:left
          box-sizing: border-box
          overflow: hidden
          text-align: center
          a
            display:block
            width: 100%
            overflow: hidden
            text-decoration: none
          img
            display: block
            width: 100%

      .dots
        position: absolute
        right: 0
        left: 0
        bottom: 12px
        transform:translateZ(1px)
        text-align: center
        font-size: 0
        .dot
          display:inline-block
          margin: 0 4px
          width: 8px
          height: 8px
          border-radius: 50%
          background: $color-text-l
          &.active
            width: 20px
            border-radius: 5px
            background: $color-text-ll

</style>
