define(['jquery', 'vendor/viewport'], function ($) {

    "use strict";

    var headerFixed     = false,
        sideNavActive   = false,
        $mainWrapper    = $('.main-wrapper'),
        $mainNav        = $('header .main-nav'),
        $homeLink       = $mainNav.find('.rg-logo'),
        $mainNavOrgParent = $mainNav.parent(),
        $taglineEl      = $('.tagline');

    $(window).on('scroll', function () {
        setTimeout(function () {
            var $headerVisible   = $('header:in-viewport'),
                $headerHidden    = $('header:above-the-top');

            if (Modernizr.mq('screen and (min-width: 481px)') && !headerFixed && $headerHidden.length) {

                $headerHidden.height($headerHidden.outerHeight());
                $mainNav.wrap('<div></div>')
                            .parent()
                            .css('top', '-' + $mainNav.outerHeight() + 'px');

                setTimeout(function () {
                    $mainNav.parent().addClass('fixed-nav').css('top', '0');
                    headerFixed = true;
                }, 0);

            } else if (Modernizr.mq('screen and (min-width: 481px)') && headerFixed && $headerVisible.length) {
                $headerVisible.height('auto');
                $mainNav.unwrap();
                headerFixed = false;
            }

        }, 200);
    });
    $(window).triggerHandler('scroll');

    $(window).on('resize', function () {
        setTimeout(function () {
            if (!sideNavActive && Modernizr.mq('screen and (max-width: 480px)')) {
                $('body').prepend($mainNav);

                // Move the content to the side to show the navigation
                $taglineEl.on('click', function () {
                    $mainWrapper.toggleClass('open');
                });

                $homeLink.on('click', function (e) {
                    $mainWrapper.toggleClass('open');

                    e.preventDefault();
                });

                sideNavActive = true;
            } else if (sideNavActive && Modernizr.mq('screen and (min-width: 481px)')) {
                $($mainNavOrgParent).prepend($mainNav);
                $taglineEl.off('click');

                sideNavActive = false;
            }
        }, 200);
    });
    $(window).triggerHandler('resize');
});