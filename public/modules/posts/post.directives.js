/**
 * Created by Raphson on 3/1/16.
 */
angular.module('blogger.posts.directives', [])
    .directive('spComments', function(Post){
       return {
           restrict : 'AEC',
           scope : {
               postInstance: '='
           },
           replace : true,
           link: function(scope, elem, attrs){

           },
           templateUrl : 'modules/posts/views/comments.html'
       }
    });