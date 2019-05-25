<template>
  <div id="app">
    <m-header></m-header>
    <router-view/>
    <m-footer></m-footer>
  </div>
</template>

<script>
  import MHeader from './components/mHeader/mHeader'
  import MFooter from './components/player/player'
export default {
  name: 'App',
  components:{
    MHeader,
    MFooter
  }
}
</script>

<style lang="stylus">
  @import './commondef/base.styl'
  @import "./commondef/config.styl"
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width 400px
  margin-bottom 50px
}
</style>
