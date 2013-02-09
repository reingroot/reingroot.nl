define(["jquery"], function($) {
	var init = function() {
		console.log('Lazy load init');
	};

	var load = function(content) {
		$.ajax({
			type: "POST",
			url: content+"/ajax",
			data: {  },
			dataType: 'html'
		}).done(function( msg ) {
			console.log( "Data Saved: " + msg );
			$(msg).appendTo('.main-wrapper');
		});
	};

	return {
		init: init,
		load: load
	};
});