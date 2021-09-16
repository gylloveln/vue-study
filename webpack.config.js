// 由于webpack是基于Node进行构建的，所有webpack的配置文件中，任何合法的node代码都是支持的
var path = require('path')
// 在内存中，根据指定的模板页面生一份内存中的首页，同时自动把生成好的bundle注入到页面底部
// 如果要配置文件，需要在导出文件的对象中，挂载一个plugins节点
var htmlWebpackPlugin = require('html-Webpack-Plugin')
// 当以命令形式运行webpack 或 webpack-dev-server的时候，工具会发现，
// 我们并没有提供要打包的文件的入口和出口文件，此时它会检查项目根目录
// 中的配置文件，并读取这个文件，就拿到了导出的这个配置文件，然后根据这个对象，进行打包构建
module.exports = {
	entry:path.join(__dirname,'./src/main.js'),
	output:{
		path:path.join(__dirname,'./dist'),
		filename:'bundle.js'
	},
	plugins:[
		new htmlWebpackPlugin({
			template:path.join(__dirname,'./src/index.html'),
			filename:'index.html'
		})
	],
	module:{
		rules:[
			// 第三方模块的处理规则
			{test:/\.css$/,use:['style-loader','css-loader']},
			{test:/\.less$/,use:['style-loader','css-loader']},
			{test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
			{test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=34540&name=[hash:8]-[name].[ext]'},
			// limit给定的值，是图片的大小，单位是byte，如果我们引用的图片大于或等于给定的limit值，
			// 则不会被转为base64格式的字符串，如果图片小于给定的limit值，则会被转为base64的字符串
			{test:/\.(ttf|eot|svg|woff|woff2|)$/,use:'url-loader'},
			{test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
			// 这是配置babel来转换高级的ES语法
			{test:/\.vue$/,use:'vue-loader'}
		]
	},
	resolve:{
		alias:{
			// 设置vue被导入时候的包的路径
			// "vue$":"vue/dist/vue.js"
		}
	}
}