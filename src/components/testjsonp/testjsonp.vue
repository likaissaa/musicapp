<template>
    <div>
        <div>
          测试jsonp 的一个使用
          配置jsonp  + es6 的 promise 属性
        </div>
        <div>
          <button type="button" @click="getjsonp1">点击获取jsonp 接口1</button>
          <br/>
          <button type="button" @click="getjsonp2">点击获取jsonp接口2</button>
        </div>
    </div>
</template>

<script>
    import {getJsonp} from 'api/test.js'
    export default {
        name: 'testjsonp',
        methods: {
          getjsonp1() {
            getJsonp().then((res) => {
              console.log(res)
            })
          },
          getjsonp2() {
            const url = '/a/asset/list'
             this.$axios.get(url).then((res) => {
                console.log(res)
              })
          }
        }
    }
</script>

<style scoped>

</style>
