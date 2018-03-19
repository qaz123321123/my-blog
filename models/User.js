var mongoose=require("mongoose");
var usersSchema=require("../schemas/users");
// 用户的表结构
module.exports=mongoose.model("User",usersSchema);