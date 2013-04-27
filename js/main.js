require(["jquery", "modules/lazy-load", "modules/item-loader"], function($, lazyLoad, itemLoader) {
    $(function() {

		lazyLoad.init();

//		lazyLoad.load('services');

		itemLoader.init();

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
