/**
 * Created by Raphson on 2/22/16.
 */
var postModel = require("../models/post");
module.exports = {
    addArticle : function(req, res){
        var post = new postModel();
        post.title = req.body.title;
        post.contents = req.body.contents;
        post.tags = req.body.tags;
        post.keywords = req.body.keywords;
        post.author = req.decoded.id;
        post.permalink = req.body.permalink;

        post.save(function(err, post){
            if(err){
                console.log(err);
                return res.status(400).json({err : err});
            }

            return res.json({success : true, message : "Post Added"});
        });

        return res.status(200);
    },
    getArticles : function(req, res){
        postModel.find({}, function(err, posts){
            if(err){
                console.log(err);
                return res.status(400).json({err : err});
            }

            return res.status(200).json(posts);
        });
    }
}
