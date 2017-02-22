//when the document is ready, lets start the carousel script...
$(document).ready(function(){
	var slideNum = $("#carousel-slides .slide").length;//number of slides
	var slideNubWidth = 30;//arbitrary width specified, could have retrieved from the DOM, but the element doesn't exist yet!
	//show the first slide...
	doSlide($("#carousel-slides .slide").eq(0), 0, sliderCustomiser);//run the doSlide function for the first time.
	//arrow click events...
	$(".carousel-arrow.carousel-arrow-left").click(function(e){
		var currentSlideNum = $("#carousel-slides .slide:visible").index();		
		if(currentSlideNum > 0){
			doSlide($("#carousel-slides .slide").eq(currentSlideNum-1),currentSlideNum-1,sliderCustomiser);
		}
		e.preventDefault();
	});
	$(".carousel-arrow.carousel-arrow-right").click(function(e){
		var currentSlideNum = $("#carousel-slides .slide:visible").index();		
		if(currentSlideNum < (slideNum-1) ){
			doSlide($("#carousel-slides .slide").eq(currentSlideNum+1),currentSlideNum+1,sliderCustomiser);
		}
		e.preventDefault();
	});
	//create/append the carousel menu, as per above, this is the reason why I can't get the wicth of the element!
	$("#carousel").append('<div id="carousel-menu"><ul id="carousel-menu-list"></ul></div>');
	//execute a for loop against the slide number, append list items as per slide length...
	for (var i =0;i<slideNum; i++){
		$("#carousel-menu-list").append('<li><a href="#"><span class="icon"></span></a></li>');
	}
	//click event for the menu items created above...
	$("#carousel #carousel-menu li a").click(function(e){//when a slide is clicked...
		var thisBtnNum = $(this).parent().index();//get the id of the element..
		doSlide($("#carousel-slides .slide").eq(thisBtnNum),thisBtnNum,sliderCustomiser);
		e.preventDefault();
	});
	//now that the menu is all created, set the width of the menu to the amount of items in the list!
	$("#carousel-menu-list").width(slideNubWidth*slideNum+slideNubWidth);
	showCurrentSlide(0);//show the first slide...
});
// the main slide function for the carousel.
function doSlide(obj, count, usrObj){
	//get some user configurable variables and convert them to milliseconds..
	var speedIn = secToMilli(usrObj.speedIn);
	var speedOut = secToMilli(usrObj.speedOut);
	var delay = secToMilli(usrObj.delay);
	//hide all the slides initially...	
	$("#carousel-slides .slide").each(function(){
		$(this).hide();//hide all slides...		
	});
	//stop the jquery animate queue (it's started later on) just in case it was previously running
	$("#carousel-slides .slide").stop(true);
	showCurrentSlide(count);//show the current slide (count is passed to this function)
	//
	if(count < $("#carousel-slides .slide").length){//while the count is less than the length of our divs...
		$("#carousel-slides .slide").eq(count).show().animate({//animate the div...
			opacity: 1
		},{
			duration:speedIn,
			queue:false,			
			complete: function(){ //console.log("complete");
				count += 1;//crank count up by one (we want to animate the next div) ...
				//
				$(this).delay(delay).animate({//animate the div...
					opacity: 0
				},{
					duration:speedOut,
					queue:true,
					complete: function(){
						doSlide(obj, count, usrObj);//do the next div...
					}
				});//animate complete finished...
			}
		});
	} else { //restart...
		count = 0;//set the count to zero and start fromthe beginning...
		doSlide($("#carousel-slides .slide").eq(count), count, usrObj);//show the first slide again...
	}
}
function showCurrentSlide(count){//small utility function, shows the current slide!	
	//show the current slide, using the current button id as a string reference of the slide
	$("#carousel #carousel-menu li a").each(function(){//loop over all slides...
		$(this).removeClass("selected");//hide them all
	});
	$("#carousel #carousel-menu a").eq(count).addClass("selected");//add the selected class to the first slide
}


//
function secToMilli(num) { return num*1000; };//another small utility function, converts seconds to milliseconds for use in jqueries animate facility	