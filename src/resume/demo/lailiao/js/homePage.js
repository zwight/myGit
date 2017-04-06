// 热门 /排行榜切换
var main=document.getElementsByClassName("main");
var navList=document.getElementsByClassName("nav_list");
var div = document.getElementsByClassName("main_list");
function list(num){
	main[0].style.marginLeft=num*(-6)+'rem';
	// main[0].style.transition="margin-left 0.1s"
	for(var i = 0;i<navList.length;i++){
		navList[i].style.backgroundColor="#323335";
	}
	navList[num].style.backgroundColor="#f4703f";
	main[0].style.height=div[num].offsetHeight+'px';
}



// 热门数据传输
var i=0;
function hotLoad(){
	$.ajax({
		url:"./js/data.json",
		type:"get",
		dataType:"json",
		async:"false",
		cache:"false",
		data:{},
		success:function(data){
			var inner=[];
			i<data.hotData.length;
			// for(var i = 0;i<data.hotData.length;i++){
			for(j=0;j<data.hotData[i].length;j++){
				inner[j] = "<div class='anchor_number'><p>已撩 : <span>"+data.hotData[i][j].num+"</span>次</p></div>";
				inner[j] += "<a href='reward.html'><div class='anchor_imgbox'><img src="+data.hotData[i][j].img+"><div class='anchor_name'><p>"+data.hotData[i][j].platform+" : <span>"+data.hotData[i][j].name+"</span></p></div></div></a>";
				inner[j] += "<div class='anchor_introduce'><p>"+data.hotData[i][j].introduce+"</p></div>";
			var hotInner="<ul style='display:none'><li class='main_hot_anchor'>"+inner[0]+"</li><li class='main_hot_anchor main_hot_anchor_right'>"+inner[1]+"</li></ul>";
			}
            $('.main_hot_box').append(hotInner);
            $('.main_hot_box ul').fadeIn(500);
            if(i>data.hotData.length-2){
				$('.main_hot .load_more').css("display","none");
			}
			i++;
			main[0].style.height=div[0].offsetHeight+'px';
		},
		error:function(){
			alert("数据出错");
		}
	})
}

// 排行榜数据传输
	$(document).ready(function(){  
	    var range = 100;             //距下边界长度/单位px  
	    // var elemt = 1.5rem;           //插入元素高度/单位px  
	    var maxnum = 2;            //设置加载最多次数  
	    var num = 1;  
	    var totalheight = 0;   
	    var main = $("#content");                     //主体元素  
	    $(window).scroll(function(){  
	        var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
	          
	        //console.log("滚动条到顶部的垂直高度: "+$(document).scrollTop());  
	        //console.log("页面的文档高度 ："+$(document).height());  
	        //console.log('浏览器的高度：'+$(window).height());  
	          
	        totalheight = parseFloat($(window).height()) + parseFloat(srollPos);  
	        if(($(document).height()) <= totalheight  && num != maxnum) {  
	           rankLoad();
	            num++;  
	        }  
	    });  
	});
function rankLoad(){
	$.ajax({
		url:"./js/data.json",
		type:"get",
		dataType:"json",
		async:"false",
		cache:"false",
		data:{},
		success:function(data){
			var i = 0;
			var inner = "<a href='reward.html' onclick='reward()'><p class='li_serial_three'>"+($('.rank li').length+1)+"</p>";
				inner += "<div class='li_head'><img class='head_three' src="+data.rankData[0].head+"></div>";
				inner += "<div class='li_information'><div class='information_top'><p class='nickname'>"+data.rankData[0].platform+"</p></div><div class='information_bottom'><img class='contribute_img' src='images/money.png'><p class='contribute'><span>"+data.rankData[0].num+"</span>次</p></div></div></a>";
			var rankInner = "<li style='display:none'>"+inner+"</li>";
			$(".rank").append(rankInner);
			$('.rank li').fadeIn(500);
			console.log(data.rankData.length)
			if(i>data.rankData.length-2){
				$('.main_rank .load_more').css("display","none");
			}
			i++;

			// var main=document.getElementsByClassName("main");
			// var div = document.getElementsByClassName("main_list");
			main[0].style.height=div[1].offsetHeight+'px';
		},

		error:function(){
			alert("数据出错");
		}
	})
}

// 进入打赏页面数据传输
function reward(num){
	var getVal=$(".cc").eq(num).html();
	window.open("reward.html?cc="+encodeURI(getVal));
}
// var request = 
// 　　{ 
// 	　　QueryString : function(val) 
// 	　　{ 
// 		　　var uri = window.location.search; 
// 		　　var re = new RegExp("" +val+ "=([^&?]*)", "ig"); 
// 		　　return (uri.match(re))?((uri.match(re)[0]).substr(val.length+1)):null; 
// 	　　} 
// 　　} 
function GetQueryString(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
   var r = window.location.search.substr(1).match(reg);
   if (r!=null) return (r[2]); return null;
}
function getReward(){
	var rt=decodeURI(GetQueryString("cc"));
	$.ajax({
		url:"./js/data.json",
		type:"get",
		dataType:"json",
		async:"false",
		cache:"false",
		data:{},
		success:function(data){
				for(var i = 0;i<data.rewardData.length;i++){
					if(data.rewardData[i].name==rt){
						$(".anchor_name_first").eq(0).text(data.rewardData[i].name);
						$(".anchor_admin p span").eq(0).html(data.rewardData[i].platform);
						$("#anchor_head_portrait").attr("src",data.rewardData[i].head);
						$(".anchor_lifted_num").eq(0).html(data.rewardData[i].num);
						$("#wechat_id").html(data.rewardData[i].wechat);
						$(".anchor_detail_name").eq(0).html(data.rewardData[i].name);
						$(".anchor_detail_age").eq(0).html(data.rewardData[i].age);
						$(".anchor_detail_sex").eq(0).html(data.rewardData[i].sex);
						$(".anchor_detail_marry").eq(0).html(data.rewardData[i].marry);
						$(".anchor_detail_forum").eq(0).html(data.rewardData[i].platform);
						$(".anchor_detail_fans").eq(0).html(data.rewardData[i].fans);
						$(".anchor_style_video iframe").eq(0).html(data.rewardData[i].video);
						// break;
						// }

					}
				}
			
		},
		error:function(){
			alert("数据出错");
		}
	})
}

// 打赏页面加载更多
var i=0;
function rewardLoad(){
	$.ajax({
		url:"./js/data.json",
		type:"get",
		dataType:"json",
		async:"false",
		cache:"false",
		data:{},
		success:function(data){
			var inner = "<img style='display:none' src="+data.rewardMoreData[i].img+">";
				inner +="<p class='anchor_recommend' style='display:none'>"+data.rewardMoreData[i].p1+"</p>";
				inner +="<p class='anchor_recommend' style='display:none'>"+data.rewardMoreData[i].p2+"</p>";
				$(".anchor_style_main").append(inner);
				$('.anchor_style_main img').eq(-1).fadeIn(500);
				$('.anchor_style_main p').eq(-1).fadeIn(500);
				$('.anchor_style_main p').eq(-1).fadeIn(500);
			if(i>data.rankData.length-2){
				$('.load_more').css("display","none");
			}
			i++;		
		},
		error:function(){
			alert("数据出错");
		}
	})
}