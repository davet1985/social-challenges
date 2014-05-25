/* jshint -W117 */
/* jshint -W065 */

var cropCtrl = function ($scope, $location, $window, fileReader, $timeout) {
	
    console.log('fileReader' +fileReader);

    $scope.file = {};
    $scope.getFile = function () {
		console.log('getFile() called.');
		console.log($scope.ajModel);
		console.log($scope.file);
		$scope.progress = 0;
		fileReader.readAsDataUrl($scope.file.file, $scope).then(function (result) {
			console.log('readAsDataUrl: result.length === ', result.length);
			console.log(result);
			$scope.imageSrc = result;
			$scope.imageSrc = result;
			$timeout(function () {
				$scope.initJcrop();
			});
		});
	};

	$scope.$on('fileProgress', function(e, progress) {
		$scope.progress = progress.loaded / progress.total;
		console.log($scope.progress);
	});

	$scope.initJcrop = function () {
		console.log('init jcrop');
		$window.jQuery('img').Jcrop({
			onSelect: function () {
				//$scope.$apply();
				console.log('onSelect', arguments);
			},
			onChange: function () {
				//$scope.$apply();
				console.log('onChange', arguments);
			},
			trackDocument: true,
			aspectRatio: 1.666666666
		});
	};


	$scope.cropOpts = {
		ratioW: 1,
		ratioH: 1
	};
	$scope.selected = function(cords) {
		var scale;
		$scope.picWidth = cords.w;
		$scope.picHeight = cords.h;

		console.log('scale');
		if ($scope.picWidth > 400) {
			scale = (400 / $scope.picWidth);
			console.log($scope.picHeight);
			$scope.picHeight *= scale;
			$scope.picWidth *= scale;
			console.log(scale);
		}

		if ($scope.picHeight > 400) {
			scale = (400 / $scope.picHeight);
			$scope.picHeight *= scale;
			$scope.picWidth *= scale;
			console.log(scale);
		}

		console.log('[cords]', $scope.picWidth / $scope.picHeight);
		console.log(cords);
		$scope.cropped=true;
		var rx = $scope.picWidth / cords.w;
		var ry = $scope.picHeight / cords.h;
		var imageObj = $window.jQuery('#preview')[0];

		$window.jQuery('img#preview').css({
			width: Math.round(rx * cords.bx) + 'px',
			height: Math.round(ry * cords.by) + 'px',
			marginLeft: '-' + Math.round(rx * cords.x) + 'px',
			marginTop: '-' + Math.round(ry * cords.y) + 'px'
		});
		

	};
	

};

cropCtrl.$inject = ['$scope', '$location', '$window', 'fileReader', '$timeout'];