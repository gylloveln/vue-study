<template>
    <div class="goods-list">
       <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
           <img :src="item.img_url" alt="">
           <h1 class="title">{{item.title}}</h1>
           <div class="info">
               <p class="price">
                   <span class="now">￥{{item.sell_price}}</span>
                   <span class="old">￥{{item.market_price}}</span>
               </p>
               <p class="sell">
                    <span>热卖中</span>    
                    <span>剩{{item.stock_quantity}}件</span>    
               </p>
           </div>
       </router-link> -->

        <!-- 在网页中有两种跳转方式 -->
        <!-- 方式1.使用a标签的形式叫做标签跳转 -->
        <!-- 方式2.使用window.location.href的形式，叫做编程式跳转 -->
       <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
           <img :src="item.img_url" alt="">
           <h1 class="title">{{item.title}}</h1>
           <div class="info">
               <p class="price">
                   <span class="now">￥{{item.sell_price}}</span>
                   <span class="old">￥{{item.market_price}}</span>
               </p>
               <p class="sell">
                    <span>热卖中</span>    
                    <span>剩{{item.stock_quantity}}件</span>    
               </p>
           </div>
       </div>
       <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data(){
            // data往自己组件内部挂在私有数据的
            return{
                pageindex:1,
                // 分页的页数
                goodslist:[]
                // 存放商品列表的数组
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            getGoodsList(){
                // 获取商品列表
                this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result=>{
                    if(result.body.status === 0){
                        // this.goodslist = result.body.message;
                        this.goodslist = this.goodslist.concat(result.body.message);
                    }
                });
            },
            getMore(){
                this.pageindex++;
                this.getGoodsList();
            },
            goDetail(id){
                // 使用js的形式进行路由导航
                console.log(this)
                // 注意：一定要区分this.$route和this.$router这两个对象
                // 其中：this.$route是路由【参数对象】，所有路由中的参数，params query都属于他
                // 其中：this.$router是一个路由【导航对象】，用它可以方便的使用JS代码实现路由的前进、后退、跳转到新的URL地址
                

                // 1.最简单的
                // this.$router.push("/home/goodsinfo/"" + id);
                // 2.传递对象
                // this.$router.push({path:"/home/goodsinfo/" + id});
                // 3.传递命名的路由
                 this.$router.push({name:"goodsinfo",params:{id}});
                // 4.// 带查询参数，变成 /register?plan=private
                // router.push({ path: 'register', query: { plan: 'private' }})
                

            }
        }
    };
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;

        .goods-item{
            display: flex;
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 3px 0;
            padding: 2px;
            flex-direction: column;
            justify-content: space-between;
            min-height: 210px;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>