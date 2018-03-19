var mongoose=require("mongoose");
// 内容的表结构
module.exports=new mongoose.Schema({
	category:{
		// 关联字段内容-分类的id
		type:mongoose.Schema.Types.ObjectId,
		// 引用
		ref:"Category"
	},
	user:{
		// 关联字段内容-用户id
		type:mongoose.Schema.Types.ObjectId,
		// 引用
		ref:"User"
	},
	// 添加时间
	addTime:{
		type:Date,
		default:new Date()
	},
	// 阅读量
	views:{
		type:Number,
		default:0
	},
	// 简介
	description:{
		type:String,
		default:""
	},
	// 内容
	content:{
		type:String,
		default:""
	},
	// 内容标题	
	title:String
});