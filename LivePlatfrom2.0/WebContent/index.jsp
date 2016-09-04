<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link href="css/index.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="js/jquery.flexslider-min.js"></script>
    
    <script type="text/javascript" src="js/index.js"></script>
    
    <title>首页————Z直播</title>
</head>
 <body onload="onLivelist()">

    <div class="head-bar">
		<div class="head">
			<div class="headlogo-con">
				<img src="image/logo_bar.png"></img>
			</div>
			<div class="all-live">
				<a class="lesson_live" onclick="getlivelist()" href="#livelist">全部直播</a>
			</div>
			<div class="to-live">
				<a class="lesson_live" href="Live.jsp">我要直播</a>
			</div>
			
			<div class="head_button">
				<input type="button" class="head_btn" id="register" value="注册" style="visibility:visible;"/>
				<input type="button" class="head_btn" id="login" value="登录" style="visibility:visible;"/>
				<input type="button" class="head_btn" id="usernamed"  style="visibility:hidden;"/>
				<input type="button" class="head_btn" id="layout" value="[退出]" style="visibility:hidden;"/>
			</div>
			<div class="head_search">
				<input type="text" value="输入主播名称搜索主播" class="head_input" id="search"/>
				<div class="search_icon" onclick="searchhost()">
				       
				</div>
			</div>
	    </div>
	</div>

    <div class="flexslider">
		<ul class="slides">
			<li style="background:url(image/img1.jpg) 50% 0 no-repeat;"></li>
			<li style="background:url(image/img2.jpg) 50% 0 no-repeat;"></li>
			<li style="background:url(image/img3.jpg) 50% 0 no-repeat;"></li>
		</ul>
	</div>
	
	<div style="margin-top:20px;" id="livelist-con">
	    <h2 style="margin-left:30px" id="hintifo">全部直播</h2>
		<div id="livelist">暂无直播内容，刷新试试</div>
	</div>
	<div style="height: 50px;">
	</div>
	<div class="bottom-bar">
		<div class="bottom-foot">
			<a class="foot-ele" href="#">关于我们</a>
			<a class="foot-ele" href="#">常见问题</a>
			<a class="foot-ele" href="#">反馈与建议</a>
			</br></br>
			Copyright @2016 ZLive
		</div>
	</div>
	
	<hr class="last">

	<div id="login_location">
		<div id="loginWindow">
		    <div class="windowHead">
		    	<div class="login_word">登&ensp;录</div>
		    	<div class="login_close" id="login_close"></div>
		    </div>
		    <div class="windowBody">
		        <div class="login_login">
		                                      欢迎来到Z直播
		        </div>
		        <div class="login_register">
					<a  onclick="switchtoregister()">没有账号，点此注册</a>
		        </div>
			    <div class="loginInput">
			    	<div class="input_icon"></div>
					<input type="text" class="window_input" id="input_name" maxlength="12" placeholder="请输入账号" />
					<div class="close_icon" id="close_name"></div>
				</div>
				<div class="loginInput">
			    	<div class="psw_icon"></div>
					<input type="password" class="window_input" id="input_psw"  maxlength="12" placeholder="请输入密码"/>
					<div class="close_icon" id="close_psw"></div>
				</div>
				<input type="button" value="立即登录" class="loginConfirm" id="loginConfirm"/>
			
			</div>
		</div>
	</div>

	<div id="register_location">
		<div id="registerWindow">
		    <div class="windowHead">
		    	<div class="login_word">注&ensp;册</div>
		    	<div class="login_close" id="register_close"></div>
		    </div>
		    <div class="windowBody">
		        <div class="login_login">
		        Z直播账号注册
		        </div>
		        <div   class="login_register">
		            <a  onclick="switchtologin()">已有账号，立即登陆</a>
		        </div>
			    <div class="loginInput">
			    	<div class="input_icon"></div>
					<input type="text" class="window_input" maxlength="12" id="register_name" placeholder="请输入账号" />
					<div class="close_icon" id="close_registername"></div>
				</div>
				<div class="loginInput">
			    	<div class="psw_icon"></div>
					<input type="password" class="window_input"  maxlength="12" id="register_psw" placeholder="请输入密码"/>
					<div class="close_icon" id="close_registerpsw"></div>
				</div>
				<div class="loginInput">
			    	<div class="psw_icon"></div>
					<input type="password" class="window_input"  maxlength="12" id="register_psw2" placeholder="请再次输入密码"/>
					<div class="close_icon" id="close_registerpsw2" ></div>
				</div>
				<input type="button" value="立即注册" class="loginConfirm" id="registerConfirm"/>
			</div>
		</div>
	</div>
</body>
 <script type="text/javascript">
	var search=document.getElementById("search");
	search.onfocus=function(){
		if(search.value=="输入主播名称搜索主播")
		   search.value="";
	}
</script>  
<script type="text/javascript" src="js/index1.js"></script>
<script type="text/javascript" src=js/fuzzysearch.js></script>
 
</html>