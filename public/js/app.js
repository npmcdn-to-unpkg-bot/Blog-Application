angular.module('bloggerApp', ['ui.router','blogger.posts']).run(['$state',function($state){
    $state.go('allPosts');
}]);