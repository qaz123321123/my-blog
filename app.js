// 应用程序入口页面
var express=require("express");
// 加载模板处理模块
var swig=require("swig");
var User=require("./models/User");
// 加载cookies
var Cookies=require("cookies");
//加载数据库模块
var mongoose=require("mongoose");
// 加载body-parser,用来处理post提交过来的数据
var bodyParser=require("body-parser");
var app=express();
// 设置静态文件托管
// 当用户访问的url以/public开始，那么直接返回对应__dirname+'/public'下的文件
app.use('/public',express.static(__dirname+'/public'));
// 配置应用模板，定义当前应用程序所使用的模板引擎
// 第一个参数，模板引擎的名称，同时也是模板文件的后缀,
// 第二个参数表示用于解析处理模板内容的方法
app.engine("html",swig.renderFile);
// 设置模板文件存放的目录，第一个参数必须是views，
// 第二个参数是目录
app.set("views","./views");
// 注册所使用的模板引擎，第一个参数必须是view engine，
// 第二个参数和app.engine这个方法中的第一个参数是一样的
app.set("view engine","html");
// 在开发过程中需要取消模板缓存，否则以同样的路径，
// 同样的模板渲染到页面，页面不会得到实时更新
swig.setDefaults({cache:false});
// body-parser设置
app.use(bodyParser.urlencoded({extended:true}));
// 设置cookie
app.use(function(req,res,next){
	req.cookies=new Cookies(req,res);
	// 解析登陆用户的信息
	req.userInfo={};
	if(req.cookies.get("userInfo")){
		try{
			req.userInfo=JSON.parse(req.cookies.get("userInfo"));
			// 获取当前登录用户的类型，是否是管理员
			User.findById(req.userInfo._id).then(function(userInfo){
				req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
				next();
			})
		}catch(e){
			next();
		}
	}else{
		next();
	}
});
app.use('/admin',require('./routers/admin'));//后台
app.use("/api",require("./routers/api"));//API
app.use("/",require("./routers/main"));//前台
// app.get('/',function(req,res,next){
	// 读取views目录下的指定文件，解析并返回给客户端
	// 第一个参数表示模板的文件，相对于views目录，views/index.html
	// 第二个参数表示传递给模板使用的数据
	// res.render("index");
// });
// 连接数据库
mongoose.connect("mongodb://localhost:27018/blog",function(err){
	if(err){
		console.log("数据库连接失败");
	}else{
		// console.log("数据库连接成功");
		app.listen(8081);
	}
});

