var topCtrl = function ($scope, topService) {

    $scope.top = topService.top;
    topService.gettopData();

    $scope.reverseIndex = function(index, length){
        return (length - index)+1;
    };
};

topCtrl.$inject = ['$scope', 'topService'];

//reverse filter
/*
app.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});
*/