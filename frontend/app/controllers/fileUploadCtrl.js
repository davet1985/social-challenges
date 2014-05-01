/* jshint  -W065 */
/* jshint  -W083 */
/* jshint  -W117 */
var fileUploadCtrl = function ($scope, $upload) {

    $scope.onFileSelect = function($files) {
        $scope.fileReaderSupported = window.FileReader != null;
        
        for (var i = 0; i < $files.length; i++) {

            var file = $files[i];
            $scope.selectedFiles = [];
            $scope.selectedFiles = $files;
            $scope.upload = $upload.upload({
                url: 'upload',
                headers: {'my-header': 'my-header-value'},
                data: {myObj: $scope.myModelObj},
                file: file
            }).progress(function(evt) {
          
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
  
      
            }).success(function(data, status, headers, config) {
            // file is uploaded successfully
                console.log(data);
            });

        }
    };

};

fileUploadCtrl.$inject = ['$scope', '$upload'];
 