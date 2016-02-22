/**
 * Created by Raphson on 2/22/16.
 */
var commentModel = require("../models/comment");

module.exports = {
    storeComment : function(req, res){
        var comment = new commentModel();
        comment.author = req.body.author;
        comment.content = req.body.comment;
        comment.blogId = req.params.id;
4

        comment.save(function(err, comment){
            if(err){
                console.log(err);
                return res.status(400).json({err : err});
            }

            return res.json({success : true, message : "Comment Added"});
        });
    },

}