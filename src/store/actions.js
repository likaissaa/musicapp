import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch, savePlay} from 'common/js/cache'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) { // action 就是提交mutation
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) { // 没有索引 因为没有选择列表中国中的任何一项
  commit(types.SET_PLAY_MODE, playMode.random) // 设置播放模式ß
  commit(types.SET_SEQUENCE_LIST, list) // 设置当前的播放列表
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENTINDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({commit, state}, song) { // suggest页面开始ine
  let playlist = state.playlist.slice() // 复制新的数据到 playlist 中
  let sequenceList = state.sequenceList.slice() // 复制顺序列表到se
  let currentIndex = state.currentIndex // currentindex是playlist 的索引
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  //
  let fpIndex = findIndex(playlist, song) // 插入的歌曲 是否在playlist 里面 并返回他的索引
  // 插入到当前索引的下一个
  currentIndex++
  playlist.splice(currentIndex, 0, song)// 不能直接修改 state 需要在mutations 里面执行
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) // 如果当前插入的序号 > 之前列表的序号
    {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequenceList, currentSong) + 1 // 在顺序列表中找到当前的歌曲索引 然后 +1
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENTINDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true) // 打开全屏
  commit(types.SET_PLAYING_STATE, true) // 开启播放状态
}

export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice() // 随机列表
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1) // 根据索引删除
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  // 删除之后进行一个判断
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENTINDEX, currentIndex)
  const playingState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}
export const deleteSongList = function ({commit}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENTINDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}
// 清除所有歌曲列表
export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  // 删除然后保留到本地缓存
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
// 保存最近歌曲列表
export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}
