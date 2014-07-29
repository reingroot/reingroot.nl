define(['ven/jquery', 'ven/jquery.ba-bbq'], function ($) {
    "use strict";

    $(window).on('hashchange', function () {

        var url = $.param.fragment();

        $('.main-nav ol a').each(function () {
            var href = $(this).attr('href');

            // Strip the '#' from the href
            var reg = /\#/;
            href = href.replace(reg, '');

            if (href === url) {
                $(this).addClass('current');
            } else {
                $(this).removeClass('current');
            }
        });
    });

    $(window).trigger('hashchange');

});