<template>
  <div id="songInfo">
    <div id="songInfoBox">
      <div id="coverBox">
        <div id="imgBox">
          <img :class="currentSong.playFlag ? 'aniImg' : ''" :src="songInfo.images[0]" alt="">
        </div>
      </div>
      <div id="infoBox">
        <h2 id="songTitle">{{songInfo.title}}</h2>
        <p>{{songInfo.description}}</p>
        <div ref="lyric" id="lyric" class="test-1" v-html="lyric.data ? lyric.data : ''"></div>
      </div>
    </div>
    <div id="reviewBox">
    </div>
    <div id="songInfoBack">
      <div id="backCover"></div>
      <img :src="songInfo.images[0]" alt="">

    </div>
  </div>
</template>

<script>
  import {getSongInfo, getSongLyric, getSongHref} from "../../api/httpReq";
  import {timeToMM} from '../../func/index'
  import {mapGetters, mapActions} from 'vuex'
  export default {
        name: "songInfo",
      data(){
          return {
            time:0,
            songInfo:{},
            lyric:{
              data:'',
              times:[]
            }
          }
      },
      methods:{
          _initSongInfo(id){
            this.songInfo.id = id;
            getSongInfo(this.songInfo.id).then((res) => {
              this.songInfo = {};
              this.songInfo = res.data
              this.songInfo.id = id
              //console.log(this.songInfo)
            })
            getSongLyric(this.songInfo.id).then((res) => {
              this.lyric = {};
              // console.log(res.data)
              var str = res.data.lrc.lyric.toString()
              var temps = str.split('\n')
              //console.log(temps)
              //str = '<p>'+str.replace(/\n/g, '</p><p>')+'</p>'
              this.lyric.data = '';
              this.lyric.times = temps.map((item) => {
                var items = item.split(']')
                if(items[1] == 'undefined' || item[1] == undefined)
                  items[1] = ''
                this.lyric.data += '<p>' + items[1]+ '<br>' + '</p>'
                var time = items[0].split('[')[1]
                //console.log(time)
                if(time && time.split(':')[0] != 'by'){
                  return (time.split(':')[0] * 60000 + time.split(':')[1] * 1000)
                }else{
                  return 0
                }
                //if(time)
                //
              })
              //console.log(this.lyric.times)

            })
            this.songInfo.hrefInfo = {
              url:'http://music.163.com/song/media/outer/url?id='+this.songInfo.id+'.mp3'
            }
            this.asnycSetSongHref(this.songInfo.hrefInfo);
            //console.log(this.currentSong.playFlag)

          },
        ...mapActions([
          'asnycSetSongHref'
        ]),
        scrollTo(line, speed){
          if(!speed)speed = 400
          this.$nextTick(() => {
            var totleHeight = this.$refs.lyric.scrollHeight
            var scrollDis = (line-5)*(totleHeight / this.lyric.times.length) - this.$refs.lyric.scrollTop
            //alert(totleHeight)
            if(line < 5){
              var scrollDis = (0)*(totleHeight / this.lyric.times.length) - this.$refs.lyric.scrollTop
            }
            var timer = setInterval(()=>{
              this.$refs.lyric.scrollTop += scrollDis / (speed / 10)
            },10)
            setTimeout(()=>{
              clearInterval(timer)
            },speed)
            this.lyric.times.forEach((item, i)=>{
              document.getElementById('lyric').getElementsByTagName('p')[i].style.color = '#2c3e50'
            })
            document.getElementById('lyric').getElementsByTagName('p')[line].style.color = '#fff'

            //alert(document.getElementById('lyric').getElementsByTagName('p')[line].className)
          })
        }
      },
    watch:{
          currentSong:{
            handler(val){
              //console.log(this.songInfo)
              if(this.songInfo.id != val.id){
                //alert("asd");
                this._initSongInfo(val.id);
              }
              const currentTime = (val.currentTime)
              var i = 0   //现在行
              var flag = 0
              this.lyric.times.forEach((item)=>{
                //console.log(currentTime - item )
                if(currentTime - item > -100 && currentTime - item < 1000){
                  flag = 1
                  //return false
                }else{
                  if(flag == 0){
                    i++
                    //console.log('i++'+i)
                  }

                }

              })
              if(flag == 1){
                flag  =0
                this.scrollTo(i)
              }
            },
            deep:true
          },
      time(val){

      }
    },
      computed: {
        ...mapGetters([
          'songInfoId',
          'currentSong'
        ])
      },
      mounted(){
          if(!this.$route.params.id){
            this.$router.push({
              name:'playlist'
            })
            return false
          }
          this._initSongInfo(this.$route.params.id);
      }
    }
</script>

<style scoped lang="stylus">
  @import '../../commondef/config.styl'
  @keyframes coverImg{
    0% {
      transform rotateZ(0deg)
    }
    100%{
      transform rotateZ(360deg)
    }
  }
  #lyric
    text-align left
    height 330px
    overflow-y auto
    width 100%
  #songInfoBack
    position absolute
    width 100%
    height 500px
    top 30px
    z-index: -2

    overflow hidden
    #backCover
      position absolute
      width 100%
      height 500px
      z-index 10
      background: radial-gradient(rgba(0,0,0,0), rgba(256,256,256,1));
    img
      width 100%
      filter blur(20px)
  #songInfoBox
    background none
    margin auto
    overflow hidden
    width 700px
    height 400px
    div
      float left
    #coverBox
      overflow hidden
      width 290px
      #imgBox
        margin 30px
        overflow hidden
        width 210px
        height 210px
        border-radius 100%
        img
          width 210px
          &:hover{
            animation coverImg 10s linear infinite
            animation-fill-mode forwards
          }
        .aniImg{
          animation coverImg 10s linear infinite
          animation-fill-mode forwards
        }
    #infoBox
      margin-left 10px
      width 400px
      height 100%
      h2
        text-align left
        margin 10px 0 10px 10px
        height 30px
        overflow hidden
        white-space nowrap
    p
      background #57000e
      float left
      padding 1px 20px 1px 20px
      margin 0px 0px 0px 0px
      height 13px
      overflow hidden
      font-size MFONTSIZE_SMALL
      color #fff
      text-align left
.activeLyric
  color #C20C0C

</style>
