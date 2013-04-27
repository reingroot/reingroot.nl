define(["jquery"], function($) {
	var init = function() {
		console.log('Item loader init');

		var $itemsContainer = $('.js-item-loader'),
			itemsContainerHeight = $itemsContainer.height();

		$itemsContainer.css('position', 'relative');

		var $itemWrapper = $( document.createElement('div') );
		$itemWrapper.css("height", itemsContainerHeight)
				.addClass('item-wrapper');

		$itemsContainer.append($itemWrapper);
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