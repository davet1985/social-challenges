/* jshint  -W065 */
/* jshint  -W083 */
/* jshint  -W117 */
/* jshint  -W062 */

var fileUploadCtrl = function ($scope, $http, $timeout, $upload, $location) {
    
    'use strict';

    $scope.tags = [];

    $scope.fileReaderSupported = window.FileReader != null;
    $scope.changeAngularVersion = function() {
        window.location.hash = $scope.angularVersion;
        window.location.reload(true);
    };
    $scope.hasUploader = function(index) {
        return $scope.upload[index] != null;
    };
    $scope.abort = function(index) {
        $scope.upload[index].abort();
        $scope.upload[index] = null;
    };
    $scope.angularVersion = window.location.hash.length > 1 ? window.location.hash.substring(1) : '1.2.0';

    $scope.onFileSelect = function($files) {
        $scope.selectedFiles = [];
        if ($scope.upload && $scope.upload.length > 0) {
            for (var i = 0; i < $scope.upload.length; i++) {
                if ($scope.upload[i] != null) {
                    $scope.upload[i].abort();
                }
            }
        }
        $scope.upload = [];
        $scope.uploadResult = [];
        $scope.selectedFiles = $files;
        $scope.dataUrls = [];
        for ( var x = 0; x < $files.length; x++) {
            var $file = $files[x];
            if (window.FileReader && $file.type.indexOf('image') > -1) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($files[x]);
                var loadFile = function(fileReader, index) {
                    fileReader.onload = function(e) {
                        $timeout(function() {
                            $scope.dataUrls[index] = e.target.result;
                        });
                    };
                }(fileReader, x);
            }
        }
    };

    $scope.processForm = function() {
        var index = 0;
        $scope.progressBar = 0;
        $scope.upload[index] = $upload.upload({
            url : 'http://localhost:9292/upload/add',
            method: 'POST',
            data : {
                userid : 1, //TODO: set this properly
                title : $scope.title,
                description : $scope.description,
                tags : $scope.tagsToCSV()
            },
            file: $scope.selectedFiles[index],
            fileFormDataName: 'image_file'
        }).then(function(response) {
            $scope.uploadResult.push(response.data);
        }, null, function(evt) {
            $scope.progressBar = parseInt(100.0 * evt.loaded / evt.total);
            if (evt.loaded === evt.total){
                $location.path('/user/userName/uploads/1');// todo: get upload id and replace with hardcoded value "1"
            }

        }).xhr(function(xhr){
            xhr.upload.addEventListener('abort', function(){
                console.log('aborted complete');
            }, false);
        });
    };

    // TODO: create a tag service to handle stuff like this and inject it into this controller
    $scope.tagsToCSV = function() {
        var tags = $scope.tags;
        var tagsCSV = '';
        for (var i = 0; i < tags.length; i++) {
            tagsCSV += tags[i].text;
            if (i < tags.length-1) {
                tagsCSV += ',';
            }
        }
        return tagsCSV;
    };

};

fileUploadCtrl.$inject = ['$scope', '$http', '$timeout', '$upload', '$location'];
 