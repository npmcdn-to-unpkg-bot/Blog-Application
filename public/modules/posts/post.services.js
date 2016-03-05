/**
 * Created by Raphson on 2/23/16.
 */
angular.module('blogger.posts.services', [])
    .factory('postService', ['$http',function($http) {
    return {
        addCommentToAPost : function(postId, comment, cb){
            $http.post('/api/posts/' + postId + '/comments', comment).then(function(response){
                if(response.data.success){
                    cb(true, response.data);
                }
                else{
                    cb(false, response.data);
                }
            });
        }
    }
}]);