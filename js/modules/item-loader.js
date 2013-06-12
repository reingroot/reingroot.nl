define(["jquery"], function($) {
    var $itemsContainerParent,      // The main element containing the $itemsContainer amongst other elements
        $itemsContainer,            // The element containing the content item previews
        $items,                     // The content item previews
        $loadedItemContent,        // The element that is created to load the item content into
        origHeight,                 // The original height of the $itemsContainerParent
        itemsContainerState = "",   // The state of the $itemsContainer (load, resize, slideIn, slideOut, reset)
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
        $loadedItemContent = $( document.createElement('section') );
        $loadedItemContent.addClass('item-wrapper transition-height');

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

                case "":
                    cleanUp();
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

        $itemsContainerParent.addClass('no-transition');
        $itemsContainerParent.height($itemsContainerParent.height());

        origHeight =  $itemsContainerParent.height();

        // Get the height and top/bottom padding to calculate the new height
        var loadedItemContentHeight = $loadedItemContent.outerHeight(),
            itemsContainerParentHeight = $itemsContainerParent.outerHeight();

        if (loadedItemContentHeight > itemsContainerParentHeight) {
            var newHeight = $itemsContainerParent.height() + (loadedItemContentHeight -  itemsContainerParentHeight);

            // Trigger a reflow before setting the new height
            setTimeout(function() {
                $itemsContainerParent.removeClass('no-transition');
                $itemsContainerParent.height(newHeight + 'px');
            }, 0);
        } else if (loadedItemContentHeight < itemsContainerParentHeight) {
            var newHeight = $loadedItemContent.height() + (itemsContainerParentHeight - loadedItemContentHeight);

            // Trigger a reflow before setting the new height
            setTimeout(function() {
                $itemsContainerParent.removeClass('no-transition');
                $loadedItemContent.height(newHeight + 'px');
            }, 0);
        } else {
            // Trigger a reflow before setting the new height
            setTimeout(function() {
                $itemsContainerParent.removeClass('no-transition');
                $itemsContainerParent.trigger('transitionend');
            }, 0);
        }

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
        $loadedItemContent.css('left', (itemsContainerWidth + 10)+'px')
            .height('auto');

        if ($itemsContainerParent.height() > origHeight) {
            $itemsContainerParent.height(origHeight + 'px');
        } else if ($itemsContainerParent.height() === parseInt(origHeight)) {
            // If the container height does not need a reset, trigger the transitioned event manually to set the height property back to 'auto'
            $itemsContainerParent.trigger('transitionend');
        }

        setTimeout(function() { // Triggering reflow
            $loadedItemContent.removeClass('no-transition');
        }, 0);
    };

    // Cleanup the height to be set back to 'auto' facilitate resizing of the page
    var cleanUp = function() {
        $itemsContainerParent.addClass('no-transition');
        $itemsContainerParent.height('auto');

        setTimeout(function() { // Triggering reflow
            $itemsContainerParent.removeClass('no-transition');
        }, 0);
    };

	return {
		init: init,
        slideIn: slideIn,
        load: load,
        slideOut: slideOut
	};
});