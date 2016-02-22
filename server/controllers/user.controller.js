/**
 * Created by Raphson on 2/21/16.
 */
var userModel = require('../models/user.js'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash');
    secret = require('../../config/secrets');

module.exports = {
    registerUser : function(req,res){
        var user = new userModel();
        user.username = req.body.username;
        user.name = req.body.fullname;
        user.password = user.hashPassword(req.body.password);

        user.save(function(err, user){
            if(err){
                if(err.code == 11000 && err.errmsg.indexOf('$username_1') > 0){
                    return res.json({msg : "Username already exists"})
                }
                console.log(err);
                return res.status(404).json({err : err});
            }

            return res.json({ success: true, message: "User Registered successfully."});
        });
    },
    authenticateUser : function (req, res) {
        userModel.find({username : req.body.username}).select('password name _id username').exec(function(err, seenUser){
            if(err){
                res.status(500).json({error : err});
            } else if(seenUser.length == 0){
                res.send({success : false, message: "User not found"});
            } else if(seenUser.length == 1){
                var user = new userModel();
                user.comparePassword(req.body.password, seenUser[0].password, function(err, result){
                    if(err) {
                        console.log(err);
                        return res.status(500).json({error: 'Server Error'});
                    }

                    if(result){
                        var token = jwt.sign(seenUser[0], secret.sessionSecret, { expiresInMinutes : 1440 });
                        var currentUser = _.pick(seenUser[0], '_id', 'name', 'username');
                        return res.json({success : true, currentUser : currentUser, token : token});
                    }else{
                        return res.json({success : false, message: 'Wrong password! Authentication Failed'});
                    }
                });
            }

        });
    },
    tokenMiddleware : function(req, res, next){
        var  token  = req.body.token || req.query.token || req.headers['x-access-token'];

        if(token){
            jwt.verify(token, secret.sessionSecret, function(err, decoded){
                if(err){
                    return res.status(403).json({success : false, message : "Failed to auth token"});
                } else {
                    req.decoded = decoded;
                    next();
                }

            });
        } else
            return res.status(403).json({message : "Unauthorized Access"});
    }

}