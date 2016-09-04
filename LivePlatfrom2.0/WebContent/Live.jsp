<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Z直播——直播页面</title>

<script type="text/javascript" src="js/peer.min.js"></script>
  
    
    <link rel="stylesheet" href="css/watchstyle.css" type="text/css">
    <link rel="stylesheet" href="css/live.css" type="text/css">
    <link rel="stylesheet" href="css/easydialog.css" />
    <script type="text/javascript" src="js/damoo.min.js"></script>
   
    
</head>
<body onload="onloadop()">


<div class="body-con" id="body-con">
    <div class="video-con">
        <p id="title-p">
           <h2 id="live-title">直播间</h2>  
           <h4  id="status">未开播</h4>
        </p>
      
         <div id="dm">
            <video class="video" id="video"  autoplay controls="controls"></video>
         </div>
       
         <div class="bt-con">
	        <button id="startlive" onclick="startlive()">开始直播</button>
	        <button id="finishlive" onclick="finishlive()" disabled="disabled">下直播</button>
	        <P style="margin-left:15px"><h5  id="audiencenum">观众人数：0</h5></P>
        </div>
    </div>
    <div class="edit">
      <p><h3>在下方修改简介</h3></p>
      <textarea class="editintroduce" id="editintroduce"></textarea>
      <br>
      <button class="submitbt" onclick="submitintro()">提交简介</button>
    </div>
</div>

<div class="comment-con" id="comment-con">
    <textarea id="comment-area"  disabled="disabled"  style="overflow:scroll; overflow-x:hidden;"></textarea>
    <div class="Input_Box">
        <textarea class="Input_text" id="Input_text"></textarea>
        <div class="Input_Foot">
            <a class="postBtn" onclick="sendcomment()">发射</a>
            <a class="postBtn" id="danmuIO" onclick="switchdanmu()">关弹幕</a>            
        </div>
    </div>
</div>
<body>     
<script type="text/javascript" src="js/Live.js"></script> 
<script type="text/javascript" src="js/easydialog.js"></script> 
<script type="text/javascript" src="js/easydialog.min.js"></script> 
</html>