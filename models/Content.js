var mongoose=require("mongoose");
var contentsSchema=require("../schemas/contents");
// 用户的表结构
module.exports=mongoose.model("Content",contentsSchema);