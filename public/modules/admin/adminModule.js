/**
 * Created by Raphson on 2/25/16.
 */
angular.module('blogger.admin', ['blogger.admin.controller', 'blogger.admin.service', 'blogger.admin.filters']).config(['$stateProvider', function($stateProvider){
    $stateProvider.state('login', {
        url: '/login',
        controller : 'LoginController',
        resolve : {
            user : ['adminService', '$q', function(adminService, $q){
                if(adminService.getLoginUser()){
                    return  $q.reject({authorized:true});
                }

            }]
        },
        templateUrl: 'modules/admin/views/login.html'
    })
    $stateProvider.state('admin',{
        url: '/admin',
        abstract: true,
        controller: 'AdminController',
        resolve : {
            user : ['adminService', '$q', function(adminService, $q){
                return adminService.getLoginUser() || $q.reject({unAuthorized:true});
            }]
        },
        templateUrl: 'modules/admin/views/admin-home.html'
    });
    $stateProvider.state('admin.postNew', {
        url: '/posts/new',
        controller: 'postCreationController',
        resolve : {
            user : ['adminService', '$q', function(adminService, $q){
                return adminService.getLoginUser() || $q.reject({unAuthorized:true});
            }]
        },
        templateUrl: 'modules/admin/views/admin-new-post.html'
    });
    $stateProvider.state('admin.postUpdate', {
        url: '/posts/:id/edit',
        controller: 'postUpdateController',
        resolve : {
            user : ['adminService', '$q', function(adminService, $q){
                return adminService.getLoginUser() || $q.reject({unAuthorized:true});
            }]
        },
        templateUrl: 'modules/admin/views/admin-update-post.html'
    });
    $stateProvider.state('admin.postViewAll', {
        url: '',
        controller: 'postListController',
        resolve : {
            user : ['adminService', '$q', function(adminService, $q){
                return adminService.getLoginUser() || $q.reject({unAuthorized:true});
            }]
        },
        templateUrl: 'modules/admin/views/admin-all-posts.html'
    });

}]).run(['$rootScope', '$state', function($rootScope, $state){
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            if(error.unAuthorized) {
                console.log('No Access');
                $state.go('login');
            }

            if(error.authorized) {
                console.log('Access');
                $state.go('admin.postViewAll');
            }
        });
}]);