/**
 * Created by Raphson on 2/21/16.
 */

var mongoose = require('mongoose');
var schema = new mongoose.Schema;

var postSchema = new schema({
    title : {type : String},
    contents : {type : String},
    permalink : {type : String},
    tags : {type : String},
    keywords : {type : String},
    author : {type : schema.objectId, ref: 'users'},
    datePublished : {type : Date, default : Date.now}

});