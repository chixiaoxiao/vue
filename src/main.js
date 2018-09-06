// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/sass/element-variables.scss'//element ui 样式最先引入 避免打包后css优先级过高
import Vue from 'vue'
import App from './App'
import "babel-polyfill"
import router from './router'
import store from './store'
import './config'
import './filters'
import './utils/validator'
import './mixins/global'
import './directive/index'
import ElementUI from 'element-ui'

Vue.use(ElementUI, {size: 'small'})

Vue.config.productionTip = false

//自定义组件
import ui from './components'

Vue.use(ui)

//全局css
import './assets/css/base.css'
import './assets/css/icon.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
   store,
  components: { App },
  template: '<App/>'
})
