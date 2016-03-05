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
                    //scope.comment.datePublished = new Date();
                    var newComment = {
                        datePublished : new Date(),
                        content : scope.comment.content,
                        author : scope.comment.author
                    }
                    scope.postInstance.comments.push(newComment);
                    scope.comment = {};
                    postService.addCommentToAPost(scope.postInstance.id, newComment, function(status, data){

                    });

                }
           },
           templateUrl : 'modules/posts/views/comments.html'
       }
    }]);



