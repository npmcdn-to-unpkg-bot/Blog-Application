/**
 * Created by Raphson on 2/23/16.
 */
angular.module('blogger.posts.controller', [])
    .controller('PostController', ['$scope', 'postService', 'adminService', function($scope, postService, adminService){
        adminService.getPost().then(function(response){
            $scope.posts = response.data;
            console.log($scope.posts);
        });
    }]).controller('PostDetailsController', ['$stateParams', '$state','$scope', 'adminService', function($stateParams, $state, $scope, adminService){
        adminService.getEachPostDetails($stateParams.id, function(status, data){
            $scope.singlePost = data.post;
        });

        $scope.closePost = function(){
            $state.go('allPosts');
        };
}]);