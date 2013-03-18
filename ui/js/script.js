/* by @Idered */

var App = App || (function($) {

	var Utils   = {},
		Public  = {};

	Utils = {
		settings: {
			debug: false,
			init: function() {

				$("body").removeClass("no-js");

				Utils.placeholder();

				Utils.submitShorcut();

			}
		}, // settings

		/**
		 * Custom log wrapper function
		 */
		log: function(what) {

			Utils.settings.debug && window.console && console.log.apply(console, arguments);

		}, // log

		/**
		 * Placeholder shim
		 */
		placeholder: function() {

			if(!('placeholder' in document.createElement('input'))) {
				$('[placeholder]').focus(function() {
					var input = $(this);
					if (input.val() == input.attr('placeholder'))
						input.val('').removeClass('placeholder');
				}).blur(function() {
					var input = $(this);
					if (input.val() == '' || input.val() == input.attr('placeholder'))
						input.val(input.attr('placeholder')).addClass('placeholder');
				}).blur();

				$('[placeholder]').parents('form').submit(function() {
					$(this).find('[placeholder]').each(function() {
						var input = $(this);
						if (input.val() == input.attr('placeholder'))
							input.val('');
					})
				});
			}

		}, // placeholder

		/**
		 * Submit forms using Ctlr + Enter shorcut
		 */
		submitShorcut: function() {
			var isCtrl = false;

			$('textarea, input').keyup(function(e) {
				if (e.which == 17) isCtrl = false;
			}).keydown(function(e) {
				if (e.which == 17) isCtrl = true;
				if (e.which == 13 && isCtrl === true) {
					$(this).closest('form').submit();
					return false;
				}
			});
		} // submitShortcut
	};
	var _log = Utils.log;


	Public = {

		init: function() {

			_log('main.js initialized.');

			Utils.settings.init();

			Public.twitterFollow();
			Public.responsive();
			Public.codeHelpers();

		}, // init

		/**
		 * Custom twitter follow button
		 */
		twitterFollow: function() {
			var twitterButton = $('.twitter-follow__button'),
			    detectFollow = setInterval(function () {
			        if ($(document.activeElement).hasClass('twitter-follow-button')) {
			            twitterButton.text('Thanks!').addClass('active');
			            clearInterval(detectFollow);
			        }
			    }, 250);
		}, // twitterFollow

		/**
		 * Move some elements from sidebar to the bottom of page
		 */
		responsive: function() {

			var $win = $(window),
				$elements = $('.sidebar__about, .footer'),
				$sidebar = $('.sidebar'),
				$content = $('.content'),
				inSidebar;

			$win.on('resize', function() {

				inSidebar = $sidebar.find('.footer').length;

				if ($win.width() <= 768) {

					if (inSidebar)
						$elements.appendTo($content);

				} else if( ! inSidebar) {

					$elements.appendTo($sidebar);

				}

			}).trigger('resize');

		}, // responsive

		codeHelpers: function() {

			var scrollTopValue;

			// Escape html
			// $('pre code').each(function() {
			//    $(this).text($(this).html()).fadeIn();
			// });


			$('code').each(function() {
				if ($(this).parent('pre').length)
						$(this).parent().addClass('prettyprint');
			});

			// Init highlighting
			prettyPrint();

			// Allow user to copy code
			$('pre').delegate('code', 'click', function(e) {

				scrollTopValue = $(window).scrollTop();

				var $this  = $(this).parent(),
					$code  = $this.children('code'),
					$clone = $code.clone(),
					text   = $code.text(),
					height = $code.height();

				$code.replaceWith($('<textarea/>'));

				$this.children('textarea').one('blur', function() {
					$(this).replaceWith($clone);
				}).height(height).val(text).select();

				$(window).scrollTop(scrollTopValue);

			});

		} // codeHelpers

	};

	return Public;

})(window.jQuery);

jQuery(document).ready(App.init);
