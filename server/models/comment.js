/**
 * Created by Raphson on 2/21/16.
 */
var mongoose = require('mongoose');
var schema =  mongoose.Schema;

var commentSchema =new schema({
    datePublished : {type : Date, default : Date.now},
    content : {type : String},
    author : {type : String},
    blogId : {type : schema.ObjectId, ref : 'posts'}
});

module.exports = mongoose.model('comment', commentSchema, 'comments');