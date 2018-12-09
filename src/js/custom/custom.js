$(function() {

	// Search focus
	var inp = $('._search_inp'),
		search = $('._search_pos');

	inp.on('focus', function() {
		search.css('opacity', '0')
	});

	inp.on('blur', function() {
		search.css('opacity', '1')
	});

	// Header active
	var url = document.location.toString();

	$(".header__nav li a").filter(function () {
		return url.indexOf(this.href) != -1;
	}).addClass("active");





	/* Slick.js http://kenwheeler.github.io/slick/
	==============================*/

	$('.header__slider').slick({
		slidesToShow: 1,
		autoplay: true,
		dots: true,
		arrows: true,
		autoplaySpeed: 5000,
	});


});
