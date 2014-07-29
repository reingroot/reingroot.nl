define(["ven/jquery"], function ($) {
    "use strict";

    var wrapperSize = '970px',// The size of the main content wrapper element
        $itemsContainerParent,      // The main element containing the $itemsContainer amongst other elements
        $itemsContainer,            // The element containing the content item previews
        $items,                     // The content item previews
        $loadedItemContent,         // The element that is created to load the item content into
        origHeight,                 // The original height of the $itemsContainerParent
        itemsContainerState = "",   // The state of the $itemsContainer (load, resize, slideIn, slideOut, reset)
        $runningLoader = false;             // The current element that has an ajax spinner

    var init = function (itemsContainerParent) {

        $itemsContainerParent = $(itemsContainerParent);

        // Get all variables from the context of the items container element
        origHeight =  $itemsContainerParent.height();
        $itemsContainer = $itemsContainerParent.find($itemsContainerParent.data('loaderContainer'));
        $items = $itemsContainer.find($itemsContainerParent.data('loaderItems'));

        // Set the items container element to position relative so we can lay the item wrapper over it
        $itemsContainerParent.css('position', 'relative');

        // Create and style the item wrapper
        $loadedItemContent = $('<section></section>')
                                .addClass('item-wrapper');

        // Attach the item wrapper to the container
        $itemsContainerParent.append($loadedItemContent);

        // Add eventlistner to the items container to listen if the transition is complete and we can commence slideIn
        $itemsContainerParent.on('webkitTransitionEnd transitionend transitionEnd msTransitionEnd oTransitionEnd', function () {

            switch (itemsContainerState) {

            case "resize":
                $runningLoader.find('.ajax-loading').remove();
                $runningLoader = false;

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

        // Use the Ajax endpoint instead of the static endpoint when using javascript
        $items.on('click', function (e) {
            var $this = $(this),
                href = $this.find('a').attr('href');

            $this.append('<span class="ajax-loading"></span>');
            $runningLoader = $this;

            // Call the slide in action
            load(href, resize);

            e.preventDefault();
        });


        // Reset the original height when resizing the window
        // TODO: this is not working as expected because it does not know the 'original size' as it is already 'resized' :( Some more thinking to do
        var resizeTimer;
        $(window).on('resize', function () {
            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(function () {
                origHeight =  $itemsContainerParent.height();
            }, 500);

        });
    };

    // Slide the new content into view from the right
    var slideIn = function () {
        itemsContainerState = "slideIn";
        var posLeft = parseInt($loadedItemContent.css('left'), 10);

        if (posLeft !== 0) {
            $loadedItemContent.css('left', 0);
        }
    };

    // Load the requested content
    var load = function (url, callback) {
        // Replace the default href with the ajax version
        var reg = /\/(item)\//;
        url = url.replace(reg, "/ajax_$1/");

        $.ajax({
            type: "POST",
            url: url,
            data: {  },
            dataType: 'html',
            beforeSend: function () {
                if (!$runningLoader) {
                    $itemsContainerParent.append('<span class="ajax-loading"></span>');
                    $runningLoader = $itemsContainerParent;
                }
            }
        }).done(function (msg) {
            $loadedItemContent.html(msg);

            // Activate the 'back to overview' link
            $loadedItemContent.find('.js-to-overview').on('click', function (e) {

                slideOut();

                e.preventDefault();
            });

            // Activate the 'next' link
            $loadedItemContent.find('.js-to-next').on('click', function (e) {
                var $this = $(this);
                var href = $this.attr('href');

                load(href, resize);


                e.preventDefault();
            });

            // Activate the 'previous' link
            $loadedItemContent.find('.js-to-previous').on('click', function (e) {
                var $this = $(this);
                var href = $this.attr('href');

                load(href, resize);

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

        // Make sure this element doesn't transition when setting sizes explicitly in preparation to transitioning to a new value
        $itemsContainerParent.addClass('no-transition');

        // Set the height explicitly so it doesn't jump when transitioning
        $itemsContainerParent.height($itemsContainerParent.height());

        var newHeight;

        // Get the height and top/bottom padding to calculate the new height
        var loadedItemContentHeight = $loadedItemContent.outerHeight(),
            itemsContainerParentHeight = $itemsContainerParent.outerHeight(),
            itemsContainerParentInnerHeight = $itemsContainerParent.height();

        if (loadedItemContentHeight > itemsContainerParentHeight) {

            var padding = itemsContainerParentHeight - itemsContainerParentInnerHeight;
            newHeight = loadedItemContentHeight  - padding;

            // Trigger a reflow before setting the new height
            setTimeout(function () {
                $itemsContainerParent.removeClass('no-transition');

                $itemsContainerParent.height(newHeight + 'px');

                // If there is no transitionend event, trigger it manually
                if (!_transitionEndExists()) {
                    $itemsContainerParent.triggerHandler('transitionend');
                }
            }, 0);
        } else if (loadedItemContentHeight < itemsContainerParentHeight) {
            // Make sure this element doesn't transition when setting sizes explicitly in preparation to transitioning to a new value
            $loadedItemContent.addClass('no-transition');

            // Set the current height explicitly before transitioning to the new height
            $loadedItemContent.height(loadedItemContentHeight);

            newHeight = loadedItemContentHeight + (itemsContainerParentHeight - loadedItemContentHeight);

            // Trigger a reflow before setting the new height
            setTimeout(function () {
                $loadedItemContent.removeClass('no-transition');
                $itemsContainerParent.removeClass('no-transition');

                $loadedItemContent.height(newHeight + 'px');

                // If there is no transitionend event, trigger it manually
                if (!_transitionEndExists()) {
                    $itemsContainerParent.triggerHandler('transitionend');
                }
            }, 0);
        } else {
            // Trigger a reflow before setting the new height
            setTimeout(function () {
                $itemsContainerParent.removeClass('no-transition');
                $itemsContainerParent.triggerHandler('transitionend');

            }, 0);
        }

    };

    // Slide the item content out of view to the left
    var slideOut = function () {
        itemsContainerState = "slideOut";

        var itemsContainerWidth = $itemsContainerParent.outerWidth();
        $loadedItemContent.css('left', ((itemsContainerWidth * -1) - 10) + 'px');

        // If there is no transitionend event, trigger it manually
        if (!_transitionEndExists()) {
            $itemsContainerParent.triggerHandler('transitionend');
        }
    };

    // Reset the container and it's items to their original position and height
    var reset = function () {
        itemsContainerState = "";

        $loadedItemContent.addClass('no-transition');
        $loadedItemContent.css('left', wrapperSize)
            .height('auto');

        if ($itemsContainerParent.height() > origHeight) {
            $itemsContainerParent.height(origHeight + 'px');

            // If there is no transitionend event, trigger it manually
            if (!_transitionEndExists()) {
                $itemsContainerParent.triggerHandler('transitionend');
            }
        } else if ($itemsContainerParent.height() === parseInt(origHeight, 10)) {
            // If the container height does not need a reset, trigger the transitioned event manually to set the height property back to 'auto'
            $itemsContainerParent.triggerHandler('transitionend');
        }

        setTimeout(function () { // Triggering reflow
            $loadedItemContent.removeClass('no-transition');
        }, 0);
    };

    // Cleanup the height to be set back to 'auto' facilitate resizing of the page
    var cleanUp = function () {
        $itemsContainerParent.addClass('no-transition');
        $itemsContainerParent.height('auto');

        setTimeout(function () { // Triggering reflow
            $itemsContainerParent.removeClass('no-transition');
        }, 0);
    };

    var _transitionEndExists = function () {
        if ('ontransitionend' in window) {
            return true;
        } else if ('onwebkittransitionend' in window) {
            return true;
        } else if ('onotransitionend' in window) {
            return true;
        } else {
            return ('onmstransitionend' in window);
        }
    };

    return {
        init: init,
        slideIn: slideIn,
        load: load,
        slideOut: slideOut
    };
});