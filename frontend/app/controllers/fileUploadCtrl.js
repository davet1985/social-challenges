/* jshint  -W065 */
/* jshint  -W083 */
/* jshint  -W117 */
/* jshint  -W062 */
/* jshint  -W089 */

var fileUploadCtrl = function ($scope, $http, $timeout, $upload, $location, configService, usernameService, tagCloudService, data) {
    
    'use strict';
    $scope.apikey = 'AIzaSyCK4uFum6_DUKD65-RuaMgVe6hnT_E9G1s';

    $scope.tags = [];

	$scope.currentFields = '';
	
    $scope.username = usernameService.username();
	$scope.userId = usernameService.id();
	
	if ($scope.username === undefined) {
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
                        
                        $scope.uploadFileName = $files[0].name;
                        
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
            $scope.currentFields === 'image' &&
            isValid &&
            $scope.tags.length >= 1 &&
            $scope.selectedFiles.length === 1 &&
            $scope.checkFileType() === true ||
            $scope.currentFields === 'video' &&
            isValid &&
            $scope.tags.length >= 1 &&
            $scope.checkYoutubeTotalResults !== 0
            ) {
            //do post
            //alert('yes');
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
                    userid : $scope.userId,
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
            //alert('Noooooooo!');

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

    $scope.drawFields = function (type) {
        //clear fields and setpristine
        $scope.title = '';
        $scope.description = '';
        $scope.tags = '';
        $scope.youtube = '';
        $scope.selectedFiles = '';
        $scope.uploadFileName = '';
        $scope.youtubeThumb = '';
        $scope.selectedFilesLengthCheck = undefined;
        $scope.uploadForm.$setPristine();
        
        if (type === 'image'){
            $scope.currentFields = 'image';
            $scope.youtubeError = false;
        }
        if (type === 'video'){
            $scope.currentFields = 'video';
        }
       
    };

    $scope.getYoutubeData = function(youtube){
        
        //strip the url
        $scope.getURLParam = function ( name ){
            var url = youtube;
            var needle = '?v=';
            if (url.indexOf(needle) >= 0) {
                var query_string = url.split('?');
                var params = query_string[1].split('&');
                var i = 0;
                while (i < params.length) {
                    var param_item = params[i].split('=');
                    if (param_item[0] === name) {
                        return param_item[1];
                    }
                    i++;
                }
                return '';

            } else {
                $scope.youtubeError = true;
            }
        };

        var youtubeId = $scope.getURLParam('v');
        
        $http({method: 'GET', url: 'https://www.googleapis.com/youtube/v3/videos?id='+youtubeId+'&key='+$scope.apikey+'&part=snippet,contentDetails,statistics,status'}).
        success(function(data) {
 
            $scope.checkYoutubeTotalResults = JSON.parse(JSON.stringify(data.pageInfo.totalResults));

            if ($scope.checkYoutubeTotalResults !== 0 ){
                $scope.title = JSON.parse(JSON.stringify(data.items[0].snippet.title));
                $scope.description = JSON.parse(JSON.stringify(data.items[0].snippet.description));
                $scope.youtubeThumb = JSON.parse(JSON.stringify(data.items[0].snippet.thumbnails.high.url));
                $scope.youtubeError = false;
                $scope.tags = [{text: 'get youtube category'}];
            } else {
                $scope.title = '';
                $scope.description = '';
                $scope.youtubeThumb = '';
                $scope.youtubeError = true;
            }
        }).
        error(function(data) {
            //do something with error
            alert('oops!');

        });
    };

    //to do: get user region code then get youtube catogries and map to populate tag
    //console.log('https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=GB&key='+$scope.apikey);

    //autocomplete
    $scope.loadItems = function($query) {
        return data.search($query);
    };

};

fileUploadCtrl.$inject = ['$scope', '$http', '$timeout', '$upload', '$location', 'configService', 'usernameService' , 'tagCloudService', 'data'];
 