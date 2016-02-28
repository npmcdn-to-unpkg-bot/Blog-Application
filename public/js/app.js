angular.module('bloggerApp', ['ui.router', 'toastr','blogger.posts', 'blogger.admin']).run(['$state',function($state){
    $state.go('allPosts');
}]);