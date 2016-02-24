/**
 * Created by Raphson on 2/23/16.
 */
angular.module('blogger.posts.controller', []).controller('PostController', ['$scope', 'postService', function($scope,postService){
    $scope.getallPosts = function(){
        return postService.getAll();
    };

    $scope.posts = $scope.getallPosts();

}]).controller('PostDetailsController', ['$stateParams', '$state','$scope', 'postService', function($stateParams, $state, $scope, postService){
    $scope.getPostById =  function(id){
        return postService.getPostById(id);
    };

    $scope.closePost = function(){
        $state.go('allPosts');
    };

    $scope.singlePost = $scope.getPostById($stateParams.id);
}]);