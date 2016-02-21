/**
 * Created by Raphson on 2/21/16.
 */
var userModel = require('../models/user.js');
module.exports = {
    registerUser : function(req,res){
        var user = new userModel();
        user.username = req.body.username;
        user.name = req.body.fullname;
        user.password = user.hashPassword(req.body.password);

        user.save(function(err, user){
            if(err){
                console.log(err);
                return res.status(404).json({err : err});
            }

            return res.json({ success: true, message: "User Registered successfully."});
        });
    }
}