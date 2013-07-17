define(['jquery', 'vendor/viewport'], function($) {
    var headerFixed = false;

    $(window).on('scroll', function() {
        setTimeout(function() {
            var $headerVisible   = $('header:in-viewport'),
                $headerHidden    = $('header:above-the-top');

            if (!headerFixed && $headerHidden.length) {
                $headerHidden.height('157')
                                .find('.main-nav').addClass('fixed');
                headerFixed = true;
            } else if (headerFixed && $headerVisible.length) {
                $headerVisible.height('auto')
                                .find('.main-nav').removeClass('fixed');
                headerFixed = false;
            }

        }, 100);
    });

    $(window).triggerHandler('scroll');
});