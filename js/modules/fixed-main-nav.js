define(['jquery', 'vendor/viewport'], function($) {
    var headerFixed = false,
        $mainNav    = $('header .main-nav');

    $(window).on('scroll', function() {
        setTimeout(function() {
            var $headerVisible   = $('header:in-viewport'),
                $headerHidden    = $('header:above-the-top');

            if (!headerFixed && $headerHidden.length) {

                $headerHidden.height('157');
                $mainNav.wrap('<div></div>')
                            .parent()
                            .css('top', '-' + $mainNav.outerHeight() + 'px');

                setTimeout(function() {
                    $mainNav.parent().addClass('fixed-nav').css('top', '0');
                    headerFixed = true;
                }, 0);

            } else if (headerFixed && $headerVisible.length) {
                $headerVisible.height('auto');
                $mainNav.unwrap();
                headerFixed = false;
            }

        }, 200);
    });

    $(window).triggerHandler('scroll');
});