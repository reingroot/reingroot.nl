define(["jquery"], function($) {
    var $itemsContainerParent,      // The main element containing the $itemsContainer amongst other elements
        $itemsContainer,            // The element containing the content item previews
        $items,                     // The content item previews
        $loadedItemContent,        // The element that is created to load the item content into
        origHeight,                 // The original height of the $itemsContainerParent
        itemsContainerState = "";   // The state of the $itemsContainer (load, resize, slideIn, slideOut, reset)


    var init = function(itemsContainerParent) {

        $itemsContainerParent = $(itemsContainerParent);
        itemsContainerWidth = $itemsContainerParent.outerWidth();

        // Get all variables from the context of the items container element
        $itemsContainer = $itemsContainerParent.find($itemsContainerParent.data('loaderContainer'));
        $items = $itemsContainer.find($itemsContainerParent.data('loaderItems'));

        // Set the items container element to position relative so we can lay the item wrapper over it
		$itemsContainerParent.css('position', 'relative');

        // Create and style the item wrapper
        $loadedItemContent = $( document.createElement('section') );
        $loadedItemContent.addClass('item-wrapper');

        // Attach the item wrapper to the container
		$itemsContainerParent.append($loadedItemContent);

        // Add eventlistner to the items container to listen if the transition is complete and we can commence slideIn
        $itemsContainerParent.on('transitionend', function(e) {
            var leftPos = parseInt($loadedItemContent.css('left'));

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
        var posLeft = parseInt($loadedItemContent.css('left'));

        if (!posLeft == 0) {
            $loadedItemContent.css('left', 0);
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
            $loadedItemContent.html(msg);

            // Activate the 'overview' link
            $loadedItemContent.find('.js-to-overview').on('click', function(e) {

               slideOut();

                e.preventDefault();
            });

            // Activate the 'next' link
            $loadedItemContent.find('.js-to-next').on('click', function(e) {

                next();

                e.preventDefault();
            });

            // Activate the 'previous' link
            $loadedItemContent.find('.js-to-previous').on('click', function(e) {

                previous();

                e.preventDefault();
            });

            if (callback) {
                setTimeout(callback, 200);
            }
		});
	};

    // Resize the element where the item is gonna be slided over
    var resize = function resize() {
        itemsContainerState = "resize";

        if (!origHeight) { origHeight =  $itemsContainerParent.height(); }

        // Get the height and top/bottom padding to calculate the new height
        var itemContentWrapperHeight = $loadedItemContent.outerHeight(),
            itemContentParentPaddingTop = parseInt($itemsContainerParent.css('paddingTop')),
            itemContentParentPaddingBottom = parseInt($itemsContainerParent.css('paddingBottom')),
            parentHeight = itemContentWrapperHeight - (itemContentParentPaddingTop + itemContentParentPaddingBottom);

        $itemsContainerParent.height(parentHeight + 'px');
    };

    // Slide the item content out of view to the left
    var slideOut = function() {
        itemsContainerState = "slideOut";
        $loadedItemContent.css('left', ((itemsContainerWidth * -1) - 10)+'px');
    };

    // Reset the container and it's items to their original position and height
    var reset = function() {
        itemsContainerState = "";

        $loadedItemContent.addClass('no-transition');
        $itemsContainerParent.height(origHeight + 'px');
        $loadedItemContent.css('left', (itemsContainerWidth + 10)+'px');

        setTimeout(function() { // Triggering reflow
            $loadedItemContent.removeClass('no-transition');
        }, 0);
    };

	return {
		init: init,
        slideIn: slideIn,
        load: load,
        slideOut: slideOut
	};
});