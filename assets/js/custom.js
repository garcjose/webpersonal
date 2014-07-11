$(document).ready( function() {
	$("ul.icons li a img.tright").tooltip({
		'placement': 'right'
	});
	$("ul.icons li a img.tleft").tooltip({
		'placement': 'left'
	});
	$("ul.icons li a img").tooltip({
		'placement': 'bottom'
	});
	
	/*$("ul.prog li a").tooltip({
		'placement': 'right'
	});*/
	/*$('.navbar .dropdown').hover(function() {
		$('.dropdown-menu', this).slideToggle(200);
	});*/

	//$('#social ul li a img').addClass("img-circle");
	/*$('#contact-close').click(function() {
		$('#contact-alert').hide();
	});*/
});