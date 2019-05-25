<template>
  <div id="mSonglist" class="test-1">
  <div>
    <div :class="datt.songList.length <= 1 && datt.songList[0].name==undefined ? 'empInfo' : 'havInfo'">列表空空如也~~</div>
    <ul>
      <li v-for="(item, index) in datt.songList" :key="index" >
        <div class="listLine" :class="[index % 2 == 0 ? 'white' : 'black', index == datt.currentSong.index ? 'now' : '']">
          <div>{{item.name}}</div>
        </div>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "mSonglist",
      data(){
          return{

          }
      },
      props: [
        'datt'
      ],
      watch:{
          asd(val){
            alert(val)
          }
      }
    }
</script>

<style scoped lang="stylus">
  @import '../../commondef/config.styl'
#mSonglist
  width 10rem
  height 20rem
  position absolute
  right 2rem
  bottom 2rem
  overflow-X hidden
  border 1px solid #ccc
  font-size 0.6rem
  border-radius 0.3rem
  background #fff
.listLine
  overflow hidden
  padding 0.7rem 0 0 0.5rem
  height 0.8rem
  div
    float left
    line-height 0.5rem

    white-space nowrap
.black
  background MBACKGROUND
.now
  background MRED
  color #fff
.empInfo
  font-size 1rem
  color MFONTBACK_P
  margin-top 4rem
.havInfo
  height 0
  overflow hidden
</style>
