import VueRouter from "vue-router";

// 导入对应的路由组件
 import HomeContainer from './components/tabbar/HomeContainer.vue'
 import MemberContainer from './components/tabbar/MemberContainer.vue'
 import ShopCarContainer from './components/tabbar/ShopCarContainer.vue'
 import SearchContainer from './components/tabbar/SearchContainer.vue'

var router = new VueRouter({
    routes:[
        {path:'/',redirected:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MemberContainer},
        {path:'/shopcar',component:ShopCarContainer},
        {path:'/search',component:SearchContainer},
    ],
    linkActiveClass:'mui-active'
})

export default router