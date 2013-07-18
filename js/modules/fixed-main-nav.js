define(['jquery', 'vendor/viewport'], function($) {
    var headerFixed = false,
        $mainNav    = $('header .main-nav');

    $(window).on('scroll', function() {
        setTimeout(function() {
            var $headerVisible   = $('header:in-viewport'),
                $headerHidden    = $('header:above-the-top');

            if (!headerFixed && $headerHidden.length) {

                $headerHidden.height('157');
                $mainNav.css('top', '-' + $mainNav.outerHeight() + 'px');

                setTimeout(function() {
                    $mainNav.css('top', '0').addClass('fixed');
                    headerFixed = true;
                }, 0);

            } else if (headerFixed && $headerVisible.length) {
                $headerVisible.height('auto');
                $mainNav.removeClass('fixed');
                headerFixed = false;
            }

        }, 200);
    });

    $(window).triggerHandler('scroll');
});