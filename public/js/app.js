angular.module('bloggerApp', ['ui.router', 'toastr', 'ngStorage', 'blogger.posts', 'blogger.admin']).run(['$state',function($state){
    $state.go('allPosts');
}]).factory('authInterceptor', ['$q', '$localStorage', '$injector', function($q, $localStorage, $injector){
    return {
        request : function(config){
            config.headers = config.headers || {};
            var token = $localStorage.blog_token;

            if(token){
                config.headers["x-access-token"] = token;
            }
            return config;
        },
        responseError : function(response){
            if(response.status == 401){
                var stateService = $injector.get('$state');
                stateService.go('login');
                //$state.go('login');
            }
            return $q.reject(response);
        }
    }
}]).config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
});