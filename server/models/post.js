/**
 * Created by Raphson on 2/21/16.
 */

var mongoose = require('mongoose');
var schema =  mongoose.Schema;

var postSchema = new schema({
    title : {type : String},
    contents : {type : String},
    permalink : {type : String},
    tags : {type : String},
    keywords : {type : String},
    author : {type : schema.ObjectId, ref: 'User'},
    datePublished : {type : Date, default : Date.now}
});

module.exports = mongoose.model('post', postSchema, 'posts');