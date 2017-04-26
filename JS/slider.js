/*full disclosure - majority of code taken from:
https://coderwall.com/p/q8tofq/image-slider-with-prev-next-button-and-pager-in-javascript
custom code written by me commented with "custom"*/

var ul;
var li_items;
var imageNumber;
var imageWidth;
var prev, next;
var currentPostion = 0;
var currentImage = 0;
// next 4 variables custom
var imagename = ["Maxwell on 31st", "Taqueria San Jose on Halsted", "Ricobene's on 26th",
	"The Noodle on Wentworth", "Pheonix Restaurant on Archer Ave"];
var imagep = document.getElementById("descript");
var current = 0;
var locked = false;

function init(){
	ul = document.getElementById('image_slider');
	li_items = ul.children;
	imageNumber = li_items.length;
	imageWidth = li_items[0].children[0].clientWidth;
	ul.style.width = parseInt(imageWidth * imageNumber) + 'px';
	prev = document.getElementById("prev");
	next = document.getElementById("next");

	prev.onclick = function(){ onClickPrev();};
	next.onclick = function(){ onClickNext();};
}

function animate(opts){
	var start = new Date;
	var id = setInterval(function(){
		var timePassed = new Date - start;
		var progress = timePassed / opts.duration;
		if (progress > 1){
			progress = 1;
		}
		var delta = opts.delta(progress);
		opts.step(delta);
		if (progress == 1){
			clearInterval(id);
			opts.callback();
		}
	}, opts.delay || 17);

}

function slideTo(imageToGo){
	var direction;
	var numOfImageToGo = Math.abs(imageToGo - currentImage);

	direction = currentImage > imageToGo ? 1 : -1;
	currentPostion = -1 * currentImage * imageWidth;
	var opts = {
		duration:500,
		delta:function(p){return p;},
		step:function(delta){
			ul.style.left = parseInt(currentPostion + direction * delta * imageWidth * numOfImageToGo) + 'px';
		},
		callback:function(){currentImage = imageToGo;}	
	};
	animate(opts);
}

function onClickPrev(){
	if(!locked){  //custom
	if (currentImage == 0){
		slideTo(imageNumber - 1);
		toFirst();  //custom
	} 		
	else{
		slideTo(currentImage - 1);
		toPrev();
	}
	locked = true;  //custom
	setTimeout(unlock, 500);  //custom
	}
}

function onClickNext(){
	if(!locked){  //custom
	if (currentImage == imageNumber - 1){
		slideTo(0);
		toLast();
	}		
	else{
		slideTo(currentImage + 1);
		toNext();
	}
	locked = true;  //custom
	setTimeout(unlock, 500);  //custom
	}
}

//all remaining functions custom
function toFirst(){
	imagep.innerHTML = imagename[4];
	current = 4;
}

function toLast(){
	imagep.innerHTML = imagename[0];
	current = 0;
}

function toNext(){
	current++;
	imagep.innerHTML = imagename[current];
}

function toPrev(){
	current--;
	imagep.innerHTML = imagename[current];
}

function unlock(){
	locked = false;
}

window.onload = init;