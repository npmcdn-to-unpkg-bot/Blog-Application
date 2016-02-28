/**
 * Created by Raphson on 2/22/16.
 */
var postModel = require("../models/post"),
    async = require("async"),
    commentModel = require("../models/comment");

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
    },
    getArticles : function(req, res){
        postModel.find({}).populate('author').exec(function(err, posts){
            if(err){
                console.log(err);
                return res.status(400).json({err : err});
            }

            return res.status(200).json(posts);
        });
    },
    updateArticle : function(req, res){
        postModel.findOne({_id : req.params.id}).exec(function(err, post){
            if(err){
                return res.status(404).json({success : false, message : "Post's Detail Not Found", err : err});
            }

            post.title = req.body.title;
            post.contents = req.body.contents;
            post.tags = req.body.tags;
            post.keywords = req.body.keywords;
            post.permalink = req.body.permalink;

            post.save(function(err){
                if(err){
                    return res.status(400).json({success : false, err : err});
                }
                return res.json({success : true, message : "Update Successful"});
            })

        });
    },
    showArticle : function(req, res){
        var postId = req.params.id;
        async.parallel([
            function(callBack){
                postModel.findOne({_id : postId}).populate('author').exec(function(err, post){
                    if(err){
                        callBack(err);
                    }

                    callBack(null, post);
                });
            },
            function(callBack){
                commentModel.find({blogId : postId}).sort({datePublished: 'asc'}).exec(function(err, comments){
                    if(err){
                        callBack(err);
                    }
                    callBack(null, comments);
                });
            }
        ],
        //Compute all results
        function(err, results) {
            if (err) {
                console.log(err);
                return res.status(404).json({success : false, message : "Post's Detail Not Found", err : err});
            }

            if (results == null || results[0] == null) {
                return res.send(400).json({success : false, message : "Post's Detail Not Found"});
            }

            var postData = {
                title : results[0].title,
                content : results[0].contents,
                tags : results[0].tags,
                keywords : results[0].keywords,
                permalink : results[0].permalink,
                author_name : results[0].author.name,
                author_username : results[0].author.username,
                datePublished : results[0].datePublished
            };
            postData.comments = results[1] || [];
            return res.status(200).json({success : true , post : postData});
        });
    },
    destroyArticle : function(req, res){
        postModel.remove({_id : req.params.id}, function(err, post){
            if(err){
                return res.status(404).json({success : false, message : "Post's Detail Not Found", err : err});
            }
            return res.json({success : true, message : "Delete Successful"});
        })
    }
}
