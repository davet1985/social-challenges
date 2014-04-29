$(function() {

/* add custom js here */

    // jQuery UI Sliders
	var $slider = $('#slider');
	
	if ($slider.length) {
		$slider.slider({
			min: 1,
			max: 5,
			value: 2,
			orientation: 'horizontal',
			range: 'min'
		}).addSliderSegments($slider.slider('option').max);
	}
});