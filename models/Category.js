var mongoose=require("mongoose");
var categoriesSchema=require("../schemas/categories");
// 用户的表结构
module.exports=mongoose.model("Category",categoriesSchema);