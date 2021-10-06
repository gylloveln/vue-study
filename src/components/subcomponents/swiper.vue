<template>
    <div>
        <mt-swipe :auto="4000">
			<!-- 在组件中使用v-for一定要使用key -->
            <!-- 将来，谁使用此轮播图组件，谁为我们传递lunbotuList -->
            <!-- 此时，lunbotuList应该是父组件向子组件传值来设置 -->
           <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
           	<img :src="item.img" :class="{full:isfull}">
           </mt-swipe-item>
        </mt-swipe>
    </div>

    <!-- 分析：商品详情页面中的轮播图界面那么丑 -->
    <!-- 1.首页中的图片，他的宽和高，都是使用了100%的宽度 -->
    <!-- 2.在商品详情页面中，轮播图的图片，如果也使用了宽高为100%的话，页面不好看 -->
    <!-- 3.商品详情页面中的期望：高度100%，宽度为自适应 -->
    <!-- 4.经过分析：得到问题的原因：首页中的轮播图和详情中的分歧点是宽度是100%还是自适应 -->
    <!-- 5.既然这两个轮播图，其他方面都素hi没有冲突的，只是宽度有分歧，定义一个属性，让使用轮播图的调用者手动指定是否为100%的宽度 -->
</template>

<script>
    export default {
        props:["lunbotuList","isfull"]
    };
</script>

<style lang="scss" scoped>
    .mint-swipe{
	height: 200px;


	.mint-swipe-item{
        text-align: center;

	img{
		// width: 100%;
		height: 100%;
	}
  }
}
   .full{
       width: 100%;
   }
</style>