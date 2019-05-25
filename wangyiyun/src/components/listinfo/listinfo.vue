<template>
    <div id="listInfo">
      <div id="infoBox">
        <div id="listImg">
          <img :src="listData.coverImgUrl" alt="">
        </div>
        <div id="hot"><p>歌曲：{{listData.trackCount}}首 | 热度：{{listData.playCount}}</p></div>
        <div id="infoContent">
          <h2 class="listTitle">{{listData.name}}</h2>
          <div class="listCreator">
            <img :src="listData.creator.avatarUrl" alt="">
            <p class="listNickName">{{listData.creator.nickname}}</p>
            <p class="listBirthday">{{listData.creator.birthday}}</p>
          </div>
          <div class="buttons">
            <div class="buttonPlayAll" @click="changeSongsList()">播放全部</div>
            <div class="buttonAddAll" @click="addSongList()">添加歌单</div>
          </div>
          <div class="listText">
            <p>标签 ： {{listData.tags}}</p>
            <p>简介 ： {{listData.description}}</p>
          </div>
        </div>


      </div>
      <div id="songsList">
        <ul>
          <li class="listSong">
            <div class="listSongBox listSongBoxTitle">
              <div class="songName">歌名</div>
              <div class="songSinger">歌手</div>
              <div class="songAlbum">专辑</div>
              <div class="songDuration">时长</div>
            </div>
          </li>
          <li class="listSong" v-for="(item, index) in listData.tracks" :key="index">
            <div @click="toSongInfo(item.id)" class="listSongBox" :class="index % 2 ? 'black' : 'white'">
              <div class="songName">{{item.name}}</div>
              <div class="songSinger">{{item.artists[0].name}}</div>
              <div class="songAlbum">{{item.album.name}}</div>
              <div class="songDuration">{{Math.floor(item.duration / 60000).toString().length > 1 ? '' : '0' + Math.floor(item.duration / 60000)}}：{{Math.floor(item.duration / 1000 % 60).toString().length == 1 ? '0' : ''}}{{Math.floor(item.duration / 1000 % 60)}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import {getListInfo, getSongHref} from "../../api/httpReq";
  import {mapGetters, mapActions} from 'vuex'

  export default {
        name: "listInfo",
      data(){
          return {
            listData:{}
          }
      },
      computed:{
        ...mapGetters([
          'listInfoId'
        ])
      },
      mounted(){
          if(this.$route.params.id){
            this.asnycSetListInfoId(this.$route.params.id)
            //alert(this.$route.params.id)
          }else{
            if(!this.listInfoId){
              this.$router.push({
                name:'playlist'
              })
              return false
            }
            this.$route.params.id = this.listInfoId
            //alert(this.$route.params.id)
          }
        getListInfo(this.$route.params.id).then((res) => {
          this.listData = res.data.result
          console.log(this.listData)
        })
      },
    methods:{
      ...mapActions([
        'asnycSetListInfoId',
        'asyncSetSongsList',
        'asnycSetPlayFlag'
      ]),
      toSongInfo(id){
        this.$router.push({
          name:'songInfo',
          params:{
            id
          }
        })
      },
      changeSongsList(){
        this.asyncSetSongsList(this.listData.tracks);
        setTimeout(() => {
          this.asnycSetPlayFlag(true)
        }, 1000);
      },
      addSongList(){

      }
    }
    }
</script>

<style scoped lang="stylus">
  @import '../../commondef/config.styl'

.buttons
  margin 10px
  overflow hidden
  div
    float left
    &:hover{
      cursor:pointer
    }
  .buttonPlayAll
    background MRED
    font-size MFONTSIZE_SMALL
    width 70px
    border-radius 2px
    color #fff
    height 18px
    line-height 18px
    text-align center
  .buttonAddAll
    background MGRAY_BUTTON
    font-size MFONTSIZE_SMALL
    width 70px
    margin-left 10px
    border-radius 2px
    color #fff
    height 18px
    line-height 18px
    text-align center
.black
  background MBACKGROUND
#hot
  p
    font-size MFONTSIZE_SMALL
    color MFONTBACK_P
  position absolute
  right 30px
#infoBox
  margin 20px
  overflow hidden
  height 150px
  padding-left 150px
  h2
    text-align left
    font-size MFONTSIZE_BIG
    padding 0
    margin 5px 0 10px 0
  #listImg
    margin-left -150px
    float left
    width 150px
    img
      width 100%
  #infoContent
    .listText
      margin-top 15px
      font-size MFONTSIZE_SMALL
    text-align left
    width 100%
    float left
    height 100%
    margin-left 10px
    .listCreator
      overflow hidden
      p
        line-height 25px
        float left
        padding 0
        margin 0
      img
        width 25px
        border-radius 25px
        float left
      .listNickName
        margin-left 5px
        font-siz MFONTSIZE_NORMAL
        color MFONTBACK_TITLE
      .listBirthday
        margin-left 10px
        font-size MFONTSIZE_SMALL
        color MFONTBACK_P
ul
  width 600px
  margin auto
  box-shadow 1px 1px 5px #ccc
li

  height 25px
  margin-top 6px
  border 1px solid #fff

  &:hover .listSongBox{
    cursor pointer
    animation hover 0.2s
    animation-fill-mode forwards
  }

.listSongBox
  animation hover_none 0.2s
  animation-fill-mode forwards
  text-align left
  box-shadow 1px 1px 5px #fff
  height 25px
  overflow hidden
  font-size MFONTSIZE_NORMAL
  line-height 25px
  padding-left 10px
  div
    float left
  .songName
    width 20%
  .songDuration
    width 10%
  .songAlbum
    width 40%
  .songSinger
    width 20%

  @keyframes hover{
    0%{
      margin 0px 0 0px 0
    }
    100%{
      box-shadow 1px 1px 5px #cc2510
      margin -5px -5px 5px 5px
    }
  }
  @keyframes hover_none{
    0%{

      box-shadow 1px 1px 10px #ccc
      margin -5px -5px 5px 5px
    }
    100%{
      margin 0px 0 0px 0
    }
  }
.listSongBoxTitle
  box-shadow 1px 1px 5px #ccc
</style>
