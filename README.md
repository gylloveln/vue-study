### 这是一个NB的项目

## 牛不牛逼，用心去感受每一行，代码中的诗情雅意

### 我们是有灵魂的程序员

#### 写好每一行代码

## [主流开源协议之间有何异同？](https://www.zhihu.com/question/19568896)

## 用传统方式命令行把修改过后的代码传到码云？？？
1. git remote add origin 码云的网址.git
2. git add .
3. git commit -m "提交信息"
4. git push origin master

## 制作首页App组件
1. 完成了Header区域，使用的是Mint-UI中的Header组件
2. 制作底部的Tabbar区域，使用的是MUI的Tabbar.html
3. 要在中间区域放置一个router-view来展示路由匹配到的组件
+ 在制作购物车小图标的时候操作会相对多一些
+ 先把扩展图标css样式拷贝在项目中
+ 拷贝扩展字体库ttf文件到项目中
+ 为购物车小图标添加样式

## 改造tabbar为router-link

## 设置路由高亮

## 点击tabbar中的路由连接展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，使用vue-resource
2. 使用vue-resource的this.$http获取数据
3. 获取到的数据要保存到我们data上
4. 使用v-for循环渲染每个item项

## 改造九宫格区域的样式

## 改造新闻资讯路由链接

## 实现新闻详情的页面布局和数据渲染


## 新闻资讯页面制作
1. 绘制界面(使用MUI中的media-list.html)
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现新闻资讯列表点击跳转到新闻详情
1. 把列表中的每一项改造为router-link,同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面NewsInfo.vue
3. 在路由模块中讲新闻详情的路由地址和组件页面对应起来

## 单独封装一个comment.vue评论子组件
1. 先创建一个单独的comment.vue组件模板
2. 在需要使用comment组件的页面中，先手动导入comment组件
+ import comment from './comment.vue'
3. 在父组件中shiyongcomponent属性将刚才导入comment组件，注册为自己的子组件
4. 将注册子组件时候的注册名称以标签形式在页面中引用即可

## 获取所有的评论数据显示到页面中