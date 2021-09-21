import Vue from 'vue'
import {Header,Swipe,SwipeItem,Button} from 'mint-ui'
Vue.component (Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component (SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button);

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import moment from 'moment'

Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern)
})


Vue.http.options.root = 'http://liulongbin.top:3005'



import app from './App.vue'
var vm = new Vue({
	el:"#app",
	render:c => c(app),
	router
	// 挂在路由对象到vm实例上
})