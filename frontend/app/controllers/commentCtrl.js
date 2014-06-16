var commentCtrl = function ($scope, $location, $http, commentService, $timeout, $window) {

    $scope.submitComment = function(isValid, prevId, currentId) {
        if (isValid){
            // save the comment. pass in comment data from the form
            // use the function we created in our service
            //console.log($scope.comment);
            commentService.save($scope.comment, currentId)
            .success(function(data) {
                //$route.reload();
                //console.log(data);
                
                $scope.userTag = data[data.length - 1][1];
                $scope.userComment = data[data.length - 1][2];
                $scope.userCommentTime = data[data.length - 1][3];
                
                $timeout(function() {
                    $scope.commentMessage = '';
                }, 3500);
                $scope.commentMessage = 'Your comment is submitted';
                
                $window.jQuery('ul.comment').append('<li><div class="comment-avatar"><a href="#"><img gravatar-src="'+$scope.userTag+'" class="profileThumb" gravatar-size="60"></a></div><div class="comment-body"><div class="fa fa-play fa-flip-horizontal comment-triangle"></div><p>'+$scope.userComment+'</p></div><p class="comment-info pull-right"><a href="#">'+$scope.userTag+'</a> on '+$scope.userCommentTime+'</p></li>');

                $scope.submittedError = false;

                $scope.comment = '';
                $scope.commentForm.$setPristine();
    
            })
            .error(function(data) {
                console.log(data);
            });

        } else{
            //console.log('error');
            $scope.submittedError = true;

        }
    };

};

commentCtrl.$inject = ['$scope', '$location', '$http', 'commentService', '$timeout', '$window'];