/**
 * Created by Raphson on 2/25/16.
 */
angular.module('blogger.admin', ['blogger.admin.controller', 'blogger.admin.service', 'blogger.admin.filters']).config(['$stateProvider', function($stateProvider){
    $stateProvider.state('login', {
        url: '/login',
        controller : 'LoginController',
        templateUrl: 'modules/admin/views/login.html'
    })
    $stateProvider.state('admin',{
        url: '/admin',
        abstract: true,
        controller: 'AdminController',
        templateUrl: 'modules/admin/views/admin-home.html'
    });
    $stateProvider.state('admin.postNew', {
        url: '/posts/new',
        controller: 'postCreationController',
        templateUrl: 'modules/admin/views/admin-new-post.html'
    });
    $stateProvider.state('admin.postUpdate', {
        url: '/posts/:id/edit',
        controller: 'postUpdateController',
        templateUrl: 'modules/admin/views/admin-update-post.html'
    });
    $stateProvider.state('admin.postViewAll', {
        url: '',
        controller: 'postListController',
        templateUrl: 'modules/admin/views/admin-all-posts.html'
    });

}]);