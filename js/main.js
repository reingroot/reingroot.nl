require(["jquery"], function($) {

    // On DOM load
    $(function() {

        require(["modules/lazy-load", "modules/item-loader"], function(lazyLoad, portfolioItemLoader) {
            //	lazyLoad.init();
            //	lazyLoad.load('services');

            portfolioItemLoader.init('.js-item-loader');

        });

        // Set toggle event handler
        $('.js-toggle').on('click', function toggleElementClass(e) {
            // Memoization
            if (!toggleElementClass.$this) { toggleElementClass.$this = $(this); }
            if (!toggleElementClass.toggleClass) { toggleElementClass.toggleClass = toggleElementClass.$this.data('toggleClass'); }
            if (!toggleElementClass.$toggleElement) { toggleElementClass.$toggleElement = $(toggleElementClass.$this.data('toggleElement')); }

            toggleElementClass.$toggleElement.toggleClass(toggleElementClass.toggleClass);

            e.preventDefault();
        });

        // Font Deck settings and initiation
        var WebFontConfig = { fontdeck: { id: '29454' } };
        (function() {
            var wf = document.createElement('script');
            wf.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        }());
    });
});