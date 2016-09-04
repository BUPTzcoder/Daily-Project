	   //onload事件
       function onLivelist(){
			if(sessionStorage.loginstatus=="true"){
				document.getElementById("login").style.visibility='hidden';
	  		    document.getElementById("register").style.visibility='hidden';
			    var temp=document.getElementById("usernamed");
			    temp.style.visibility='visible';
			    temp.value=sessionStorage.username;
			    document.getElementById("layout").style.visibility='visible';
			}
			getlivelist();
		}
       
       
       
       var websocket = null;
        
        if('WebSocket' in window){
            websocket = new WebSocket("ws://localhost:8080/LivePlatfrom2.0/websocket");
        }
        else{
            alert('你的浏览器版本太旧啦！');
        }
        websocket.onerror = function(){
        	alert('连接服务器错误，请重试！');
        };
        

        window.onbeforeunload = function(){
            websocket.close();
        }
        
        function sendjson(o) {
        	var str=JSON.stringify(o);
        	websocket.send(str);
		}
        //登陆
        function submitlogin(){
        	var username=document.getElementById("input_name");
        	var pwd=document.getElementById("input_psw");
        	sessionStorage.username=username.value;
        	var o={"type":"login","username":username.value,"pwd":pwd.value};
        	sendjson(o);
        }
        //注册
        function submitregister(){
      		var username=document.getElementById("register_name");
        	var pwd=document.getElementById("register_psw");
        	sessionStorage.username=username.value;
        	var o={"type":"register","username":username.value,"pwd":pwd.value};
        	sendjson(o);
        }

        //获得直播列表
         function getlivelist(){
        	 var o={"type":"getliveifo"};
         	 sendjson(o);
         }

        //转到注册
		function switchtoregister(){
				$("#login_location").hide();
				$("#register_location").show();
			}
		
		//转到登陆
		function switchtologin(){
			$("#register_location").hide();
			$("#login_location").show();
		}
		
		//图片导航栏及登陆注册启动设置
		$(document).ready(function(){
			
			
			 
			
			$('.flexslider').flexslider({
				directionNav: true,
				slideshowSpeed: 3000, 
				pauseOnAction: false
			});
			$('#login').click(function(){
				$("#login_location").show(); 
			});
			$('#layout').click(function(){
				
			    var xxxxxx=confirm("你确定要退出吗");
			    if(xxxxxx==true){
	        	sessionStorage.loginstatus="false";
	        	
	        	document.getElementById("login").style.visibility='visible';
	  		    document.getElementById("register").style.visibility='visible';
			    var temp=document.getElementById("usernamed");
			    temp.style.visibility='hidden';
			    document.getElementById("layout").style.visibility='hidden';
			    }
			});
			$('#login_close').click(function(){
				$("#login_location").hide(); 
			});
			$('#register').click(function(){
				$("#register_location").show(); 
			});
			$('#register_close').click(function(){
				$("#register_location").hide(); 
			});
		
		    
		
			$('#input_name').bind('input propertychange', function() {
				if($("#input_name").val().length!=0){
			        $("#close_name").show(); //显示
				}
				else{
					$("#close_name").hide();
				}
		    });
		    $('#input_psw').bind('input propertychange', function() {
				if($("#input_psw").val().length!=0){
			        $("#close_psw").show();
				}
				else{
					$("#close_psw").hide();
				}
		    });
			$('#register_name').bind('input propertychange', function() {
				if($("#register_name").val().length!=0){
			        $("#close_registername").show();
				}
				else{
					$("#close_registername").hide();
				}
		    });
		    $('#register_psw').bind('input propertychange', function() {
				if($("#register_psw").val().length!=0){
			        $("#close_registerpsw").show(); 
				}
				else{
					$("#close_registerpsw").hide();
				}
		    });
		    $('#register_psw2').bind('input propertychange', function() {
				if($("#register_psw2").val().length!=0){
			        $("#close_registerpsw2").show(); 
				}
				else{
					$("#close_registerpsw2").hide();
				}
		    });
		    
		    
		    //登陆校正
		    $('#loginConfirm').click(function(){
				if($("#input_name").val().length<6){
					alert("用户名应不少于六个字符！");
				}
				else if($("#input_psw").val().length==0){
					alert("密码长度应不少于六个字符！");
				}
				else{
					submitlogin();
				}
			});
		    //注册校正
		    $('#registerConfirm').click(function(){
		    	if($("#register_name").val().length==0){
		    		alert("请输入用户名！");
		    	}
		    	else if($("#register_name").val().length<6){
		    		alert("用户名应不少于六个字符！");
		    	}
		    	else if($("#register_psw").val().length==0){
		    		alert("请输入密码！");
		    	}
		    	else if($("#register_psw2").val().length==0){
		    		alert("请再次输入密码！");
		    	}
				else if($("#register_psw").val()!=$("#register_psw2").val()){
					alert("您输入的两次密码不一致！");
				}
				else if($("#register_psw2").val().length<6||$("#register_psw2").val().length<6){
		    		alert("密码的长度应该不少于六个字符！");
		    	}
				else if($("#input_name").val().indexOf('&')!=-1){
					alert("用户名中包含敏感字符‘&’,请选择其他用户名");
				}
				else{
					submitregister();
				}
			});
		});