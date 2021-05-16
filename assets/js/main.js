/*
	Overflow by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 10

		};

	// Breakpoints.
		breakpoints({
			wide:    [ '1081px',  '1680px' ],
			normal:  [ '841px',   '1080px' ],
			narrow:  [ '737px',   '840px'  ],
			mobile:  [ null,      '736px'  ]
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-scroll');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly-middle').scrolly({
			speed: 1000,
			anchor: 'middle'
		});

		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() { return (breakpoints.active('<=mobile') ? 70 : 190); }
		});

	// Parallax background.

		// Disable parallax on IE/Edge (smooth scrolling is jerky), and on mobile platforms (= better performance).
			if (browser.name == 'ie'
			||	browser.name == 'edge'
			||	browser.mobile)
				settings.parallax = false;

		if (settings.parallax) {

			var $dummy = $(), $bg;

			$window
				.on('scroll.overflow_parallax', function() {

					// Adjust background position.
						$bg.css('background-position', 'center ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');

				})
				.on('resize.overflow_parallax', function() {

					// If we're in a situation where we need to temporarily disable parallax, do so.
						if (breakpoints.active('<=narrow')) {

							$body.css('background-position', '');
							$bg = $dummy;

						}

					// Otherwise, continue as normal.
						else
							$bg = $body;

					// Trigger scroll handler.
						$window.triggerHandler('scroll.overflow_parallax');

				})
				.trigger('resize.overflow_parallax');

		}

    $("#casting section").populateFromTemplate("castingTemplate");

	// Poptrox.
		$('.gallery').poptrox({
			useBodyOverflow: false,
			usePopupEasyClose: false,
			overlayColor: '#000000',
			overlayOpacity: 0.75,
			usePopupDefaultStyling: false,
			popupLoaderText: '',
			windowMargin: 10,
			usePopupNav: true,
      usePopupCaption : true,
      popupBlankCaptionText : ''
		});

    
		
		$("#contactUsFormId").submit(function() {
			var form = $(event.target)
			
			var btn = form.find("input[type='submit']");
			
			var messageDiv = form.find(".message");
			
			btn.attr("disabled", true);
			btn.val("Sending...");
			
			var arr = form.serializeArray();
			var formData = {};
			for(var i in arr)
				formData[arr[i].name] = arr[i].value;
			
			var feedBackObject = {};
			var buttonObject = {};
			
			$.getJSON( form.attr("action"), formData,  function(response) {
				console.log( "success" );
				form.find("input, textarea").val("");
						
				feedBackObject["message"] = "Thanks for your message, We will contact to Contact you back.";
				feedBackObject["success"] = true;
				
			})
			.done(function() {
				console.log( "second success" );
			})
			.fail(function() {
				console.log( "error" );
				feedBackObject["message"] = "There is a Error Sending your message. Please Try Agan after Some time";
				feedBackObject["success"] = false;
				
			})
			.always(function() {
				console.log( "complete" );
				
				messageDiv.populateFromTemplate("contactUsMessage", feedBackObject);
				
				setTimeout(function(){ messageDiv.text(""); }, 10000);
				
				btn.removeAttr("disabled");
				btn.val("Send Message");
			});
			
			
			return false;
		});

    
		$("#footer .icons").populateFromTemplate("socialMedia");


    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scrollToTopBtn').fadeIn();
        } else {
            $('#scrollToTopBtn').fadeOut();
        }
    });

    $('#scrollToTopBtn').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        return false;
    });
		

})(jQuery);