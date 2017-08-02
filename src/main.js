import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import MuseUI from 'muse-ui'
// import 'muse-ui/dist/muse-ui.css'
import Vuex from 'vuex'
import App from './App.vue'
import BScroll from 'better-scroll'
import axios from 'axios'



import article from './components/article.vue'
import login from './components/admin/login.vue'
import nav from './components/nav.vue'
import articleEdit from './components/admin/articleEdit.vue'
import articleDetail from './components/articleDetail.vue'
import articleList from './components/admin/articleList.vue'
import chat from './components/chat.vue'

//在其他组件中无法调用axios 需要将axios改写为Vue的原型属性
Vue.prototype.$ajax = axios;
Vue.use(VueRouter)
// Vue.use(VueResource)
Vue.use(Vuex)
// Vue.use(MuseUI)
// 按需引用element
import { Button, Message, MessageBox,Row,Col, Notification, Popover, Tag, Input } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
const components = [Button, Message, MessageBox, Notification, Popover, Tag, Input,Row,Col]

components.forEach((item) => {
  Vue.component(item.name, item)
})

const MsgBox = MessageBox
Vue.prototype.$msgbox = MsgBox
Vue.prototype.$alert = MsgBox.alert
Vue.prototype.$confirm = MsgBox.confirm
Vue.prototype.$prompt = MsgBox.prompt
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification

const router = new VueRouter({
  routes: [
    {path: '/', components: {default: article,nav: nav}},
    {path: '/article', components: {default: article}},
    // {path: '/about', components: {default: article, nav: nav}},
    {path: '/articleDetail/:id', components: {default: articleDetail, nav: nav}},
    {path: '/admin/articleList', components: {default: articleList, nav: nav}},
    {path: '/admin/articleEdit', component: articleEdit},
    {path: '/admin/articleEdit/:id', component: articleEdit},
    {path: '/admin/login', components: {default: login, nav: nav}},
    {path: '/chat', components: {default: chat, nav: nav}}
  ]
})
const store = new Vuex.Store({
  state: {
    // login: localStorage.getItem('login') == 1 ? true : false
    login: true
  },
  mutations: {
    login (state) {
      state.login = true;
      localStorage.setItem('login',1);
    }
  }
})

router.beforeEach((to, from, next) => {
    if(to.fullPath == '/admin/articleEdit' || to.fullPath == '/admin/articleList'){
      if(!store.state.login){
         next({ path: '/admin/login' })
      }else{
        next()
      }
    }else{
       next()
    }
})

new Vue({
  el: '#app',
  router: router,
  store:store,
  render: h => h(App)
})

