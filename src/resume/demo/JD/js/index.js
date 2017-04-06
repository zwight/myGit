if(navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)){
		location.href = "alipay/index.html";
	}



// var changecolor=document.getElementsByClassName("slider_extre_li");
// window.onload=function(){    
// 	var oBox=document.getElementById('main_box');    
// 	var oUl=oBox.children[0];    
// 	var aLi=oUl.children;    
// 	oUl.innerHTML+=oUl.innerHTML;    
// 	oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';    
// 	setInterval(function(){ 
// 		var l=oUl.offsetLeft-440; 
		
// 		var a=-l/440;
// 		changecolor[a-1].style.backgroundColor="#3e3e3e";
// 		if(a>=4){
// 		a=0;
// 		}
// 		if(l<=-oUl.offsetWidth/2){    
// 			l=0;    
// 		}    
// 		oUl.style.left=l+'px';  
// 		changecolor[a].style.backgroundColor="#c81623";  
// 	},4000);    
// };

// 顶部轮播图
var a=0;
var topTime;
function topSlider(){
	a++;
	for(var i = 0;i<5;i++){
		$(".box01 li").eq(i).css({'zIndex':'0','opacity':'0'});
		$(".slider_extre01_li").eq(i).css('backgroundColor','#3e3e3e');
	}
	if(a>=5){
		a=0;
	}
	$(".box01 li").eq(a).css({'zIndex':'1','opacity':'1'});
	$(".slider_extre01_li").eq(a).css('backgroundColor','#c81623');
}
topTime = setInterval(function(){
	topSlider()
},4000)
$(function(){
	$(".slider_extre01 ul li").mouseover(function(){
		clearTimeout(topTime);
		var topInd = $(this).index();
		a = topInd-1;
		topSlider();
		topTime = setInterval(function(){topSlider()},4000);
	})
	$(".box01 li img,.slider_page").mouseover(function(){
		$(".slider_page").show();
	})
	$(".box01 li img,.slider_page").mouseout(function(){
		$(".slider_page").hide();
	})
	$(".slider_page .slider_prev").click(function(){
		clearTimeout(topTime);
		if(a<=0){
			a = 3;
		}else{
			a-=2;
		}
		topSlider();
		topTime = setInterval(function(){topSlider()},4000);
	})
	$(".slider_page .slider_next").click(function(){
		clearTimeout(topTime);
		topSlider();
		topTime = setInterval(function(){topSlider()},4000);
	})

	$(".item,.carousel-control").mouseover(function(){
		$(".carousel-control").show();
	})
	$(".item,.carousel-control").mouseout(function(){
		$(".carousel-control").hide();
	})
})
	// var y=document.getElementsByClassName("myslider");
	// var li = document.getElementsByClassName('slider_extre01_li');
	// var a = 1;
	// function scroll(num){
	// 	for(var i=0;i<5;i++){
	// 		li[i].style.backgroundColor = "#3e3e3e";
	// 	}
	// 	li[num-1].style.backgroundColor = "#c81623";
	// 	y[0].src = "images/goods/slider0" +num+ ".jpg";
	// 	a = num;
	// }
	// setInterval(function(){
	// 	scroll(a);
	// 	a++;
	// 	(a>5) ? a=1 : a=a;
	// },2000)



$(function(){
// 左侧导航栏
	var ind = 0
	$(".categorys_dd_li").mouseover(function(){
		ind = $(this).index()
		over(ind);
		
	})
	$(".categorys_dd_li").mouseout(function(){
		ind = $(this).index()
		out(ind);
		$(".dorpdown_layer").mouseover(function(){
			over(ind);
			console.log(ind)
		})
		$(".dorpdown_layer").mouseout(function(){
			out(ind);
		})
	})
	function over(index){
		$(".dorpdown_layer").eq(index).css("display","block");
		$(".categorys_dd_li").eq(index).css({"backgroundColor":"#fff","color":"#c81623"});
		$(".categorys_dd_li").eq(index).children().css("color","#c81623");
	}
	function out(index){
		$(".dorpdown_layer").eq(index).css("display","none");
		$(".categorys_dd_li").eq(index).css({"backgroundColor":"#c81623","color":"#fff"});
		$(".categorys_dd_li").eq(index).children().css("color","#fff");
	}

// 楼梯式导航栏
	var index = 0;
	var top1 = $("#louti12").offset();
	console.log(top1)
	$("#elevator ul li").click(function(){
		$(this).find("span").addClass("active").parent().siblings().find("span").removeClass("active");
		index = $(this).index()+1;
		var top = $("#louti"+index).offset().top;
		$("body,html").animate({scrollTop:top},500);
	})
	$(window).scroll(function(){
		if($(document).scrollTop()>=1100&&$(document).scrollTop()<=9600){
			$("#elevator").show();
			var ind = Math.floor(($(document).scrollTop()-1800)/650);
			if(ind<0){
				console.log(ind+1);
				ind = 0
			}
			$("#elevator ul li span").eq(ind).addClass("active").parent().siblings().find("span").removeClass("active")

		}else{
			$("#elevator").hide()
		}
	})
	$("#backTop").click(function(){
		$("body,html").animate({scrollTop:0},500);
	})
})