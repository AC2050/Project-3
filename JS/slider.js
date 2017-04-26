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
//custom
var imagename = ["Maxwell on 31st", "Taqueria San Jose on Halsted", "Ricobene's on 26th",
	"The Noodle on Wentworth", "Pheonix Restaurant on Archer Ave"];
//custom
var imagep = document.getElementById("descript");
//custom
var current = 0;

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
		duration:1000,
		delta:function(p){return p;},
		step:function(delta){
			ul.style.left = parseInt(currentPostion + direction * delta * imageWidth * numOfImageToGo) + 'px';
		},
		callback:function(){currentImage = imageToGo;}	
	};
	animate(opts);
}

function onClickPrev(){
	if (currentImage == 0){
		slideTo(imageNumber - 1);
		//custom
		imagep.innerHTML = imagename[4];
		//custom
		current = 4;
	} 		
	else{
		slideTo(currentImage - 1);
		//custom
		current--;
		//custom
		imagep.innerHTML = imagename[current];
	}
}

function onClickNext(){
	if (currentImage == imageNumber - 1){
		slideTo(0);
		//custom
		imagep.innerHTML = imagename[0];
		//custom
		current = 0;
	}		
	else{
		slideTo(currentImage + 1);
		//custom
		current++;
		//custom
		imagep.innerHTML = imagename[current];
	}		
}

window.onload = init;