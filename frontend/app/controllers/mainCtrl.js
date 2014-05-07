var mainCtrl = function ($scope, $location) {


    $scope.pageId = $location.path().split('/')[2]||'Unknown';

    //console.log('page id = '+$scope.pageId);
};

mainCtrl.$inject = ['$scope', '$location'];
