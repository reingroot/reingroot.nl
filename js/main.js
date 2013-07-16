requirejs.config({
    'shim': {
        'vendor/jquery.ba-bbq.min': ['jquery'],
        'vendor/jquery.ba-bbq': ['jquery']
    }
});

require(['jquery', 'modules/active-link-highlighter'], function($) {

    // On DOM load
    $(function() {
        require(['modules/item-loader'], function(portfolioItemLoader) {

            portfolioItemLoader.init('.js-item-loader');

        });

        // Set toggle event handler
        $('.js-toggle').on('click', function toggleElementClass(e){
            if (!toggleElementClass.$this) toggleElementClass.$this = $(this);
            if (!toggleElementClass.toggleClass) toggleElementClass.toggleClass = toggleElementClass.$this.data('toggleClass');
            if (!toggleElementClass.$toggleElement) toggleElementClass.$toggleElement = $(toggleElementClass.$this.data('toggleElement'));

            toggleElementClass.$toggleElement.toggleClass(toggleElementClass.toggleClass);

            e.preventDefault();
        });

        // Font Deck settings and initiation
		WebFontConfig = { fontdeck: { id: '29454' } };
		(function() {
			var wf = document.createElement('script');
			wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
			'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
			wf.type = 'text/javascript';
			wf.async = 'true';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(wf, s);
		})();
    });
});
