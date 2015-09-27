var end = false;

function animateLines(){
	$('.st0').css('animation','dash 1.5s linear');
	setTimeout(removeLines, 2000);
}

function removeLines(){
	$('.st0').removeAttr('style');
}

function showBackground(){
	$('.img').css({'background-size':'100', 'opacity':'1'});
}

function animateBackground(){
	$('.img').delay(1000).animate({
		opacity: 1,
		backgroundSize: '100%'
	}, 1000, 'swing');
	setTimeout(setEnding, 2000)
}

function setEnding(){
	end = true;
	checkAvailability()
}

function resetAnimation(){
	$('.img').removeAttr('style')
	$('.st0').removeAttr('style')
}

function checkAvailability() {
	if (end == true) {
		console.log('restricted')
	}
	else if (end == false){
		setTimeout(scrolling, 2000)
	}
}

function scrolling () {
	var lastScrollTop = 0, delta = 600; 
	$(window).scroll(function(event){
		var st = $(this).scrollTop();
		if(Math.abs(lastScrollTop - st) <= delta)
			return;
		if (st > lastScrollTop){

		} else {
			resetAnimation();
			animateLines();
			animateBackground();
		}
		lastScrollTop = st;
	});
}


setCookie = function (c_name,value,exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var expires = exdate.toUTCString();
	var isIE8 = (document.documentMode !== undefined);
	if (exdays == 0) {
		expires = (isIE8 == true) ? "" : "0";
	}
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+expires);
	document.cookie=c_name + "=" + c_value;
}

getCookie = function(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	}
	return "";
}

deleteCookie = function(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

if (getCookie('visited')) {
	showBackground()
} else {
	animateLines()
	animateBackground()
	setCookie('visited','true',1);
}