<template>
    <div id="search">
      <h2>搜索你喜欢的音乐</h2>
      <div id="box">
        <div id="ic">
        </div>
        <div id="text">
          <input @input="inputFun" placeholder="搜索感兴趣的内容" type="text">
        </div>
        <div id="searchButton" @click="searchSubmit">
          搜索
        </div>
      </div>
      <div id="playList"><div><p @click="toPlayList"><i>全部分类</i></p></div></div>
      <div id="info" v-show="info_flag">
        <div id="info_box">
          <div id="info_left"></div>
          <div id="info_right">
            <div id="info_data">
              <h3 v-show="searchInfoJson.songs ? true : false">单曲</h3>
              <ul class="ul_white">
                <li v-for="(item, index) in searchInfoJson.songs" :key="index">{{item.name}}</li>
              </ul>
              <h3 v-show="searchInfoJson.artists ? true : false">歌手</h3>
              <ul class="ul_black">
                <li v-for="(item, index) in searchInfoJson.artists" :key="index">{{item.name}}</li>
              </ul>
              <h3 v-show="searchInfoJson.albums ? true : false">专辑</h3>
              <ul class="ul_white">
                <li v-for="(item, index) in searchInfoJson.albums" :key="index">{{item.name}}</li>
              </ul>
              <h3 v-show="searchInfoJson.mvs ? true : false">视频</h3>
              <ul class="ul_black">
                <li v-for="(item, index) in searchInfoJson.mvs" :key="index">{{item.name}}</li>
              </ul>
              <h3 v-show="searchInfoJson.playlists ? true : false">歌单</h3>
              <ul class="ul_white">
                <li v-for="(item, index) in searchInfoJson.playlists" :key="index">{{item.name}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {search} from '../../api/httpReq'
  import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "Search",
      data(){
          return{
            searchConent:'',
            searchInfoJson:{},
            info_flag : false
          }
      },
      methods:{
        inputFun(e){
          this.searchConent = e.target.value  //取出input内容
          console.log(this.searchConent)
          if(this.searchConent.length < 1){  //判断是否为空
            this.info_flag = false           //取消提示框的显示
            return
          }
          //执行查询
          this.searchSubmit(this.searchConent, () => {  //此时input不为空，执行查询函数，callback回调
            if (this.searchConent.length < 1){
              this.info_flag = false
              return
            }else{
              this.info_flag = true
            }
          })
        },
        searchSubmit(data, callback) {//获取数据函数
          search(data).then((res) => {
            if(res.data.code == "200"){
              this.searchInfoJson = res.data.result
              callback()//获取到数据以后再执行callback函数来显示info框
            }else{
              console.log('error:error')
            }
          })
        },
        toPlayList(){
          this.$router.push({
            path:'playlist'
          })
        }
      }
    }
</script>

<style scoped lang="stylus">
  @import '../../commondef/config.styl'

  #search
    margin-top 100px
  #box
    margin auto
    margin-top 60px
    //border 1px solid #ccc
    overflow hidden
    width 350px
    border-radius 2px 20px 20px 2px
    height 25px
    box-shadow -1px 1px 5px #ccc
    &:hover {
      box-shadow 1px 1px 10px #aaa
    }

    div
      float left
    #ic
      width 0px
      height 25px
    #text
      width 300px
      height 25px
      input
        border 0px
        height 22px
        width 300px
        margin-left 10px
        color #666
    #searchButton
      width 50px
      background MRED
      height 100%
      color #fff
      line-height 25px
      font-size 12px
      &:hover{
        cursor pointer
        box-shadow 1px 1px 10px #000
        line-height 22px
      }
      &:active{
        line-height 25px
      }
  #info
    width 300px
    margin auto
    padding-right 50px
    #info_box
      box-shadow 1px 1px 10px #ccc
      overflow hidden
      width 300px
      div
        float left
      #info_left
        width 50px
        height 1px
      #info_right
        width 250px
      #info_data
        font-size 9px
        text-align left
        width 100%
        position relative
        &:after{
          content: ''
          position absolute
          height 100%
          width 1px
          bottom 0
          border-left 1px solid MBORDER
          transform scaleX(0.5)
        }
        h3
          margin-left -45px
          float left
          width 40px
          font-size 9px
          padding 4px 0 0 0
        ul
          width 100%
          //border-bottom 1px solid MBORDER
          overflow hidden
          &:after{
            content: '';
            position: absolute;
            width: 100%;
            left 1px
            height: 1px;
            border-bottom: 1px solid MBORDER;
            transform scaleY(0.1)
          }
          li
            padding 2px 0 2px 10px
            font-size 8px
            &:hover{
              background #f1f1f1
              cursor pointer
            }
  .ul_black
    background MBACKGROUND
#playList
  position absolute
  width 100%
  div
    width 320px
    margin auto
    padding 0px
  p
    margin-left 270px
    font-size 9px
    color MBACK
    width 50px
    &:hover{
      cursor pointer
    }
</style>
