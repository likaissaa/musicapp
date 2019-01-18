<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" @select="selectSinger" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
    import {getSingerList} from 'api/singer'
    import {ERR_OK} from 'api/config';
    import Singer from 'common/js/singer'
    import ListView from 'base/listview/listview'
    import {mapMutations} from 'vuex' // 语法糖
    import {playlistMixin} from 'common/js/mixin'
    const HOT_NAME = '热门'
    const HOT_SINGER_LEN = 10
    export default {
      mixins: [playlistMixin],
      data() {
        return {
          singers: []
        }
      },
      created() {
        //  获取数据,
        this._getSingerList()
      },
      methods: {
        handlePlaylist(playlist) {
          // 操作scroll 的 bottom 值
          const bottom = playlist.length > 0 ? '60px' : ''
          this.$refs.singer.style.bottom = bottom
          this.$refs.list.refresh()
        },
        // 扩展运算符
        ...mapMutations({
          setSinger: 'SET_SINGER'
        }),
        selectSinger(singer) {
          this.$router.push({
            path: `/singer/${singer.id}`
          })
          this.setSinger(singer) // this.$store.commit('SET_SINGER');
        },
        _getSingerList () {
          getSingerList().then((res) => {
            if (res.code === ERR_OK) {
              setTimeout(() => {
                this.singers = this._normalizeSinger(res.data.list) // map 的key值根据 hash 值排序  数字 大写小写 然后 别的
                }, 2000)
            }
          })
        },
        _normalizeSinger(list) {
          // 任何数据 findex 聚合数据
          let map = {
            hot: {
              title: HOT_NAME,
              items: []
            }
          }
            list.forEach((item, index) => {
              if (index < HOT_SINGER_LEN) {
                map.hot.items.push(new Singer({
                  id: item.Fsinger_mid,
                  name: item.Fsinger_name
                }))
              }
              const key = item.Findex
              if (!map[key]) {
                map[key] = {
                  title: key,
                  items: []
                }
              }

              map[key].items.push(new Singer({
                id: item.Fsinger_mid,
                name: item.Fsinger_name
              }))
            })
          // 为了 有序的列表 处理map
          let hot = []
          let ret = []
          for (let key in map) {
            let val = map[key]
            if (val.title.match(/[a-zA-Z]/)) { // 判断当前是否是一个数组
              ret.push(val)
            } else if (val.title === HOT_NAME) {
              hot.push(val)
            }
          }
          ret.sort((a, b) => {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
          })
          return hot.concat(ret)
        }
      },
      components: {
        'listView': ListView
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
