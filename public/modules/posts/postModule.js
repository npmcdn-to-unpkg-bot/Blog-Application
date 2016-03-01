/**
 * Created by Raphson on 2/23/16.
 */
angular.module('blogger.posts', ['blogger.posts.controller', 'blogger.posts.directives', 'blogger.posts.services'])
    .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider){
    $stateProvider.state('allPosts', {
        url: '/posts',
        templateUrl: 'modules/posts/views/posts.html',
        controller: 'PostController'
    });
    $stateProvider.state('singlePost', {
        url: '/posts/:id/:permalink',
        templateUrl: 'modules/posts/views/singlePost.html',
        controller: 'PostDetailsController'
    });
}]);