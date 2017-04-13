Vue目前的的开发模式主要有两种：
1.直接页面级的开发，script直接引入Vue
2.工程性开发，webpack+loader或者直接使用脚手架工具Vue-cli，里面的文件都配置好了

webpack可以进行配置，配置多文件入口，进行多页面开发

第二种Vue开发，结合webpack打包完文件会很大，怎么解决这个问题?
1.webpack代码拆分：code-spliting
2.提取公共（如提取css,js）
3.预渲染：使用prerender-spa-plugin插件
4.后台————开启压缩，gzip	(会很有用)
5.异步加载组件：require.ensure

Vue常见错误解决方法：
1.[Vue-warn]:	Missing required prop: "to"  (found in component <router-link>)
这个错误是<router-link>少了个to或者是写错 ，正确写法为：<router-link to="/home">
并且路由在做字符串拼接的时候，to要作为一个属性绑定 <router-link :to="'/home/'+item.id">

2.端口冲突错误：需要改端口
　　当然现在vue2.0中的webpack 已经自己会根据你的端口号进行改正，从8080往后面进行递增，
　　不会发生端口号冲突的情况，在vue1.0中会经常出现

3.[Vue-warn]:Unknown custom element: <router-link> - did you register the component correctiy?
错误1：引进来的vue-router没有use()
　　import Vue from 'vue'
　　import VueRouter from 'vue-router'
　　Vue.use(VueRouter);
错误2：在生成路由实例之后，没有将路由挂到我们的Vue实例上面
const router=new VueRouter({
　　mode:'history',//切换路径模式，变成history模式,不然路径为/#/home
　　scrollBehavior:()=>({ // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
　　　　y:0
　　}),
　　// 注意这里的名称
　　routes
});
new Vue({
　　/* 4.最后挂到vue上 */
　　router,
　　el: '#app',
　　render: h => h(App)
});

4.Uncaught TypeError: _vuex2.default.store is not a constructor
　　这个报错的是_vuex2.default.store 不是一个构造函数
　　因为在我们用vuex的时候需要将用到的actions，mutations模块最终导出，
　　在导出的时候new Vuex.Store中的Store小写了，这里的一定要大写，
　　就相当于我们在使用构造函数(类)的时候首字母要大写

　　import mutations from './mutations.js'
　　import actions from './actions.js'

　　export default new Vuex.Store({	//Vue.Stroe()首字母大写
　　　　modules:{ //这里注意mutations导出的是一个模块
　　　　　　mutations
　　　　},
　　　　　　actions
　　　　});

5. Moudel not found:Error:Can't resolve "style" in 'D:\vue-demo'
　　在vue1.0中，在webpack.config.js中配置css文件时
　　module:{
　　　　loaders:[
　　　　　　{
　　　　　　　　test:/\.css$/,
　　　　　　　　loader:'style!css'
　　　　　　}
　　　　]
　　}
在vue2.0中，在webpack.config.js中配置css文件时，必须要写全，不能和vue1.0一样简写
　　module:{
　　　　rules:[	//这里改成了rules
　　　　　　{
　　　　　　　　test:/\.css$/,
　　　　　　　　loader:'style-loader!css-loader' //这里必须要写全，不能和vue1.0一样简写
　　　　　　}
　　　　]
　　}

6.组件之间的通信从1.0过渡到2.0时引发的错误：
vue1.0实现父子组件的通信 -->通过props属性-->并且子组件可以更改父组件的数据 通过sync同步
　　当在vue2.0里面不允许直接给父级数据做更改,并且把这个方法.sync去掉了，
　　当子组件再试图更改父组件的数据时，就会报错。
解决方法：
　　1.$emit()——单一事件管理
　　　　经常遇到的问题是找不到$emit()或$on(),这时需要单独准备一个文件Store.js
　　　　在文件里面需要:var oEvent =new Vue();
　　　　这个这个文件里的数据一定要导出去才可以使用：export default oEvent


　　2.对象之间的引用：(推荐使用)
　　　　vue1.0传数据：msg:'welcome' -->传给子级
　　　　vue2.0直接将数据定义成对象json的形式，这样传给子级的数据是对象的属性，即msg.title
　　　　这样子级修改父级的数据，修改的也是这个对象的一个属性msg.title
　　　　　　msg:{
　　　　　　　　title:'welcome'
　　　　　　}
　　　　　　msg.title

7.用vuex用来管理组件状态：（增加/减少，显示/隐藏）

 

8.axios目前不可以use，因为axios里面没有install这个方法
使用axios的时候，可以这样来使用：
1.将axios导入文件
　　import axios from 'axios'
2.将axios放入到Vue实例上面，这样在其他组件中，可以直接通过this.$https.get/post使用
　　在main.js中写：Vue.prototype.$http = axios
　　其他组件可以直接使用：
　　this.$http.get('data.txt').then((res)=>{
　　　　console.log(res.data);
　　}).catch((err)=>{
　　　　console.log(err);
　　});

10) element.ui表头点击事件
　　使用element.ui之后 @click="" 无法对表头等元素添加点击事件，正确的写法应该是@click.native=""

 

11)webpack2.0 插件的配置需要放到 plugins里面进行配置，不可放到rules里面进行配置


vue:两种开发方式
	1.直接页面级开发，script直接引入vue
	2.工程性开发，webpack+loader\  vue-cli
-------------------------
webpack 配置文件入口
-------------------------
webpack打包完很大   build.js
	a).webpack代码拆分：code-spliting
	b).提取公共（css,js）
	c).预渲染：prerender-spa-plugin
	d).后台----开启压缩,gzip
	e).异步加载组件   require.ensure