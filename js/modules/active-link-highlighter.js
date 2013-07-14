define(['jquery', 'vendor/jquery.ba-bbq.min'], function($) {

    $(window).on('hashchange', function(e) {

        var url = $.param.fragment();

        $('.main-nav ol a').each(function() {
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