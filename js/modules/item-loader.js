define(["jquery"], function($) {
    var $itemsContainerParent,
        $itemsContainer,
        $items,
        $itemContentWrapper;

    var init = function(itemsContainerParent) {

        $itemsContainerParent = $(itemsContainerParent);

        // Get all variables from the context of the items container element
        $itemsContainer = $itemsContainerParent.find($itemsContainerParent.data('loaderContainer'));
        $items = $itemsContainer.find($itemsContainerParent.data('loaderItems'));

        // Set the items container element to position relative so we can lay the item wrapper over it
		$itemsContainerParent.css('position', 'relative');

        // Create and style the item wrapper
        $itemContentWrapper = $( document.createElement('section') );
        $itemContentWrapper.addClass('item-wrapper');

        // Attach the item wrapper to the container
		$itemsContainerParent.append($itemContentWrapper);

        // Add eventlistner to the items container to listen if the transition is complete and we can commence slideIn
        $itemsContainerParent.on('transitionend', function(e) {
            var leftPos = parseInt($itemContentWrapper.css('left'));

            if (leftPos > 0) { slideIn(); }
        });

        // Attach eventlisteners to the items
        $items.on('click', function itemHandler(e) {
            var $this = $(this),
                href = $this.find('a').attr('href');

            // Replace the default href with the ajax version
            var reg = /\/(item)\//;
            href = href.replace(reg, "/ajax_$1/");

            // Call the slide in action
            load(href, resize);

            e.preventDefault();
        });
	};

    // Slide the new content into view from the right
    var slideIn = function() {
        var posLeft = parseInt($itemContentWrapper.css('left'));
        if (!posLeft == 0) {
            $itemContentWrapper.css('left', 0);
        }
    };

    // Load the requested content
	var load = function(url, callback) {
		$.ajax({
			type: "POST",
			url: url,
			data: {  },
			dataType: 'html'
		}).done(function( msg ) {
            $itemContentWrapper.html(msg);

            // Activate the 'overview' link
            $itemContentWrapper.find('.js-to-overview').on('click', function(e) {

               slideOut();

                e.preventDefault();
            });

            // Activate the 'next' link
            $itemContentWrapper.find('.js-to-next').on('click', function(e) {

                e.preventDefault();
            });

            // Activate the 'previous' link
            $itemContentWrapper.find('.js-to-previous').on('click', function(e) {

                e.preventDefault();
            });

            if (callback) {
                setTimeout(callback, 500);
            }
		});
	};

    // Resize the element where the item is gonna be slided over
    var resize = function() {

        // Get the height and top/bottom padding to calculate the new height
        var itemContentWrapperHeight = $itemContentWrapper.height(),
            itemContentParentPaddingTop = parseInt($itemsContainerParent.css('paddingTop')),
            itemContentParentPaddingBottom = parseInt($itemsContainerParent.css('paddingBottom')),
            parentHeight = itemContentWrapperHeight - (itemContentParentPaddingTop + itemContentParentPaddingBottom);

        $itemsContainerParent.height(parentHeight + 'px');
    };

    // Slide the item content out of view to the left
    var slideOut = function() {
        $itemContentWrapper.css('left', -970);
    };

	return {
		init: init,
        slideIn: slideIn,
        load: load,
        slideOut: slideOut
	};
});