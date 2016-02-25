/**
 * Created by Raphson on 2/25/16.
 */
angular.module('blogger.admin', []).config(['$stateProvider', function($stateProvider){
    $stateProvider.state('admin',{
        url: '/admin',
        controller: 'AdminController',
        templateUrl: ''
    })
}]);