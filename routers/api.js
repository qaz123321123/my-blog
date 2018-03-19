var express=require("express");
var router=express.Router();
var User=require("../models/User");
// 统一返回格式
var responseData;
router.use(function(req,res,next){
	responseData={
		code:0,
		message:""
	};
	next();
});
// 用户注册，注册逻辑1.用户名不能为空2.密码不能为空3。两次输入密码必须一致
// 数据库查询1.用户名是否已经被注册了
router.post("/user/register",function(req,res,next){
	// 获取post提交过来的数据
	// console.log(req.body);
	var username=req.body.username;
	var password=req.body.password;
	var repassword=req.body.repassword;
	// 判断用户是否为空
	if(username==""){
		responseData.code=1;
		responseData.message="用户名不能为空";
		res.json(responseData);
		return;
	}
	// 判断密码是否为空
	if(password==""){
		responseData.code=2;
		responseData.message="密码不能为空";
		res.json(responseData);
		return;
	}
	// 两次输入的密码必须一致
	if(password!=repassword){
		responseData.code=3;
		responseData.message="两次输入的密码不一致";
		res.json(responseData);
		return;
	}
	// 用户名是否已经被注册
	User.findOne({
		username:username
	}).then(function(userInfo){
		// console.log(userInfo);
		if(userInfo){
			// 表示数据中有该记录
			responseData.code=4;
			responseData.message="用户名已经被注册";
			res.json(responseData);
			return;
		}
		// 保存用户注册的信息到数据库中
		var user=new User({
			username:username,
			password:password
		});
		return user.save();

	}).then(function(newUserInfo){
		responseData.message="注册成功";
		res.json(responseData);
	});
});
router.post("/user/login",function(req,res){
	var username=req.body.username;
	var password=req.body.password;
	if(username==""||password==""){
		responseData.code=1;
		responseData.message="用户名和密码不能为空";
		res.json(responseData);
		return;
	}
	// 查询数据库中相同用户名和密码的记录是否存在，如果存在则登陆成功
	User.findOne({
		username:username,
		password:password
	}).then(function(userInfo){
		if(!userInfo){
			responseData.code=2;
			responseData.message="用户名和密码错误";
			res.json(responseData);
			return;
		}
		responseData.message="登陆成功";
		responseData.userInfo={
			_id:userInfo.id,
			username:userInfo.username
		};
		req.cookies.set("userInfo",JSON.stringify({
			_id:userInfo.id,
			username:userInfo.username
		}));
		res.json(responseData);
		return;
	})

});
router.use("/user/logout",function(req,res){
	req.cookies.set("userInfo",null);
	res.json(responseData);
})
module.exports=router;