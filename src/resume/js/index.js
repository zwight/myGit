$(function(){
	$.ajax({
		type:"GET",
		url:"ajax/message.json",
		datatype: "json",
		async:false,
		success:function(data){
			for(var i in data.about_info){
				$("#about_info").append("<p>"+data.about_info[i]+"</p>");
			}
			$("#skill_info").append("<p>"+data.skill_info+"</p>");
			$(".skill_int").append("<ul></ul>");
			for(var i in data.html){
				$("#skill_int1 ul").append("<li>"+data.html[i]+"</li>");
			}
			for(var i in data.css){
				$("#skill_int2 ul").append("<li>"+data.css[i]+"</li>");
			}
			for(var i in data.javaScript){
				$("#skill_int3 ul").append("<li>"+data.javaScript[i]+"</li>");
			}
			for(var i in data.angularJs){
				$("#skill_int4 ul").append("<li>"+data.angularJs[i]+"</li>");
			}
			$("#exp_info").append("<p>"+data.exp_info+"</p>");
			for(var k in data.num){
				$(".bluecircle").eq(k).attr("data-percent",data.num[k]);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("数据错误")
		},
	});
    $('#dowebok').fullpage({
		scrollingSpeed: 400,
		css3: true,
		resize: true,
		anchors: ["page1","page2","page3","page4","page5","page6"],
		menu: '#menu',
		verticalCentered: false,
		afterRender: function(){
			$("#home").css({"display":"block"}).addClass("home_zoom");
			$("aside").css({"top":($(".section").height()-$("aside").height())/2});
			$("header").before("<div id='header' style='opacity:0'></div>");	
			$("#home_head").css({"margin-top":"100px"});
			$("header").animate({opacity:"1"},1000,function(){
				$("#header").css({"opacity":"0.3"});
				$("#home_info1").fadeIn(700,function(){
					$(this).next().animate({width:"800px"},700,function(){
						$("#home_info2").fadeIn(450,function(){
							$(this).next().fadeIn(450,function(){
								$(this).next().fadeIn(450,function(){
									$(this).next().fadeIn(450,function(){
										$("aside").fadeIn(300);
									});
								});
							});
						});
					});
				});
			});	
			$("aside a").eq(0).addClass("selected").siblings().removeClass("selected");
		},
		afterLoad: function(anchorLink,index){
			if(index==1){
				$("aside a").eq(0).addClass("selected").siblings().removeClass("selected");
			}
			if(index==2){
				$("aside a").eq(1).addClass("selected").siblings().removeClass("selected");
				$("#about_content h1").after("<div class='title_en'><h2>· About me ·</h2></div>");
				$(".title_en").animate({width:"130px"},800,function(){
					$(".title_en h2").slideDown(400);
				});
				$("#about_info").animate({width:"800px",marginTop:"0",marginBottom:"0"},700,'easeOutElastic',function(){
					$("#about_info p").eq(0).animate({bottom:"0"},700,function(){
						$("#about_info p").eq(1).animate({bottom:"0"},700,function(){
							$("#about_info p").eq(2).animate({bottom:"0"},700,function(){
								$("#about_info p").eq(3).animate({bottom:"0"},700);
							});
						});
					});
				});	
				var Dleft = 700,i=$('.about_list').length-1;
				setInterval(function(){
					if(i>=0){
						Dleft=Dleft-156;
						$('.about_list').eq(i).css('left',Dleft+'px')
						i--;
					}
				},500)
			}
			if(index==3){
				$("aside a").eq(2).addClass("selected").siblings().removeClass("selected");
				$("#skill_content h1").after("<div class='title_en'><h2>· Skill ·</h2></div>");
				$(".title_en").animate({width:"130px"},800,function(){
					$(".title_en h2").slideDown(400);
				});	
				$(".skill_list_content").addClass("skill_scale");
			    $("[class$='circle']").percircle();
			}
			if(index==4){
				$("aside a").eq(3).addClass("selected").siblings().removeClass("selected");
				$("#exp_content h1").after("<div class='title_en'><h2>· Experience ·</h2></div>");
				$(".title_en").animate({width:"130px"},800,function(){
					$(".title_en h2").slideDown(400);
				});	
				var i=-1;
				$(".exp_scale").each(function() {
					var $this=$(this);
					if(!$this.hasClass("b_to_t")){
						i++;
						setTimeout(function(){
					   $this.addClass("b_to_t");
					   },200*i);
					}
                });
				$("#exp_list_to").fadeIn(800).delay(500).fadeTo(300,0.3);
			}
			if(index==5){
				$("aside a").eq(4).addClass("selected").siblings().removeClass("selected");
				$("#demo_content h1").after("<div class='title_en'><h2>· Demo ·</h2></div>");
				$(".title_en").animate({width:"130px"},800,function(){
					$(".title_en h2").slideDown(400);
				});	
				var i=-1;
				$(".demo_scale").each(function() {
					var $this=$(this);
					if(!$this.hasClass("b_to_t")){
						i++;
						setTimeout(function(){
					   $this.addClass("b_to_t");
					   },200*i);
					}
				})
			}
			if(index==6){
				$("aside a").eq(5).addClass("selected").siblings().removeClass("selected");
				$("#contact_content h1").after("<div class='title_en'><h2>· Contact me ·</h2></div>");
				$(".title_en").animate({width:"130px"},800,function(){
					$(".title_en h2").slideDown(400);
				});	
				var i=-1;
				$("#contact_head1").addClass("b_to_t");
				$("#contact_head2 span").each(function(){
					var $this=$(this);
					if(!$this.hasClass("fade_in")){
						i++;
						setTimeout(function(){
					   $this.addClass("fade_in");
					   },200*i);
					}
				});
				var j=-1;
				setTimeout(function(){
						$(".contact_scale").each(function(){
							var $this=$(this);
							if(!$this.hasClass("fade_in")){
								j++;
								setTimeout(function(){
					   				$this.addClass("fade_in");
					   			},350*j);
							}
						});
				},70);
			}
		},
		onLeave:function(index , nextIndex, direction){
			if(index==2||index==3||index==4||index==5||index==6){
				$(".title_en").remove();	
			}
		}
	});
});
//顶部标题文字切换
	$("#header_p").mouseover(function(){
		$("#header_p1").html("Resume");
		$("#header_p2").html("前端工程师");
	}).mouseout(function(){
		$("#header_p1").html("F2E");
		$("#header_p2").html("个人简历");	
	})
//侧边导航文字切换
	$("aside a").hover(function(){
		$(this).find("b").fadeToggle(200,"easeInOutCubic");
	})
// 头像切换
	$("#home_photo2").hover(function(){
		$(this).fadeTo(800,1);
		},function(){
			$(this).stop(true,false).fadeTo(800,0);
	});
// 技能明细切换
	// $(".skill_icon").click(function(){
		$(".skill_int").each(function(){
				if($(this).is(":visible")){
					$(this).slideUp(100);
					$(this).prev().removeClass("skill_flag_scale");
				}
			});
		// if($(this).siblings(".skill_int").is(":hidden")){
		// 	$(this).siblings(".skill_int").slideDown(400);
		// 	$(this).siblings(".skill_flag").addClass("skill_flag_scale");
		// }else{
		// 	$(this).siblings(".skill_int").slideUp(200);
		// 	$(this).siblings(".skill_flag").removeClass("skill_flag_scale");
		// }
	// })
	$(".skill_icon").mouseover(function(e){ 
		if(checkHover(e,this)){
			$(this).siblings(".skill_int").slideDown(800)
			$(this).siblings(".skill_flag").addClass("skill_flag_scale");
		} 
	})
	$(".skill_icon").mouseout(function(e){ 
		if(checkHover(e,this)){
			$(this).siblings(".skill_int").slideUp(100);
			$(this).siblings(".skill_flag").removeClass("skill_flag_scale");
		} 
	})
	// 防止闪烁
	// 用于检查鼠标是否真正从外部移入或者移出对象的函数checkHover(e,target)，这个函数需要传入当前的事件对象和目标对象
	function checkHover(e, target) {
		if (getEvent(e).type == "mouseover") {
			return !contains(target, getEvent(e).relatedTarget || getEvent(e).fromElement) && !((getEvent(e).relatedTarget || getEvent(e).fromElement) === target);
		} else {
			return !contains(target, getEvent(e).relatedTarget || getEvent(e).toElement) && !((getEvent(e).relatedTarget || getEvent(e).toElement) === target);
		}
	}
	function getEvent(e) {
		return e || window.event;
	}
	// 用于检查一个对象是否包含在另外一个对象中的方法，contains方法
	function contains(parentNode, childNode) {
		if (parentNode.contains) {
			return parentNode != childNode && parentNode.contains(childNode);
		} else {
			return !!(parentNode.compareDocumentPosition(childNode) & 16);
		}
	}

// 图片轮播
	$("#exp_list_slider").width($(".exp_list").width());
	$("#exp_list_content").width($(".exp_list").width()*$(".exp_list").length);
	$("#exp_list_slider_content").mouseenter(function(){
		$("#exp_list_to").stop(true,false).fadeTo(700,1);
	}).mouseleave(function(){
		$("#exp_list_to").stop(true,false).fadeTo(700,0.1);
	})
	var page=1;
	$("#exp_timeline a").click(function(){
		$("#exp_list_content").stop(true,false).animate({left:-$(".exp_list").width()*$(this).index()},2000,"easeInOutCubic");
		page=$(this).index()+1;
		});
	$("#exp_list_toleft").click(function()
    {
		if(!$("#exp_list_content").is(":animated")){
			if(page==1){
				$("#exp_list_content").animate({left:"+=40"},200,function(){
					$(this).animate({left:"-=40"},200);
				});
				return false;
			}	
			$("#exp_list_content").animate({left:"+="+$(".exp_list").width()});
			page--;
		}
	});
	$("#exp_list_toright").click(function(){
		if(!$("#exp_list_content").is(":animated")){
			if(page==$(".exp_list").length){
				$("#exp_list_content").animate({left:"-=40"},200,function(){
					$(this).animate({left:"+=40"},200);
				});
				return;
			}
			$("#exp_list_content").animate({left:"-="+$(".exp_list").width()});
			page++;
		}
	});
// 时光轴
	var x=10;
	var y=20;
	$("#exp_timeline").css("background","url(image/timeline"+$(".exp_list").length+".png) no-repeat center center");
	$("#exp_timeline div").width($(".exp_list").length*130);
	$("#exp_timeline a").mouseover(function(e){
		this.aa=this.title;
		this.title="";
		$("body").append("<div class='exp_timeline_title'>"+this.aa+"</div>");	
		$(".exp_timeline_title").css({
			"top":e.pageY+y+"px",
			"left":e.pageX+x+"px"
		}).show("fast");
	}).mouseout(function(){
		this.title=this.aa;
		$(".exp_timeline_title").remove();
	}).mousemove(function(e){
		$(".exp_timeline_title").css({
			"top":e.pageY+y+"px",
			"left":e.pageX+x+"px"
		});
	}).click(function(){
		return false;
	});
// DEMO轮播
	$("#triangle-up").click(function(){
		if($(".demo_box").css("left") == "0px"){
			$(".demo_box").animate({left:"-1000px"})
			setTimeout(function(){
				$("#triangle-up").css({"border-right":"40px solid rgb(221,18,123)","border-left":"0","left":"-50px","right":""})
			},200)
		}else{
			$(".demo_box").animate({left:"0"})
			setTimeout(function(){
				$("#triangle-up").css({"border-left":"40px solid rgb(221,18,123)","border-right":"0","right":"-50px","left":""})
			},200)
		}

	})

// 点击留言
	$("#contact_message1").click(function(){
		$(this).fadeOut(200,function(){
			$("#contact_form").fadeIn(200);
		})
	});
// 提交表单
	$("#contact_submit").click(function(){
		$.get("ajax/get.php",function(){
			$("#contact_form").fadeOut(200,function(){
				$("#contact_message2").fadeIn(200);
				});
			});
	});
	$(window).resize(function(){
		$("aside").css({"top":($(".section").height()-$("aside").height())/2});
		$("#home_content").css({"padding-top":($(".active").height()-$("#home_content").height())/6});
		$("#about_content").css({"padding-top":($(".active").height()-$("#about_content").height())/6});
		$("#skill_content").css({"padding-top":($(".active").height()-$("#skill_content").height())/6});
		$("#exp_content").css({"padding-top":($(".active").height()-$("#exp_content").height())/6});
		$("#demo_content").css({"padding-top":($(".active").height()-$("#demo_content").height())/6});
	});
