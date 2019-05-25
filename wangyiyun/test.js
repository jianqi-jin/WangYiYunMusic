const cheerio = require('cheerio')
const request = require('request')



//此处为网易云api
function getPlayList(){
  request.get({
    url:'https://music.163.com/discover/playlist',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
      'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
    }
  }, (error, response) => {
    var strObj = response.body
    //console.log(strObj)
    const $ = cheerio.load(strObj)
    const playList = []
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
        owner:{
          name:user.children('a').attr('title'),
          href:user.children('a').attr('href'),
        },
      })
    })
    console.log(playList)
    return playList
  })
}


