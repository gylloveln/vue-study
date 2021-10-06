import Vue from 'vue'
// import {Header,Swipe,SwipeItem,Button} from 'mint-ui'
// Vue.component (Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component (SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button);
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
	state:{
		// this.$store.state.***
		car:car  
	},
	mutations:{
		// this.$store.commit('方法的名称'，'按需传递唯一的参数')
		addToCar(state,goodsinfo){
			var flag = false
			state.car.some(item=>{
				if(item.id == goodsinfo.id){
					item.count += parseInt(goodsinfo.count)
					flag = true
					return true
				}
			})
			if(!flag){
				state.car.push(goodsinfo)
			}
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		updateGoodsInfo(state,goodsinfo){
			state.car.some(item=>{
				if(item.id == goodsinfo.id){
					item.count = parseInt(goodsinfo.count)
					return true
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		removeFromCar(state,id){
			state.car.some((item,i)=>{
				if(item.id == id){
					state.car.splice(i,1)
					return true
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		updateGoodsSelected(state,info){
			state.car.some(item=>{
				if(item.id == info.id){
					item.selected = info.selected
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		}


	},
	getters:{
		// this.$store.getters.***
		getAllCount(state){
			var c = 0;
			state.car.forEach(item=>{
				c += item.count
			})
			return c
		},
		getGoodsCount(state){
			var o = {}
			state.car.forEach(item =>{
				o[item.id] = item.count
			})
			return o
		},
		getGoodsSelected(state){
			var o = {}
			state.car.forEach(item=>{
				o[item.id] = item.selected
			})
			return o
		},
		getGoodsCountAndAmount(state){
			var o = {
			count:0,
			amount:0

		}
		state.car.forEach(item=>{
			if(item.selected){
				o.count += item.count
				o.amount += item.price * item.count
			}
		})
		return o
	}
}
})


import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

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


Vue.http.options.root = 'http://liulongbin.top:3005';
Vue.http.options.emulateJSON = true;



import app from './App.vue'
var vm = new Vue({
	el:"#app",
	render:c => c(app),
	router,
	// 挂在路由对象到vm实例上
	store
})