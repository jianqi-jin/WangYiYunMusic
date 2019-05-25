const cheerio = require('cheerio')
const request = require('request')
const enc = require('./enc')

const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
}

//此处为网易云api
function getPlayList(req, res){
  var playList = []
  var s=1
  request.get({
    url:'https://music.163.com/discover/playlist',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
      'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
    }
  }, (error, response) => {
    if(!response.body || response.body == ''){
      res.json({})
      return
    }
    var strObj = response.body
    var hrefs = []
      //console.log(strObj)
    const $ = cheerio.load(strObj)
    $('li').map(function(i, el){
      const info = $(this).children('div')
      const user = $(this).children('p[class!="dec"]')
      if(!info.children('a').attr('title'))
      {
        return false
      }
      playList.push({
        title:info.children('a').attr('title'),
        hot:info.children('.bottom').children('.nb').text(),
        img:info.children('img').attr('src'),
        id:info.children('a').attr('href').split('=')[1],
        owner:{
          name:user.children('a').attr('title'),
          href:user.children('a').attr('href'),
        },
      })
    })
    try{
      res.json({
        error:0,
        data:playList
      })
    }catch (e) {
      res.json({
        error:1,
        data:'error'
      })
    }

    //console.log(playList)
  })
}


function getListInfo(req, res){
  request.get({
    url:'http://music.163.com/api/playlist/detail?id='+req.query.id+'&updateTime=-1',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    }
  }, (error, response) => {
    if(!response.body || response.body == ''){
      res.json({})
      return
    }
    var strObj = response.body
    //console.log(strObj)
    res.json(JSON.parse(strObj))
    /*
    //strObj = 'https://ziyuan.baidu.com/contexts/cambrian.jsonld'
    var $ = cheerio.load(strObj)
    var pattern = /<script type=\"application\/ld\+json">[\s\S]*?}/gm,
      str = strObj;
    str = (str.match(pattern)[0]);
    str = str.replace(/<script type=\"application\/ld\+json">/, "")
    //console.log(str)
    var json = JSON.parse(str)
    var listInfo = {}
    listInfo = json
    listInfo.songs = []
    //获取每一个歌曲信息，并且push到数据里进行返回
    $('li').map((i, el) => {
      $(this).
    })
    */
  })
}
/*
*
* <script type="application/ld+json"></script>
{
"@context": "https://ziyuan.baidu.com/contexts/cambrian.jsonld",
"@id": "http://music.163.com/playlist?id=2581461713",
"appid": "1582028769404989",
"title": "猪你好运来，哼哼哈嘿",
"images": ["http://p2.music.126.net/Zj0jDBMN2N_XtX0Ro5Tnfg==/109951163836672886.jpg"],
"description": "“猪”新的一年里，携一缕阳光，掬一捧清风，以崭新的姿态走进新的一年。让生活如歌，让日子鲜活，平安健康，好运连连！",
"pubDate": "2018-12-31T17:11:47"
}
</script>
* */

//getListInfo()


function getSongInfo(req, res){
  const url='https://music.163.com/song?id=' + req.query.id
  request.get({
    url,
    headers
  }, (error, response) => {
    if(!response.body || response.body == ''){
      res.json({})
      return
    }
    var strObj = response.body
    var $ = cheerio.load(strObj)
    var reg = /script type\=\"application\/ld\+json\"\>[\s\S]*?\/script/gm
    try{
      var str = strObj.match(reg)[0]
      reg = /{[\s\S]*?}/gm
      var str = str.match(reg)[0]
      var json = JSON.parse(str)
      res.json(json)
    }catch (e) {
      console.log(e)
    }

  })
}


const lyricData = require('../static/data.json')

function getSongLyric( req, res){
  const h = enc.enc('{"id":"'+req.query.id+'","lv":-1,"tv":-1,"csrf_token":""}')
  var _data = 'params='+encodeURIComponent(h.encText) +'&encSecKey='+h.encSecKey
  //_data='params=OSylSQW3lvQkLMyu%2F4w2g6NHw%2Bzy%2F%2Fyc370jABBRJfnVV2310IaF7vNrWS6p8ucvZkgfJrVuEBHCVGRzZ%2FXiY%2FIidyrm9eTUlpHvLjHqIa%2BO0oK%2BnCYrNSWVglg93Tem&encSecKey=2664fe44fbcad75042444e1a3a2e70cf6c344ae794923c29a93670615c22b38bc690d74ae96f2396c91c8d0493b9df1053320289da6c847cc09b6e8a8e4d8c263ebaad17b7fb222679f66e69edb773f0acade4066f53e41c5ecb14c67f8580aedc1f3333fa57b4685b58e3eb293b977a02d5590c2881369d8f5458938be45b39'
  const url='https://music.163.com/weapi/song/lyric?csrf_token='
  request.post({
    url,
    form:_data,
    headers
  }, (error, response) => {
    try{
      if(response.body)
      //console.log(response.body)
        try {
          res.json(JSON.parse(response.body))
        }catch(e){
          console.log(e)
        }
    }catch (e) {
      console.log(e)
    }

  })
}

function getSongHref(req, res){
  const h = enc.enc('{"ids":"['+req.query.id+']","br":128000,"csrf_token":""}')
  var _data = 'params='+encodeURIComponent(h.encText) +'&encSecKey='+h.encSecKey
  //_data='params=OSylSQW3lvQkLMyu%2F4w2g6NHw%2Bzy%2F%2Fyc370jABBRJfnVV2310IaF7vNrWS6p8ucvZkgfJrVuEBHCVGRzZ%2FXiY%2FIidyrm9eTUlpHvLjHqIa%2BO0oK%2BnCYrNSWVglg93Tem&encSecKey=2664fe44fbcad75042444e1a3a2e70cf6c344ae794923c29a93670615c22b38bc690d74ae96f2396c91c8d0493b9df1053320289da6c847cc09b6e8a8e4d8c263ebaad17b7fb222679f66e69edb773f0acade4066f53e41c5ecb14c67f8580aedc1f3333fa57b4685b58e3eb293b977a02d5590c2881369d8f5458938be45b39'
  const url='https://music.163.com/weapi/song/enhance/player/url?csrf_token='
  request.post({
    url,
    form:_data,
    headers
  }, (error, response) => {
    if(response.body)
      try {
      //console.log(response.body);
        res.json(JSON.parse(response.body))
      }catch(e){
        console.log(e)
      }
  })
}
//getSongHref('524148556')

//console.log(getSongLyric('524148556'))
exports.getPlayList = getPlayList
exports.getListInfo = getListInfo
exports.getSongInfo = getSongInfo
exports.getSongLyric = getSongLyric
exports.getSongHref = getSongHref
