// import jsonp from 'common/js/jsonp.js'
// import {commonParams, options} from './config.js'
// import axios from 'axios'
// export function getRecommend() {
//   const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
//   const data = Object.assign({}, commonParams, {
//     platform: 'h5',
//     uin: 0,
//     needNewCode: 1
//   })
//   return jsonp(url, data, options)
// }

import {commonParams, options } from './config.js'
import jsonp from 'common/js/test.js'
import axios from 'axios'
export function getJsonp() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    needNewCode: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    song_begin: 0,
    song_num: 30,
    loginUin: 0,
    hostUin: 0,
    topid: 4
  })
  return jsonp(url, data, options)
}

