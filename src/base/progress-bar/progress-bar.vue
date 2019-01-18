<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
      <div class="bar-inner">
        <div class="progress" ref="progress"></div>
        <div class="progress-btn-wrapper" ref="progressBtn" @touchstart="progressTouchStart" @touchmove="progressTouchMove" @touchend="progressTouchEnd" >
          <div class="progress-btn"></div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'common/js/dom'
  const progressBtnWidth = 16 // 按钮的宽度 圆圈
  const transform = prefixStyle('transform') // 定义属性兼容
    export default {
        name: 'progress-bar',
        props: {
          percent: {
            type: Number,
            default: 0
          }
        },
        watch: {
          percent(newPercent) {
            if (newPercent >= 0 && !this.touch.initiated) { // 可以拖动 并且没有 触屏
              const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth // 剩余总长度
              const offsetWidth = newPercent * barWidth // 偏移宽度
              this._offset(offsetWidth)
            }
          }
        },
        created() {
          this.touch = {} // 不同的回调函数共享的数据
        },
        methods: {
          progressTouchStart(e) {
            this.touch.initiated = true
            this.touch.startX = e.touches[0].pageX // 第一个手指
            this.touch.left = this.$refs.progress.clientWidth //记录当前的值
          },
          progressTouchMove(e) {
            if (!this.touch.initiated) {
              return
            }
            const deltaX = e.touches[0].pageX - this.touch.startX
            const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
            this._offset(offsetWidth)
          },
          progressTouchEnd(e) {
            this.touch.initiated = false
            this._triggerPercent()
          },
          progressClick(e) {
            // 当点击圆形按钮的时候 此时获取的e.offsetX 是不正确的
            // this._offset(e.offsetX)

            const rect = this.$refs.progressBar.getBoundingClientRect() // 整个进度条开始到距离屏幕最左边的距离
            const offsetWidth = e.pageX - rect.left // 当前点击屏幕的 x 距离 减 圆形到左边的距离
            this._offset(offsetWidth)
            this._triggerPercent()
          },
          _triggerPercent() {
            const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth // 剩余总长度
            const percent = this.$refs.progress.clientWidth / barWidth
            this.$emit('percentChange', percent)
          },
          _offset(offsetWidth) {
            this.$refs.progress.style.width = `${offsetWidth}px` // 设置进度的长度
            this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
          }
        }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: absolute
          left: 7px
          top: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
