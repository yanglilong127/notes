#seajs用法
seajs解决了模块化命名冲突问题。
  1. 遵循 CMD 规范模块化开发，依赖的自动加载、配置的简洁清晰。
  2. 在html文件中引入sea.js脚本
  3. <script>
seajs.config({
	// Sea.js 的基础路径（修改这个就不是路径就不是相对于seajs文件了）
	base: 'http://example.com/path/to/base/',
	// 别名配置（用变量表示文件，解决路径层级过深和实现路径映射）
	alias: {
		'es5-safe': 'gallery/es5-safe/0.9.3/es5-safe',
		'json': 'gallery/json/1.0.2/json',
		'jquery': 'jquery/jquery/1.10.1/jquery'
	},
	// 路径配置（用变量表示路径，解决路径层级过深的问题）
	paths: {
		'gallery': 'https://a.alipayobjects.com/gallery'
	}
     });
//并发加载模块 a 和模块 b，并在都加载完成时，执行指定回调

seajs.use(['./a', './b'], function(a, b) {
  	a.init();
 	 b.init();
	});
</script>

4.模块开发
这里才是重点，其实也很简单就是一个书写规范（CMD）而已。
// 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
  var $ = require('jquery');
  var Spinning = require('./spinning');

 function add(a,b) {
		return convertor.convertorToNum(a)+convertor.convertorToNum(b);
};
function Person(name,age){
		this.name=name;
		this.age=age;
	};
Person.prototype.sayHi= function() {
	console.log('I am coder '+this.name);
	};

  // 或者通过 module.exports 提供整个接口
 module.exports={
	 	add,Person
	 }

});

引入模块
//配置seajs,给引包路径起别名
seajs.config({
		alias:{
			main:'./main.js',
			cal:'./01-calculator.js'
			}
		});
seajs.use(['main','cal'],function(a,b){
			alert(a.add(1,2));
			alert(b.divide(1,2));
			var person=new b.Person(2,33);
			console.log(person.sayHi());
		});

#jQ使用CMD规范
	使用第三方依赖   ，适配CMD，JQ使用CMD规范
	由于CMD规范没有被引入JQuery中，因此我么自己在JQuery中添加代码。
	if(typeof define==='function' && !define.amd){
	define(function(){
	return jQuery;
	})
	}

	然后在自己定义的模块中写上
	define(function(require,exports,module){
	var $=require('./jquery.js');   // 载入jquery包
	})


#github托管页面基本操作
github托管页面
1.git init 
2.git add --all
3.git status
4.git commit -m "提交日志"
5.git remote add origin https://github.com/yanglilong127/weijinsuo.git
6.git push -u origin master
//创建分支
7.git branch gh-pages    //名字固定，创建个分支
8.git checkout gh-pages  //切换到此分支
9.git push -u origin gh-pages  //同步分支

站点地址为yanglilong127.github.io/weijinsuo
若要为站点绑定域名，在根目录下新建一个文件名为CNAME（注意无后缀名）
内容为：自己的域名，，，再将域名解析。

分支与标签
git branch   显示所有本地分支
git checkout v2   切换到指定分支v2或者标签
git branch v2  创建本地分支v2

git clone <url>  克隆远程版本库
http 改成 HTTPS。
因为自签名证书的原因，用https方式git需要加 参数  -c http.sslVerify=false
例如
git  -c http.sslVerify=false  clone  https://hollychen@58.210.163.74/telematics/mqttbridge.git
git diff 查看改动操作信息
git log  存储日志
git reset --hard 134242  (开头6位) 回到之前的状态

在代码库文件夹的根目录添加一个.gitignore文件，此文件说明忽略的文件是哪些，在文件夹中直接添加文件名或者文件夹名eg:node_modules

####replace(/呀/,"和");后者替换前者字符
###replace(/呀/g,"和");后者替换前者字符


#网址记录
	在线压缩：http://tool.oschina.net/
	hexo  ：https://hexo.io/
	Browsersync + Gulp.js  ：https://browsersync.io/docs/gulp
	nodejs  :http://nodejs.cn/api/
		安装包：https://nodejs.org/en/download/
	正则表达式：http://www.blogjava.net/onejavaer/articles/79070.html
	bootstrap: http://www.runoob.com/bootstrap/bootstrap-intro.html
	NPM :https://docs.npmjs.com/
	淘宝NPM： https://npm.taobao.org/
	github:  账号 yanglilong127  yanglilong920109
		自己作品展览：https://yanglilong127.github.io/doubanAPI_angular/#/in_theaters/1
		官网： https://github.com/
	豆瓣API：https://developers.douban.com/wiki/?title=api_v2

	ionic:  http://ionicframework.com/docs/v2/components/#overview
		https://github.com/driftyco/ionic
		图标：http://ionicons.com/
		重要插件：http://ngcordova.com/docs/plugins/

	css3实现加载动画：tobiasahlin.com/spinkit
	腾讯课堂：https://ke.qq.com/course/20945

#jquery.lazyload.js图片延迟加载
	jquery.lazyload.js 是一个用 JavaScript 编写的jQuery 插件. 它可以延迟加载长页面中的图片. 在浏览器可视区域外的图片不会被载入, 直到用户将页面滚动到它们所在的位置.这与图片预加载的处理方式正好是相反的.在包含很多大图片长页面中延迟加载图片可以加快页面加载速度.浏览器将会在 加载可见图片之后即进入就绪状态. 在某些情况下还可以帮助降低服务器负担. 
	打包下载：http://www.ijquery.cn/demo/lazyload/lazyload.zip
	参数
placeholder : "img/grey.gif",     //用图片提前占位
effect : "fadeIn",    //载入使用何种效果,effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
threshold : 200,    //提前开始加载
event : "click",      //事件触发时才加载,event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标划过或点击图片才开始加载,后两个值未测试…
failurelimit : 10,     //图片排序混乱时 ,
failurelimit,值为数字.
	<script>
	  $(function() {
	      $("img.lazy").lazyload({effect: "fadeIn"});
	  });
	</script>

#返回选中的文字
	function Select(){
		if(document.selection)
			return document.selection.CreatRange().text;   //IE
		else return window.getSelection().toString();   //非IE
	}


#npm下载慢问题解决
	直接给npm配置taobao镜像的registry就好了，也不是非得装cnpm
	npm config set registry https://registry.npm.taobao.org
	然后直接用npm install gulp less --save-dev，就是从taobao镜像拿包了


#reset.css的作用和用途："覆盖"浏览器的CSS默认属性。最最简单的说法就是把浏览器提供的默认样式覆盖掉!这就是CSS reset。
	网址：http://cssreset.com   可以下载此文件
	