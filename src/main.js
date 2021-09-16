import Vue from 'vue'
import {Header,Swipe,SwipeItem} from 'mint-ui'
Vue.component (Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import VueResource from 'vue-resource'
Vue.use(VueResource)



import app from './App.vue'
var vm = new Vue({
	el:"#app",
	render:c => c(app),
	router
	// 挂在路由对象到vm实例上
})