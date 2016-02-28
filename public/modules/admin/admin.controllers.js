angular.module('blogger.admin.controller', [])
    .controller('AdminController', ['$scope', function($scope){

    }]).controller('postCreationController', ['$scope', '$state', 'adminService', function($scope, $state, adminService){

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
                alert(data.message);
            });
            /*$scope.post.$save(function(){
                $state.go('admin.postViewAll');
            })*/
        }


    }]).controller('postUpdateController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state){
        //$scope.post = Post.get({id : $stateParams.id});
        $scope.buttonText = "Update";

        //$scope.updatePost = function(){
        //    $state.go('admin.postViewAll');
        //}

    }]).controller('postListController', ['$scope', 'popupService', '$state', function($scope, popupService, $state){
        //$scope.posts = Post.query();

        /*$scope.deletePost = function(Post){
            if(popupService.showPopup('Really delete this')){
                post.$delete(function(){
                    $state.go('admin.postViewAll', undefined , {
                        reload: true
                    });
                });
            }
        }*/
    }]);