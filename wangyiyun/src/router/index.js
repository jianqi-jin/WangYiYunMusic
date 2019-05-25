import Vue from 'vue'
import Router from 'vue-router'
import Search from '../components/Search/Search'
import playlist from '../components/playlist/playlist'
import listinfo from '../components/listinfo/listinfo'
import songInfo from '../components/songInfo/songInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Search',
      name: 'Search',
      component: Search//引用Search页面
    },
    {
      path:'/',
      redirect:'/Search' //重定向，跳转到Search页面
    },
    {
      path:'/playlist',
      name:'playlist',
      component:playlist
    },
    {
      path:'/listinfo',
      name:'listinfo',
      component:listinfo
    },
    {
      path:'/songInfo',
      name:'songInfo',
      component:songInfo
    }
  ]
})
