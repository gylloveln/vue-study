<template>
    <div class="goddsinfo-container">

    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>


        <!--  商品轮播图区域 -->
        	<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
					</div>
				</div>
			</div>



        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：<del>{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">{{goodsinfo.sell_price}}</span>
                        </p>
                        <p>购买数量：<numbox @getcount="getSelectCount" :max="goodsinfo.stock_quantity"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                            <!-- 分析：如何实现加入购物车的时候拿到选择的数量 -->
                            <!-- 1.经过分析按钮属于goodsinfo页面，数字属于numberbox组件 -->
                            <!-- 2.由于涉及到父子组件的嵌套了，所以无法直接在goodsinfo页面中获取到选中的商品数量值 -->
                            <!-- 3.怎么解决这个问题？涉及到了子组件向父组件传值（事件调用机制） -->
                            <!-- 4.事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当作参数传递给这个方法 -->





                        </p>
					</div>
				</div>
			</div>
        <!-- 商品参数区 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
						<p>库存情况：{{goodsinfo.stock_quantity}}件</p>
						<p>上货时间：{{goodsinfo.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>

<script>
// 导入轮播图组件
import swiper from '../subcomponents/swiper.vue';
import numbox from "../subcomponents/goodsinfo_numbox.vue";
    export default {
        data(){
            return{
                id:this.$route.params.id,
                // 将路由参数对象中的id挂载到data，后期调用
                lunbotu:[],
                // 轮播图的数据
                goodsinfo:{},
                // 获取到的商品的信息
                ballFlag:false,
                // 控制小球影藏和显示的标识符
                selectedCount:1
                // 保存用户选中的商品数量，默认认为用户买一个
            };
        },
        created(){
            this.getLunbotu();
            this.getGoodsInfo();
        },
        methods:{
            getLunbotu(){
                this.$http.get('api/getthumimages/' + this.id).then(result=>{
                    if(result.body.status === 0){
                        // 先循环轮播图数组的每一项，为item添加img属性，因为轮播图组件中，只认识item.img,不认识item.src
                        result.body.message.forEach(item=>{
                            item.img = item.src;
                        })
                        this.lunbotu = result.body.message;
                    }
                });
            },
            getGoodsInfo(){
                // 获取商品的信息
                this.$http.get('api/goods/getinfo/' +this.id).then(result=>{
                    if(result.body.status === 0){
                        this.goodsinfo = result.body.message[0];
                    }
                })
            },
            goDesc(id){
                // 点击使用编程式导航跳转到图文介绍页面
                this.$router.push({name:"goodsdesc",params:{id}});
            },
            goComment(id){
                // 点击跳转到评论页面
                this.$router.push({name:"goodscomment",params:{id}});
            },
            addToShopCar(){
                // 添加到购物车
                this.ballFlag = !this.ballFlag;
                // 将购物车中商品的数据用数组存储起来，在car数组中存储一些商品的对象，可以暂时将商品对象设计成{id:商品id,count:要购买的数量，price:商品的单价，selected:true}
                // 拼接出一个要保存到store中car数组里的商品信息对象
                var goodsinfo = {id:this.id,count:this.selectedCount,price:this.goodsinfo.sell_price,selected:true};

                //  调用store中的mutations来将商品加入购物车
                this.$store.commit('addToCar',goodsinfo);
            },
            beforeEnter(el){
                el.style.transform = "translate(0,0)";
            },
            enter(el,done){
                el.offsetWidth;

                // 小球动画优化思路：
                // 1.先分析导致小球动画不准确的本质原因：我们把小球最终位置局限在了某一分辨率下的滚动条未滚动的情况下；
                // 2.只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离之后，问题就出现了；
                // 3.因此，我们经过分析，得到结论，不能把位移的横纵坐标写死了，应该根据不同情况动态计算坐标值；
                // 4.经过分析得出解题思路：先得到徽标的横纵坐标，再得到小球的横纵坐标，然后让y值求差，x值也求差，得到的结果就是横纵坐标要位移的结果
                // 5.如何得到位置？domObject.getBoundingClientReact()

                // 获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                // 获取徽标在页面中的位置
                const badgePosition = document.getElementById("badge").getBoundingClientRect();

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;
                




                el.style.transform = `translate(${xDist}px,${yDist}px)`;
                el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag;
            },
            getSelectCount(count){
                //  当子组件把选中的数量传递给父组件的时候，把选中的值保存在data上
                this.selectedCount = count;
                console.log('父组件拿到的数量值为：' + this.selectedCount)
            }
        },
        components:{
            swiper,
            numbox
        }
    };
</script>

<style lang="scss" scoped>
    .goddsinfo-container{
        background-color: #eee;
        overflow: hidden;
      .now_price{
        color:red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 999;
        top: 390px;
        left: 146px;

    }
 }
</style>