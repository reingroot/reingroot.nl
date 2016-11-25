requirejs.config({
    'paths': {
        'ven': 'vendor',
        'mods': 'modules'
    },
    'shim': {
        'ven/jquery.ba-bbq.min': ['ven/jquery'],
        'ven/jquery.ba-bbq': ['ven/jquery'],
        'ven/viewport': ['ven/jquery']
    }
});

require(['ven/jquery', 'mods/item-loader', 'mods/active-link-highlighter'], function ($, portfolioItemLoader) {
    "use strict";

    // On DOM load
    $(function () {
        require(['mods/fixed-main-nav'], function () {

            portfolioItemLoader.init('.js-item-loader');

        });

        // Set toggle event handler
        $('.js-toggle').on('click', function toggleElementClass(e) {
            if (!toggleElementClass.$this) { toggleElementClass.$this = $(this); }
            if (!toggleElementClass.toggleClass) { toggleElementClass.toggleClass = toggleElementClass.$this.data('toggleClass'); }
            if (!toggleElementClass.$toggleElement) { toggleElementClass.$toggleElement = $(toggleElementClass.$this.data('toggleElement')); }

            toggleElementClass.$toggleElement.toggleClass(toggleElementClass.toggleClass);

            e.preventDefault();
        });

        // Font Deck settings and initiation
		window.WebFontConfig = { fontdeck: { id: '29454' } };
		(function () {
			var wf = document.createElement('script');
			wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
			'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
			wf.type = 'text/javascript';
			wf.async = 'true';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(wf, s);
		})();
    });
});
