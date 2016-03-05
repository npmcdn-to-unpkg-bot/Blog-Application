/**
 * Created by Raphson on 3/1/16.
 */
angular.module('blogger.posts.directives', [])
    .directive('spbComments', ['postService',function(postService){
       return {
           restrict : 'AEC',
           scope : {
               postInstance: '='
           },
           replace : true,
           link: function(scope, elem, attrs){
                scope.saveComment = function(){
                    var newComment = {
                        datePublished : new Date(),
                        content : scope.comment.content,
                        author : scope.comment.author
                    }
                    scope.postInstance.comments.push(newComment);
                    scope.comment = {};
                    postService.addCommentToAPost(scope.postInstance.id, newComment, function(status, data){
                        if(status)
                            console.log(data.message);
                    });

                }
           },
           templateUrl : 'modules/posts/views/comments.html'
       }
    }]);



