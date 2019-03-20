import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'
const state = {
  singer: {}, // 歌手信息
  playing: false, // 播放状态
  fullScreen: false, // 是否全凭
  playlist: [], // 播放列表 随机播放和sequence 列表 不一样
  sequenceList: [], // 播放列表2
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(), // 从本地
  playHistory: loadPlay(), // 播放历史
  favoriteList: loadFavorite()
}

export default state
