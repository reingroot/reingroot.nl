require(["jquery", "modules/lazy-load", "modules/item-loader"], function($, lazyLoad, itemLoader) {
    $(function() {

		lazyLoad.init();

//		lazyLoad.load('services');

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
