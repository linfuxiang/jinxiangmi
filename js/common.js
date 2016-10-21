$(function(){
	var still_load=0;	//判断是否有loading页面，0为有，1为无
	var count=0;	//点中小象次数
	var is_check_rules=0;	//记录是否查看规则
	/*开始按钮点击事件*/
	$(".btn_s").click(function(){
		if(is_check_rules==0){
			$(".rules").show();
			is_check_rules=1;
			return;
		}
		$(".first").hide();
		$(".second").show();
		game();
		ele(500);
		setInterval(function(){
			ele(500);
		},5000);
	});
	/*规则按钮点击事件*/
	$(".btn_ru").click(function(){
		$(".rules").show();
		is_check_rules=1;
	});
	/*分享按钮点击事件*/
	$(".btn_sh").click(function(){
		$(".share").show();
	});
	/*再来一次按钮点击事件*/
	$(".btn_a").click(function(){
		location.reload();
	});
	/*获奖按钮点击事件*/
	$(".btn_r").click(function(){
		$(".third").hide();
		$(".forth").show();
	});
	/*点击蒙板关闭事件*/
	$(".mask,.rules_content").click(function(){
		$(this).parent().hide();
	});
	/*点击小象加次数*/
	$(".second_ele").click(function(){
		var a=parseInt($(".top_score_no").text())+1;
		$(".top_score_no").text(a); 
		/*setTimeout为测试*/
		// setTimeout(function(){
		// 	still_load=1;
		// 	if($(".abc").css("display")!="none"){
		// 		$(".abc").hide();
		// 		$(".third").show();
		// 	}
		// },3000);

		/*下面这个为真实的ajax*/
		if(a==1){
			// console.log("$url");
			$.post("{:U('is_prize')}",{},function(data){
				if(data['is_success']){
					still_load=1;
					if(data['cash']==0){
						$(".third_adw").text(data['msg']);
					}
					else{
						$(".third_adw").text(data['msg']).css({
							"padding-bottom":"4rem"
						});
					}
					if($(".abc").css("display")!="none"){
						$(".abc").hide();
						$(".third").show();
					}
				}else{
					alert(data['msg']);
					location.reload();
				}


				/*if(data){
					still_load=1;
					if($(".abc").css("display")!="none"){
						$(".abc").hide();
						$(".third").show();
					}
				}*/
			},"json");
		}
	});
	/*点击得奖记录事件*/
	$(".btn_r").click(function(){
		/*var time,price;
		$.post("url",{

		},function(data){
			$(".adward_list span:nth-of-type(1)").text(data.time);
			$(".adward_list span:nth-of-type(2)").text(data.price+"元红包");
		})*/
	});
	/*游戏计时function*/
	function game(){
		var time=$(".top_time span");
		var t=10;			//t为游戏时间
		var a=setInterval(function(){
			t=t-1;
			time.text(t);
			if(t<=0){
				count=parseInt($(".top_score_no").text());
				$(".third_score_no span").text(count);
				
				if(count==0){
					$(".third_adw").text("您的手气不太好哦，据说分享后会更容易中奖！");
					$(".second").hide();
					$(".third").show();
					clearInterval(a);
					return;
				}
				// is_adward(count);
				else{
					$(".second").hide();
					if(still_load==0){
						$(".abc").css("background","rgba(0,0,0,0.3)");
						$(".abc").show();
					}
					else{
						$(".third").show();
					}
					clearInterval(a);	
					return;
				}
			}
		},1000);
	}
	/*金象的动画*/
	function ele(speed){
		/*获取window和小象宽高*/
		var win=$(window);
		var win_w=win.width();
		var win_h=win.height();
		var ele=$(".second_ele");
		var ele_w=ele.width();
		var ele_h=ele.height();
		var maxleft=win_w-ele_w;
		var maxtop=win_h-ele_h;
		var eachtop=maxtop/5;
		ele.animate({
			left:maxleft+"px",
			top:"+="+eachtop+"px"
		},speed,"linear");
		ele.animate({
			left:0,
			top:"+="+eachtop+"px"
		},speed,"linear");
		ele.animate({
			left:maxleft+"px",
			top:"+="+eachtop+"px"
		},speed,"linear");
		ele.animate({
			left:0,
			top:"+="+eachtop+"px"
		},speed,"linear");
		ele.animate({
			left:maxleft+"px",
			top:"+="+eachtop+"px"
		},speed,"linear");
		ele.animate({
			left:0,
			top:"-="+eachtop+"px"
		},speed,"linear");
		ele.animate({
			left:maxleft+"px",
			top:"-="+eachtop+"px"
		},speed,"linear");
		ele.animate({
			left:0,
			top:"-="+eachtop+"px"
		},speed,"linear");
		ele.animate({
			left:maxleft+"px",
			top:"-="+eachtop+"px"
		},speed,"linear");
		ele.animate({
			left:0,
			top:0
		},speed,"linear");
	}
	/*判断是否中奖*/
	function is_adward(e){
		// var p5,p3,p2,p1;
		if(e==0){
			$(".third_adw").text("您的手气不太好哦，据说分享后会更容易中奖！");
		}
		else{
			var a=parseInt(Math.random()*2000);			//生成随机数，2000为估计每天玩的人数
			console.log(a);
			if(a<=1000){									//当天红包的总数
				// $.post("url",{},function(data){		//ajax出红包剩余数量
					p5=1;
					p3=2;
					p2=3;
					p1=4;
				// });
				var total=p1+p2+p3+p5;
				if(total==0){		//如果剩余红包总数为0，则跳出函数
					$(".third_adw").text("您的手气不太好哦，据说分享后会更容易中奖！");
					return;
				}
				else{
					var b=parseInt(Math.random()*total);
					console.log("p5="+p5+",p3="+p3+",p2="+p2+",p1="+p1+",total="+total+",b="+b);
					if(b<p5){
						$(".third_adw").text("获5元红包").css({
							"padding-bottom":"4rem"
						});
					}
					else if(b>=p5&&b<(p5+p3)){
						$(".third_adw").text("获3元红包").css({
							"padding-bottom":"4rem"
						});
					}
					else if(b>=(p5+p3)&&b<(p5+p3+p2)){
						$(".third_adw").text("获2元红包").css({
							"padding-bottom":"4rem"
						});
					}
					else if(b>=(p5+p3+p2)&&b<(p5+p3+p2+p1)){
						$(".third_adw").text("获1元红包").css({
							"padding-bottom":"4rem"
						});
					}
				}
				
			}
			else{
				$(".third_adw").text("您的手气不太好哦，据说分享后会更容易中奖！");
			}
		}
	}

});