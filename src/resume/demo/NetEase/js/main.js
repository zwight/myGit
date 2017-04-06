//将商品以延迟加载效果
$(window).scroll(function() {
	for (var i = 0; i < $('.cotton_list_con ul li').length; i++) {
		var winHeight = $(window).height();
		var liHeight = $('.cotton_list_con ul li').eq(i).offset().top;
		var scrollHeight = $(document).scrollTop()
		if (winHeight >= (liHeight - scrollHeight) || liHeight <= winHeight) {
			$('.cotton_list_con ul li img').eq(i).fadeIn(500);
			$(".goods_hide").eq(i).fadeOut(0)
		}
	}
})

// 头部轮播图代码
$(function(){
	$('.img li').eq(0).show();
	$('.num li').mouseover(function(){
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
		$('.img li').eq(index).fadeIn(300).siblings().fadeOut(300);
	})
})
var i = 0;
var t = setInterval(move,2500)
function move(){
	i++;
		if(i==3){
		i=0;
	}
	$(".num li").eq(i).addClass('active').siblings().removeClass('active');
	$('.img li').eq(i).fadeIn(300).siblings().fadeOut(300);
}
// 轮播图结束


$(function() {
	//返回顶部
	$('.backtop').click(function() {
		$("body,html").animate({
			scrollTop: 0
		}, 500);
	})
	//底部关注我们显示二维码
	$('#yx_img').hover(function() {
		$('#app_img').fadeToggle(300);
	})
	$('#we_img').hover(function() {
			$('#app_img').fadeToggle(300);
		})
	//客服按钮连接
	$('.services').click(function() {
		window.open('https://qiyukf.com/client?k=96ee78c0d9633761581e89d5019c5595&u=33h6oqqm9tq1nzstaekv&gid=0&sid=0&atom=0&dvctimer=0&t=1%25E6%25AC%25A1%25E8%25A1%258C%25E5%258A%25A8%25EF%25BC%258C%25E6%2594%25B9%25E5%258F%2598%25E5%259C%25B0%25E7%2590%2583%25E6%259C%25AA%25E6%259D%25A5', '_blank', 'width=600px,height=630px,top=50px,left=400px;')
	})
	// 改变地球行为下拉框
	$('#sel_img').click(function(){
		event.stopPropagation();
		$('.u_menu').fadeToggle(300);
		$('.u_menu li').mouseover(function(){
			var index = $(this).index();
			$('.u_menu li').eq(index).css('color','#b1bbc4').siblings().css('color','#56564a');
		});
		$('.u_menu li').mouseout(function(){
			$('.u_menu li').css('color','#56564a');
		})
		$('.u_menu li').click(function(){
			var index = $(this).index();
			var text = $(this).text();
			$('.l_input input').val(text);
			$('.u_menu').fadeOut(300);
		})
	})
	//行动次数下拉框
	$('#sel_img1').click(function(){
		event.stopPropagation();
		$('.u_menu1').fadeToggle(300);
		$('.u_menu1 li').mouseover(function(){
			var index = $(this).index();
			$('.u_menu1 li').eq(index).css('color','#b1bbc4').siblings().css('color','#56564a');
		});
		$('.u_menu li').mouseout(function(){
			$('.u_menu1 li').css('color','#56564a');
		})
		$('.u_menu1 li').click(function(){
			var index = $(this).index();
			var text = $(this).text();
			$('.r_input input').val(text);
			$('.u_menu1').fadeOut(300);
		})

	})
	$(document).click(function(event){
		$('.u_menu').fadeOut(300);
		$('.u_menu1').fadeOut(300);
	})

	//点击‘我要成为英雄’的次数对应显示在“为地球未来行动(人次)”
	$('#s_text').click(function() {
		var str = localStorage.getItem("str");
		var data = JSON.parse(str);
		var flag = false
		//遍历个人信息数组
		for (var i = 0; i < data.arr.length; i++) {
				//判断该用户是否以登录
			if (data.arr[i].sid == 1) {
				flag = true;
				break;
			}
		}
		if(flag){
			if(data.arr[i].uid==0){
				change();
				data.arr[i].uid=1
				data.allArr[0].clickNum++;
				str = JSON.stringify(data);
				localStorage.setItem("str", str);
				console.log(data)
			}
		}
		
	})
	function change(){
		for (var i = $('.scroll_num span').length - 1; i >= 0; i--) {
			var scrollNum = $(".scroll_num" + i + "")
			if (scrollNum.html() < 9) {
				$(".scroll_num" + i + "").html(parseInt($(".scroll_num" + i + "").html()) + 1)
				return;
			} else {
				$(".scroll_num" + i + "").html("0");
				change()
			}
		}
	}

	//登录注册和模态框之间的关系
	var arr = [];
	var allArr = [];
	var dataAll = new Object; //存储总票数
	dataAll.num = "5";
	allArr.push(dataAll) //将总票数放入数组
	$('#register').click(function() {
		// localStorage.clear();//清除本地缓存
		// 先读取本地存储
		var str = localStorage.getItem("str");
		var data = JSON.parse(str);
			// 判断本地存储总是否有数据
		if (data == null) {
			var dataPerson = new Object;
			dataPerson.name = $('#registerName').val();
			dataPerson.password = $('#registerPassword').val();
			dataPerson.sid = "0"; //判断是否登录的标记
			dataPerson.uid = "0";//判断是否点击过‘我要成为英雄’
			dataPerson.code = "0"; //判断是否领取优惠券的标记，初始默认为未领取
			arr.push(dataPerson)

			var data = new Object; //存储总票数和个人信息的对象
			data.allArr = allArr;
			data.arr = arr;
			//将总数据以json格式放入本地缓存
			var str = JSON.stringify(data);
			localStorage.setItem("str", str);
			console.log(str);
			$('#registerName').val("");
			$('#registerPassword').val("");
		} else {
			//遍历个人信息数组
			for (var i = 0; i < data.arr.length; i++) {
				//判断所输入的用户名是否已注册
				if (data.arr[i].name == $('#registerName').val()) {
					alert("该用户名已存在!");
					$('#register').eq(0)[0].dataset.dismiss = ""; //保留注册模态框打开的状态
					break;
				} else {

					var dataPerson = new Object;
					dataPerson.name = $('#registerName').val();
					dataPerson.password = $('#registerPassword').val();
					dataPerson.sid = "0"; //判断是否登录的标记
					dataPerson.uid = "0";
					dataPerson.code = "0"; //判断是否领取优惠券的标记，初始默认为未领取
					arr.push(dataPerson);

					var data = new Object;
					data.allArr = allArr;
					data.arr = arr;
					console.log(data)
					var str = JSON.stringify(data);
					localStorage.setItem("str", str);
					console.log(str);
					$('#registerName').val("");
					$('#registerPassword').val("")
					return;
				}
			}
		}
	})
	var flag = false; //标记
	$('#load').click(function() {
		var str = localStorage.getItem("str");
		
		var data = JSON.parse(str);
		//初始化登录信息
		for (var j = 0; j < data.arr.length; j++) {
			data.arr[j].sid = 0;
		}
		//将改变的值存入缓存
		var str = JSON.stringify(data);
		localStorage.setItem("str", str);
		//遍历个人信息数组
		for (var i = 0; i < data.arr.length; i++) {
				//判断该用户是否存在
			if (data.arr[i].name == $('#name').val()) {
				flag = true;
				break;
			}
		}
		if (flag) {
			if (data.arr[i].password ==$('#password').val()) {//判断该账号对应的密码是否正确
			//判断该用户是否领取过优惠券
				if (data.arr[i].code == "0") {
					//判断优惠券是否已领完
					if (data.allArr[0].num <= 0) {
						$('#getfail').modal('toggle'); //弹出优惠券已领完的模态框
					} else {
						$('#discount').modal('toggle'); //弹出优惠券成功领取的模态框
						data.arr[i].code = 1; //将领取优惠券的标记变为以领取
						data.allArr[0].num--; //将优惠券的个数减一
						$('#name').val("");
						$('#password').val("");
					}
				} else if (data.arr[i].code == 1) {
					//弹出以领取过优惠券的模态框
					$('#coupons').modal('toggle');
					$('#registerName').val("");
					$('#registerPassword').val("");
				}
				data.arr[i].sid = 1;//登录后以sid为标记表示
				//将改变的值存入缓存
				str = JSON.stringify(data);
				localStorage.setItem("str", str);
			}else{
				alert("密码错误!")
			}
			console.log(str)
			// console.log(data)
			alert(data.arr[i].code)
		} else {
			alert("该用户名不存在!");
			$('#load').eq(0)[0].dataset.dismiss = ""
			$('#Name').val("");
			$('#Password').val("")
		}
	})
})