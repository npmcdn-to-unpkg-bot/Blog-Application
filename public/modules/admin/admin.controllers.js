angular.module('blogger.admin.controller', [])
    .controller('AdminController', ['$rootScope' ,'$scope', function($scope){

    }]).controller('postCreationController', ['$scope', '$state','adminService', function($scope, $state, adminService){

        $scope.buttonText = "Create";
        $scope.savePost = function(){
            $scope.buttonText = "Saving...";
            var newPost = {
                title : $scope.postz.title,
                contents : $scope.postz.content,
                tags : $scope.postz.tags,
                keywords : $scope.postz.keywords,
                permalink : $scope.postz.title.toLowerCase().replace(/[\s]/g, '-'),
                token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2Y2EyM2UzZTA5NDBmYjgyMmY4ZmQ4ZiIsInVzZXJuYW1lIjoiaWFtcmFwc2hvbiIsIm5hbWUiOiJBeWVuaSBPbHVzZWd1biIsImlhdCI6MTQ1NjYxNjE1NywiZXhwIjoxNDU2NzAyNTU3fQ.dqtrctwmaf6PXBSTmxTgYf7e7zfFBBXj7JDVMDQ0dcs'
            };


            adminService.addPost(newPost, function(status, data){
                if(status){
                    $state.go('admin.postViewAll');
                }else{
                    toastr.error("Error occurred. Creation Failed", 'Error', { timeOut: 2000 });
                }
            });
        }


    }]) .controller('postUpdateController', ['$scope', '$stateParams', '$state', 'adminService', 'toastr', function($scope, $stateParams, $state, adminService, toastr){
        $scope.buttonText = "Update";
        adminService.getEachPostDetails($stateParams.id, function(status, data){
            $scope.postz = data.post;
        });

        $scope.updatePost = function(){
            $scope.buttonText = "Updating...";
            var editedData = {
                title : $scope.postz.title,
                contents : $scope.postz.content,
                tags : $scope.postz.tags,
                keywords : $scope.postz.keywords,
                permalink : $scope.postz.title.toLowerCase().replace(/[\s]/g, '-'),
                token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2Y2EyM2UzZTA5NDBmYjgyMmY4ZmQ4ZiIsInVzZXJuYW1lIjoiaWFtcmFwc2hvbiIsIm5hbWUiOiJBeWVuaSBPbHVzZWd1biIsImlhdCI6MTQ1NjYxNjE1NywiZXhwIjoxNDU2NzAyNTU3fQ.dqtrctwmaf6PXBSTmxTgYf7e7zfFBBXj7JDVMDQ0dcs'
            };

            adminService.updateEachUserDetails($stateParams.id, editedData, function(status, data){
                if(status){
                    $state.go('admin.postViewAll');
                }else{
                    toastr.error("Error occurred. Update Failed", 'Error', { timeOut: 2000 });
                }

            })
        }

    }]).controller('postListController', ['$scope', '$state', 'adminService', 'popupService', function($scope, $state, adminService, popupService){
        adminService.getPost().then(function(response){
            $scope.posts = response.data;
        });


        $scope.deletePost = function(Post){
            if(popupService.showPopup('Really delete this')){

            }
        }
    }]).controller('LoginController', ['$rootScope', '$scope', '$localStorage', '$state', 'adminService',function($rootScope, $scope, $localStorage, $state, adminService){
        $scope.buttonText = "Login";
        $scope.login = function(){
            $scope.buttonText = "Logging In...";
            adminService.loginAdmin($scope.credentials.username, $scope.credentials.password, function(status, data){
                if(status){
                    $localStorage.blog_token = data.token;
                    $localStorage.blog_admin = data.currentUser;
                    $rootScope.currentUser = data.currentUser;
                    $state.go('admin.postViewAll');
                } else {
                    $scope.credentials = {};
                    $scope.invalidLogin = true;
                    $scope.buttonText = "Login";
                }
            });
        }
    }]);