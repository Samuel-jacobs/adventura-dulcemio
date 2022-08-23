//function for opening nav
function openNav() {
	let x = window.matchMedia("(max-width: 768px)");
	function myFunction(x) {
		if (x.matches) {
			document.getElementById("myNav").style.width = "250px";
			//document.body.style.backgroundColor = "green";
		} else {
			document.getElementById("myNav").style.width = "100%";
		}
	}
	myFunction(x);
	x.addListener(myFunction);
} 

//function for opening nav
function closeNav() {
	let x = window.matchMedia("(max-width: 768px)");
	function myFunction(x) {
		if (x.matches) {
			document.getElementById("myNav").style.width = "0%";
			//document.body.style.backgroundColor = "green";
		} else {
			document.getElementById("myNav").style.width = "100%";
			//document.body.style.backgroundColor = "blue";
		}
	}
	myFunction(x);
	x.addListener(myFunction);
}


//change background color on scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
	var currentScrollPos = window.pageYOffset;
	var topnav = document.getElementById("myTopnav");
	if (prevScrollpos > 300) {
		//topnav.style.backgroundColor = "white";
		topnav.classList.add("navshadow");
	}else {
		//document.getElementById("myTopnav").style.backgroundColor = "transparent";
		topnav.classList.remove("navshadow");
	}

	prevScrollpos = currentScrollPos;
}
