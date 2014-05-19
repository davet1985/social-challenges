/* jshint  -W065 */
/* jshint  -W083 */
/* jshint  -W117 */
/* jshint  -W062 */

var fileUploadCtrl = function ($scope, $http, $timeout, $upload, $location, configService, usernameService) {
    
    'use strict';

    $scope.tags = [];
	
	$scope.username = usernameService.username();
	
	if ($scope.username === '') {
		$location.path('/login');
	}

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

        //selected files length
        $scope.selectedFilesLengthCheck = function(){
            return $scope.selectedFiles.length;
        };

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

            $scope.checkFileType = function () {
                if (
                    $files[0].type === 'image/jpeg' ||
                    $files[0].type === 'image/png'  ||
                    $files[0].type === 'image/jpg'  ||
                    $files[0].type === 'image/gif'){
                    return true;
                } else {
                    return false;
                }
            };

            if (window.FileReader && $file.type.indexOf('image') > -1) {

                if ($scope.checkFileType() === true){
                    $scope.loading = true;
                }

                var fileReader = new FileReader();
                fileReader.readAsDataURL($files[x]);
                var loadFile = function(fileReader, index) {
                    fileReader.onload = function(e) {
                        $scope.uploadFileName = function() {
                            return  $files[0].name;
                        };

                        $timeout(function() {
                            $scope.dataUrls[index] = e.target.result;
                        });

                        $scope.previewProgress = parseInt(100.0 * e.loaded / e.total);
                        
                        if (e.loaded === e.total){
                            $scope.loading = false;
                        }
                        
                    };
                }(fileReader, x);
            }
        }
       
    };

    // check to make sure the form is completely valid before post
    $scope.processForm = function(isValid){

        if (
            isValid &&
            $scope.tags.length >= 1 &&
            $scope.selectedFiles.length === 1 &&
            $scope.checkFileType() === true
            ) {
            //do post
            var index = 0;
            $scope.progressBar = 0;
            $scope.uploadId = 0;

            if ($scope.description === undefined){
                $scope.description = '';
            }
            
            $scope.upload[index] = $upload.upload({
                url : configService.API_END_POINT+'upload/add',
                method: 'POST',
                data : {
                    userid : 1, //TODO: set this properly
                    title : $scope.title,
                    description : $scope.description,
                    tags : $scope.tagsToCSV()
                },
                file: $scope.selectedFiles[index],
                fileFormDataName: 'image_file'
            }).progress(function(evt) {
                $scope.progressBar = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function(data, status, headers, config) {
                $location.path('/user/userName/uploads/' + data);// todo: get userName
            }).xhr(function(xhr){
                xhr.upload.addEventListener('abort', function(){
                    console.log('aborted complete');
                }, false);
            });

        } else{
        //show errors after form submit
            $scope.submittedError = true;
        }

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

    //check tag character length
    $scope.tagLength = function(){
        return $scope.tagsToCSV().length;
    };

};

fileUploadCtrl.$inject = ['$scope', '$http', '$timeout', '$upload', '$location', 'configService', 'usernameService'];
 