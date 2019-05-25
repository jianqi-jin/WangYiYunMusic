<template>
    <div id="playList">
      <ul>
        <li v-for="(item, index) in playList" :key="index">
          <div class="box">
            <img @click="toListInfo(item.id)" :src="item.img" alt="">
            <div class="info">
              <p class="title">{{item.title}}</p>
              <p class="owner">by-<i>{{item.owner.name}}</i></p>
              <div class="hot"><div></div><p>{{item.hot}}</p></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  import {getPlayList} from "../../api/httpReq";
  import '../../../static/data'
  export default {
        name: "playlist",
      data(){
          return {
            playList:[]
          }
      },
      methods:{

      },
      mounted(){
        getPlayList().then((res) => {
          console.log(res.data)
          this.playList = res.data
        })
      },
    methods:{
      toListInfo(id){
        this.$router.push({
          name:'listinfo',
          params:{
            id
          }
        })
      }
    }
    }
</script>

<style scoped lang="stylus">
@import '../../commondef/config.styl'

@keyframes anima2{
  0% {
    /*
    margin 0px
    width 114px
    */
    margin 0px 0px 14px 14px
  }

  100% {
    margin 7px
  }
}

@keyframes anima{
  0% {
    margin 7px
  }

  100% {
    margin 0px 0px 14px 14px
  }

}

  .playList
    width 800px
    overflow hidden
  ul
    margin-top 10px
    overflow hidden
    li
      width 100px
      float: left
      height 150px
      margin 7px
      &:hover .box{
        animation anima 0.2s
        animation-fill-mode forwards
      }
  .box
    margin 7px
    box-shadow 1px 1px 10px #ccc
    border-radius 3px
    animation anima2 0.1s
    animation-fill-mode forwards
    background #fff
    width 100%
    overflow hidden
    img
      width 100%
      min-height 100px
      &:hover{
        cursor pointer
      }
    .info
      text-align left
      padding 0px 3px 0px 3px
      position relative
      p
        padding 0px
        margin 0px
      .title
        margin 2px
        font-size 9px
        letter-spacing 0px
        color MFONTBACK_TITLE
        &:hover{
          cursor pointer
        }
      .owner
        margin-top 5px
        font-size 8px
        text-align right
        color MFONTBACK_P
        &:hover{
          cursor pointer
        }
      .hot
        div
          width 100%
          left 0
          position absolute
          top -15px
          background #000
          opacity 0.5
          height 10px
        p
          color #fff
          top -15px
          position absolute
          font-size 7px
</style>
