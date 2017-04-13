/**
 * gulp主文件，用于注册任务
 * 
 */
'use strict';
//此处代码都是由NODE执行
//载入gulp模块
var gulp=require('gulp');
//注册一个任务
gulp.task('copy',function(){
	//当copy执行这个任务时会自动执行该函数
	//console.log('hello world');
	//合并 压缩之类的操作
	//复制文件，gulp.src('文件路径')取一个文件
	gulp.src('./src/index.html')
		.pipe(gulp.dest('dist/'));   //将此处需要的操作传递进去
});
//实时监听index.html文件是否改变
gulp.task('listen',function(){
	//gulp.watch('index.html',function(change){
	//	gulp.src("index.html")
	//		.pipe(gulp.dest('dist/'));
	//});
	gulp.watch('./src/index.html',['copy']);  //监听index文件，发生变化时调用copy任务，上面方法也可以；只是重复代码了
	gulp.watch('./sre/less/*.less',['css']);  //监听所有的.less文件，发声改变时调用css任务
});



//1.将less文件编译压缩
var less=require('gulp-less');   //载入gulp-less包
var cssnano=require('gulp-cssnano');  //载入gulp-cssnano包
//将.less文件编译成.css文件
gulp.task('css',function(){
		gulp.src('./src/less/*.less')
		.pipe(less())      //编译
		.pipe(cssnano())   //压缩
		.pipe(gulp.dest('./src/less'))
		.pipe(gulp.dest('dist/css'))
		//改变后刷新
		.pipe(browserSync.reload({stream:true}));
});
//将js文件合并压缩
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
gulp.task('script',function(){
	gulp.src('./src/js/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('dist/js'))
	//改变后刷新
	.pipe(browserSync.reload({stream:true}));
});
//将图片复制
gulp.task('image',function(){
	gulp.src('./src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	//改变后刷新
	.pipe(browserSync.reload({stream:true}));
});
//将html文件复制压缩
var htmlmin=require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('./src/*.html')
	.pipe(htmlmin({
		collapseWhitespace:true,   //删除空格
		removeComments:true		   //删除注释
		}))
	.pipe(gulp.dest('dist/'))
	//改变后刷新
	.pipe(browserSync.reload({stream:true}));   
});
//创建服务
var browserSync = require('browser-sync');
// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
    gulp.watch('./src/*.html',['html']);
    gulp.watch('./src/js/*.js',['script']);
    gulp.watch('./src/images/*.*',['image']);
    gulp.watch('./src/less/*.less',['css']);
});