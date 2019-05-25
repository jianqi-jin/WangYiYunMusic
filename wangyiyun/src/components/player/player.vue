<template>
    <div id="player">
      <audio @timeupdate="updateTime" :src="currentSong.hrefInfo.url" ref="audio"></audio>
      <div id="controlButton">
        <div id="last" @click="lastSong()"><i class="music_last" style="font-size: 6px"></i></div>
        <div id="pause" @click="toglePlay()"><i ref="play" class="music_play"></i></div>
        <div id="next" @click="nextSong()" class="music_next"></div>
      </div>
      <div id="playBar" :style="'width:'+songInfo.barInfo.totleWidth + 'px'">
        <div id="nowTime" class="playTime">{{songInfo.nowTime}}</div>
        <div id="barBox">
          <div id="barButton" :style="'left:'+songInfo.barInfo.process + '%'" v-drag="{totleWidth:songInfo.barInfo.totleWidth - 120 , start: 190, callback:setTest}">
            <div id="barButtonBack"></div>
          </div>
          <div id="barBack"></div>
          <div id="barProcess" :style="'width:'+songInfo.barInfo.process + '%'"></div>
        </div>
        <div id="totleTime" class="playTime">{{songInfo.totleTime}}</div>
      </div>
      <div id="btn_songList" @click="songListFlag = ~songListFlag">{{songListFlag ? '隐藏' : '列表'}}</div>
      <div id="btn_songInfo" @click="toSongInfo()">词</div>
      <m-songlist id="mSonglist" v-if="songListFlag" :datt="song"></m-songlist>
    </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {getSongHref} from "../../api/httpReq";
  import MSonglist from "../mSongList/mSonglist";

  export default {
        name: "player"
    ,
    components: {MSonglist},
    computed:{
        ...mapGetters([
          'currentSong',
          'song'
        ])
      },
      methods:{
        ...mapActions([
          'asnycSetCurrentTime',
          'asnycSetPlayFlag',
          'asnycSetSongHref',
          'asyncNextSong',
        ]),
        toglePlay(){
          //songInfo.playFlag = songInfo.playFlag ? false : true
          //console.log(this.currentSong.playFlag);
          if(this.currentSong.playFlag){
            this.asnycSetPlayFlag(false);
          }else{
            this.asnycSetPlayFlag(true);
          }
        },
          toSongInfo(){
            this.$router.push({
              name:'songInfo',
              params:{
                id: this.currentSong.id
              }
            })
          },
          lastSong(){
            this.asyncNextSong(-1);
          },
          nextSong(){
            this.asyncNextSong(1);
          },

          durToTime(duration){
            var min = Math.floor(duration / 60).toString()
            var sec = Math.floor(duration % 60).toString()
            var time = (min.length === 1 ? '0' : '' ) + min + '：' + (sec.length === 1 ? '0' : '' ) + sec
            return time
          },
          setTest(val){
            this.$refs.audio.currentTime = (val / 100) * this.songInfo.duration
            this.songInfo.barInfo.process = val
          },
        updateTime(e){
          const process = e.target.currentTime * 100 / this.$refs.audio.duration
          //console.log(process)
          this.songInfo.barInfo.process = process
          //console.log(this.$refs.audio.duration)
          this.songInfo.totleTime = this.durToTime(this.$refs.audio.duration)
          this.songInfo.nowTime = this.durToTime(e.target.currentTime)
          this.songInfo.duration = this.$refs.audio.duration
          this.asnycSetCurrentTime(e.target.currentTime * 1000)
        }
      },
      mounted(){
        const that = this
        window.onresize = () => {
          return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
          })()
        }
      },
      watch:{
        screenWidth(val){
          this.songInfo.barInfo.totleWidth = val - 220 > 250 ? val - 220 : 250
        },
        process(val){
          this.$refs.audio.currentTime = 0
        },
        currentSong(val){
          this.asnycSetSongHref({
            url:'http://music.163.com/song/media/outer/url?id='+val.id+'.mp3'
          })
        },
        'currentSong.playFlag':{
          handler(val){
            //this.songInfo.playFlag = val.playFlag;
            if(!val){
              this.$refs.audio.pause()
              this.$refs.play.className = 'music_play'

            }else{
              this.$refs.audio.play()
              this.$refs.play.className = 'music_pause'
            }
          },
          deep:true

        },
        songInfo:{
          handler(val,das){
            /*
            const playFlag = val.playFlag
            this.asnycSetPlayFlag(playFlag)
            //console.log(this.currentSong.playFlag);
            if(playFlag){
              this.$refs.audio.play()
              this.$refs.play.className = 'music_pause'
            }else{
              this.$refs.audio.pause()
              this.$refs.play.className = 'music_play'
            }
            */
          },
          deep:true
        }
      },
      data(){
          return {
            songListFlag:false,
            screenWidth:0,
            songInfo:{
              title:'',
                // http://m10.music.126.net/20190208184723/236cdc05e75cb27b99536b738833dee2/ymusic/927b/3cd3/d75b/25a43ca1822990c78c5494ad23fd6136.mp3
              url:'http://m10.music.126.net/20190208195143/2fd1b66a9c1949bcb70b6680338711aa/ymusic/927b/3cd3/d75b/25a43ca1822990c78c5494ad23fd6136.mp3',
              nowTime:'00：00',
              totleTime:'00：00',
              duration:0,
              currentTime:0,
              playFlag:false,
              totleWidth:document.body.clientWidth - 220 > 250 ? document.body.clientWidth - 220 : 250,
              barInfo:{
                totleWidth:document.body.clientWidth - 220 > 250 ? document.body.clientWidth - 220 : 250,
                process:'0'//进度百分制
              }
            }
          }
      }
    }
