/**
 * Created by Raphson on 2/25/16.
 */
angular.module('blogger.admin.service', []).
    factory('adminService', ['$http', function($http){
        return {
            addPost : function(post, cb){
                $http.post('/api/posts/create', post).then(function(response){
                    if(response.data.success){
                        cb(true, response.data);
                    }
                    else{
                        cb(false, response.data);
                    }
                });
            },
            getPost : function(){
                return $http.get('/api/posts');
            },
            getEachPostDetails : function(postId, cb){
                $http.get('/api/posts/' + postId).then(function(response){
                    if(response.data.success){
                       cb(true, response.data);
                    } else {
                        cb(false, response.data);
                    }
                });
            },
            updateEachUserDetails : function(postId, post, cb){
                $http.put('/api/posts/' + postId, post).then(function(response){
                    if(response.data.success){
                        cb(true, response.data);
                    } else {
                        cb(false, response.data);
                    }
                })
            }
        }
    }]).service('popupService', ['$window',function($window){
        this.showPopup = function(message){
            return $window.confirm(message);
        }
    }]);
