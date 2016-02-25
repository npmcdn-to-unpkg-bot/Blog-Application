angular.module('bloggerApp', ['ui.router','blogger.posts', 'blogger.admin']).run(['$state',function($state){
    $state.go('allPosts');
}]);