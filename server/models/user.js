/**
 * Created by Raphson on 2/21/16.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var schema = mongoose.Schema;

var userSchema = new schema({
    username : {type : String, required: true, unique: true},
    password : {type : String , required: true},
    name : {type : String, required: true}
});

userSchema.methods.hashPassword = function(userPassword){
    return bcrypt.hashSync(userPassword, bcrypt.genSaltSync(10), null);
}

userSchema.methods.comparePassword = function(userPassword , dbPassword, cb){
    bcrypt.compare(userPassword, dbPassword, cb);
}

module.exports = mongoose.model('User', userSchema, 'users');