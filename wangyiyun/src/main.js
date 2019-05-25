import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//import directives from './directives/index'
import store from './store'
import jquery from 'jquery'

import './commondef/base.styl'
import './commondef/icon.styl'

//Vue.use(axios)
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

/* eslint-disable no-new */

//注册自定义指令
Vue.directive('drag',(el, bindings) => {
  el.onmousedown = function (e) {
    console.log(bindings.value)
    var totleWidth = bindings.value.totleWidth
    var disX = e.pageX - el.offsetLeft//初始 page现在div位置
    var width = ((e.pageX - bindings.value.start) * 100) / totleWidth
    width = width > 0 ? width : 0
    width = width < 100 ? width : 100
    bindings.value.callback(width)
    document.onmousemove = function (e) {
      var width = ((e.pageX - bindings.value.start ) * 100) / totleWidth
      width = width > 0 ? width : 0
      width = width < 100 ? width : 100
      //el.style.left = width + '%'
      bindings.value.callback(width)
    }
    document.onmouseup = function (e) {
      document.onmousemove = document.onmouseup = null
    }
}})


new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