</script>

<style scoped lang="stylus">
  @import '../../commondef/config.styl'
  #player
    background MBACKGROUND
    position fixed
    display flex
    bottom 0px
    height 34px
    width 100%
    &:after{
      content ''
      border-top 1px solid MBORDER
      width 100%
      height 1px
      position absolute
      top -1px
      transform scaleY(0.3)
    }
  #controlButton
    margin-left 5px
    div
      float left
      width 23px
      height 23px
      margin 6px 0px 5px 15px
      border-radius 100%
      background MBUTTON_RED
      &:hover{
        background MRED
      }
    #pause
      width 27px
      height 27px
      margin 4px 0px 3px 15px
  #playBar
    overflow hidden
    height 10px
    position absolute
    left 130px
    //right 100px
    top 13px
    div
      float left
  #barBox
    position absolute
    left 60px
    right 60px
    top 0px
    height 10px
    #barBack
      position relative
      height 3px
      top 3px
      width 100%
      background MBAR_BACK
      border-radius 10px
      overflow hidden
      z-index 0
    #barProcess
      position relative
      height 3px
      top 0px
      width 100%
      background MBUTTON_RED
      border-radius 10px
      overflow hidden
      z-index 1
    #barButton
      position relative
      z-index 2
      top -4px
      &:hover{
        cursor pointer
      }
      &:after{
        content ''
        position absolute
        width 16px
        height 16px
        border-radius 100%
        border 1px solid MBORDER
        background #fff
        transform scale(0.5)
        left -8px
      }
      &:before{
        content ''
        border-radius 100%
        position absolute
        width 6px
        height 6px
        z-index 10
        top 6px
        transform scale(0.5)
        left -2px
        background MBUTTON_RED
      }

  .playTime
    width 30px
    margin 0 10px 0 20px
    font-size MFONTSIZE_SMALL
    color MFONTBACK_TITLE
    &:last-child{
      position absolute
      right 0
    }
  #barButtonBack
    z-index 10
    right -2000px
    left -2000px
    height 7px
    border-radius 10px
    //left -50px
    top 4px
    position absolute
#btn_songList
  top 0.5rem
  position absolute
  right 50px
  &:hover{
    cursor: pointer
  }
#btn_songInfo
  top 0.5rem
  position absolute
  right 20px
  &:hover{
    cursor: pointer
  }
</style>
