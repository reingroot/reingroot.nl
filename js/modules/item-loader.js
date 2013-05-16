define(["jquery"], function($) {
    var $itemsContainerParent,
        $itemsContainer,
        $items,
        $itemContentWrapper,
        origHeight,
        itemsContainerState = "",
        itemsContainerWidth;

    var init = function(itemsContainerParent) {

        $itemsContainerParent = $(itemsContainerParent);
        itemsContainerWidth = $itemsContainerParent.outerWidth();

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

            switch (itemsContainerState) {

                case "resize":
                    slideIn();
                    break;

                case "slideOut":
                    reset();
                    break;

            }
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
        itemsContainerState = "slideIn";
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

                next();

                e.preventDefault();
            });

            // Activate the 'previous' link
            $itemContentWrapper.find('.js-to-previous').on('click', function(e) {

                previous();

                e.preventDefault();
            });

            if (callback) {
                setTimeout(callback, 0);
            }
		});
	};

    // Resize the element where the item is gonna be slided over
    var resize = function resize() {
        itemsContainerState = "resize";
        if (!origHeight) { origHeight =  $itemsContainerParent.height(); }

        // Get the height and top/bottom padding to calculate the new height
        var itemContentWrapperHeight = $itemContentWrapper.height(),
            itemContentParentPaddingTop = parseInt($itemsContainerParent.css('paddingTop')),
            itemContentParentPaddingBottom = parseInt($itemsContainerParent.css('paddingBottom')),
            parentHeight = itemContentWrapperHeight - (itemContentParentPaddingTop + itemContentParentPaddingBottom);

        $itemsContainerParent.height(parentHeight + 'px');
    };

    // Slide the item content out of view to the left
    var slideOut = function() {
        itemsContainerState = "slideOut";
        $itemContentWrapper.css('left', ((itemsContainerWidth * -1) - 10)+'px');

        console.log(((itemsContainerWidth * -1) - 10));
    };

    // Reset the container and it's items to their original position and height
    var reset = function() {
        itemsContainerState = "";

        $itemContentWrapper.addClass('no-transition');
        $itemsContainerParent.height(origHeight + 'px');
        $itemContentWrapper.css('left', (itemsContainerWidth + 10)+'px');

        setTimeout(function() {
            $itemContentWrapper.removeClass('no-transition');
        }, 500);
    };

	return {
		init: init,
        slideIn: slideIn,
        load: load,
        slideOut: slideOut
	};
});