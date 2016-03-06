angular.module('bloggerApp', ['ui.router', 'toastr', 'ngStorage', 'blogger.posts', 'blogger.admin']).run(['$state',function($state){
    $state.go('allPosts');
}]);