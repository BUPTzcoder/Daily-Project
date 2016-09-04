<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
 
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    
    <script src="js/peer.min.js"></script>
    <link rel="stylesheet" href="css/watchstyle.css" type="text/css">
     <script type="text/javascript" src="js/watch.js"></script>
    <script type="text/javascript" src="js/damoo.min.js"></script>
</head>
<style>
    *{ margin:0; padding:0; }
    html{ height:100%; }
    p{ padding:10px 0; }
    body{ min-height:100%; font-family:arial; position:relative; }
    body.sideMenu{ margin:0; -webkit-transform:none; transform:none; }
    #sideToggle{ display:none; }
    #sideToggle:checked + aside{ left:0; }
    #sideToggle:checked ~ #wrap{ padding-left:220px; }
    body > aside{ position:absolute; top:0; bottom:0; left:-200px; width:200px;  background: cornflowerblue; transition:0.2s ease-out; -webkit-transition:0.2s ease-out; }
    body > aside > h2{ color:#FFF; text-align:center; font-weight:normal; padding:10px; }
    #wrap{ margin-left:20px; padding:10px; transition:0.25s ease-out; -webkit-transition:0.25s ease-out; }
    #wrap > label{ display:inline-block; }
    #wrap > label{
        background: cornflowerblue;
        border-radius:50px;
        color: #FFF;
        cursor: pointer;
        display: block;
        font-family: Courier New;
        font-size: 25px;
        font-weight: bold;
        width: 30px;
        height: 30px;
        line-height: 35px;
        text-align: center;
        text-shadow: 0 -4px;
    }
    #wrap > label:hover{ background:#000; }
    .menu-con-div{
        height: 100%;
        margin-top: 70%;
        float: inherit;
    }
    .menu-mem{

    }
     .menu-div{
         width: 100%;
         margin-top: 5px;
         margin-bottom: 5px;
         height: 50px;
         text-align: center;
         line-height: 50px;
     }
    .menu-div:hover{
        background-color: aqua;
    }
    .logo-{
        width: 100px;
        height: 100px;
        margin-left: 25%;
        margin-top: 30px;
    }

</style>

<body>

<input type='checkbox' id='sideToggle'>
<aside>
    <div class="logo-con">
    <img alt="" src="image/logo.jpg" class="logo-">
    </div>
    <div class="menu-con-div" style="z-index:9999">
        <div class="menu-div" onclick="returnindex()"><a class="menu-mem" >返回首页</a></div>
       
        <div class="menu-div" onclick="tolive()"><a class="menu-mem" >我要直播</a></div>
    </div>
</aside>
<div id='wrap'>
    <label id='sideMenuControl' for='sideToggle'>=</label>
</div>




   <div class="body-con" id="body-con">
       <div class="video-con">
           <p id="live-title">
                 <h1 id="roomname"></h1>
                 <h3 id="linkstatus">视频连接中</h3>
           </p>
           <div id="dm">
             <video class="video" id="video" autoplay controls="controls"></video>
           </div>
       </div>
       <p><h2>主播简介</h2></p>
       <HR style="FILTER: alpha(opacity=100,finishopacity=0,style=3)" width="96%" color=#987cb9 SIZE=3>
       <p style="margin-left:20px;"><h3 id="introduce">暂无简介</h3></p>
   </div>

   <div class="comment-con" id="comment-con">
       <textarea id="comment-area"  disabled="disabled" style="overflow:scroll; overflow-x:hidden;"></textarea>
       <div class="Input_Box">
           <textarea class="Input_text" id="Input_text"></textarea>
           <div class="Input_Foot">
               <a class="postBtn" id="danmuIO" onclick="switchdanmu()">关弹幕</a>   
               <a class="postBtn" onclick="sendcomment()">发射</a>
           </div>
       </div>
   </div>
</body>
 <script type="text/javascript" src="js/watch.js"></script>
 <script type="text/javascript">
 
   
    function returnindex(){
    	window.location.href="index.jsp";
    
    }
    function tolive(){
    	 window.location.href='Live.jsp';
    }
    
    
 </script>

</html>