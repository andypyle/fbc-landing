window.jQuery = window.$ = require('../components/jquery/dist/jquery.js');
require('../components/velocity/velocity.js');
require('../components/velocity/velocity.ui.js');

var cover = $('.cover h1, .cover a');
cover.hide();

$(document).ready(function(){
	cover.velocity("fadeIn", {duration:1500});
	var nav = {
		'bar':$('header'),
		'toggle':$('a.mobileNav'),
		'nav':$('ul.navigation')
	};

	var scrollBtn = $('a.scrollBtn');
	scrollBtn.on('click', function(e){
		e.preventDefault();
		$($(this).data('scrollto')).velocity("scroll", {offset:(0 - nav.bar.outerHeight())});
	});

	//nav.bar.hide();

	$(window).scroll(function(){
		if($(window).scrollTop() >= ($(window).outerHeight())){
			nav.bar.css({'position':'fixed', 'top':0, 'left':0, 'right':0});
			$('section.introduction').css({'margin-top':$('header').outerHeight()});
		} else if($(window).scrollTop() <= $(window).outerHeight()) {
			nav.bar.css({'position':'static'});
			$('section.introduction').css({'margin-top':0});
		}
	});
});

