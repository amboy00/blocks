(function($){
	
	function orientate() {
		
		if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
			var viewportmeta = document.querySelector('meta[name="viewport"]');
			if (viewportmeta) {
				
				if (window.orientation == 90 || window.orientation == -90) {
					viewportmeta.content = 'width=480, initial-scale=1';
				} else {
					viewportmeta.content = 'width=320, initial-scale=1';
				}
				
			}
		}
	
	}
	
// The DOM is now ready
$(function() {

	window.onorientationchange = orientate();

	$('#pageTab').toggle( 
		function() {
			$('#pageHeader').animate({height: '275px'});
		},
		function() {
			$('#pageHeader').animate({height: '70px'});
		}
	);
	
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { 
			// $('#modalClose').click(); 
		} 
		
	});
	
	
	$(function(){
		
		
		
	});
	
	
});

})( jQuery.noConflict() ); // Pass in jQuery so we can safely use the $ alias within this block
