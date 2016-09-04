        function onloadop(){
        	if(sessionStorage.loginstatus=="true")
        		{
        		    document.getElementById("live-title").innerText=sessionStorage.username+"的直播间    ";	
        		}
        	else
        		{
        		   alert('您尚未登陆,请返回首页登陆后开始直播');
        		   window.location.href="index.jsp#livelist";
        		}
        }  
       //弹幕相关
        var damoo = Damoo('dm', 'dm-canvas', 20);
        damoo.start();
        
        function generatecolor(){    
        	  return  '#' +    
        	    (function(color){    
        	    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
        	      && (color.length == 6) ?  color : arguments.callee(color);    
        	  })('');    
        } 
        function emit(x){
        	damoo.emit({ text: x, color: generatecolor() });
        }
        function switchdanmu(){
        	var x=document.getElementById("danmuIO");
        	if(x.innerHTML=="关弹幕"){
        	   damoo.hide();
        	   x.innerHTML="开弹幕"
        	}
        	else{
        		damoo.show();
        		x.innerHTML="关弹幕"
        	}
        }
        
       
        var websocket = null;
        var livestatus=false;
        
        if('WebSocket' in window){
        	websocket = new WebSocket("ws://localhost:8080/LivePlatfrom2.0/websocket");
        }
        else{
        	 alert('你的浏览器版本太旧啦！请升级到高版本浏览器');
             winndow.location.href="index.jsp";
        }
        
        websocket.onerror = function(){
        	alert("连接服务器错误！请重试！"); 
        };
       
        //处理消息
        websocket.onmessage = function(event){
        	
        	console.log(event.data);
        	
        	var obj = eval('(' +event.data+ ')');
        	switch(obj.type){
        	//评论
        	case "comment":
        		var temp=obj.msg;            
        		if (temp.indexOf("<br/>") != -1) {
        		   temp=temp.toString().replace(new RegExp("<br/>", 'g'), "\n");
        		}
        		emit(temp);
        		var comment=document.getElementById("comment-area");
        		var fullmsg=obj.username+"   "+CurentTime()+"\n"+temp+"\n";
                var child=document.createTextNode(fullmsg);
                comment.appendChild(child);
            //接受之前的简介
        	case "intro":
        		var temp=obj.value;            
        		if (temp.indexOf("<br/>") != -1) {
        		   temp=temp.toString().replace(new RegExp("<br/>", 'g'), "\n");
        		}
        		document.getElementById("editintroduce").value=temp;
          	    break;
          	//观众人数
        	case "audience":
        		document.getElementById("audiencenum").innerHTML="观众人数："+obj.value;
        		break;
        	//直播出错
        	case "starterror":
        		livastatus=false;
        		alert("您的账号正在直播中,请确保账号安全,将返回");
        		document.getElementById("startlive").disabled=false;
                document.getElementById("finishlive").disabled="disabled";
                document.getElementById("status").innerText="尚未开播";
                document.getElementById("status").style.color="red";
                break;
        	}
        }
        
        //直播状态下退出要关闭直播         
        window.onbeforeunload = function(){
        	if(livestatus)  finishlive();
        	websocket.close();
        }
        
        //结束直播
        function finishlive(){
        	 var o={"type":"endlive","username":sessionStorage.username,"SeriesId":serverId};
        	 sendjson(o);
        	 document.getElementById("startlive").disabled=false;
        	 document.getElementById("finishlive").disabled="disabled";
        	 document.getElementById("status").innerText="未开播";
             document.getElementById("status").style.color="red";
        	 livestatus=false;	 
        }
        
        //开始直播
        function startlive(){
        	var o= {"type":"startlive","SeriesId":serverId,"username":sessionStorage.username};
        	sendjson(o);
        	document.getElementById("startlive").disabled="disabled";
            document.getElementById("finishlive").disabled=false;
            document.getElementById("status").innerText="正在直播";
            document.getElementById("status").style.color="green";
            livestatus=true;
        }
        
        //提交简介
        function submitintro() {
        	if(!livestatus)
        		{
        		   alert("尚未开始直播，不可修改简介");
        		   return;
        		}
        	var introducevalue=document.getElementById("editintroduce").value;
        	
        	if(introducevalue.length>200)
        		{
        		  //这里要再修改
        		  introducevalue=introducevalue.subString(0,200);
        		}
        	
        	var o= {"type":"introduce","intro":editintroduce.value,"username":sessionStorage.username,"SeriesId":serverId};
        	sendjson(o);
		}
        
        //发表评论
        function sendcomment(){
        	if(!livestatus) 
        		{
        		   alert("尚未开始直播不可添加评论");
        		   return;
        		}
        	var comment=document.getElementById('Input_text').value;
      	    if(!/^\s*$/.test(comment))
             {
      	       comment=valueReplace(comment);   		  
      		   var o={"type":"comment","SeriesId":serverId,"username":"主播"+sessionStorage.username,"text":comment};
               sendjson(o); 
             }
      	    else{
      	    	alert("请不要发送无用或者空白的内容！");
      	    }
        }
        
        //处理json特殊字符
        function valueReplace(v) {
        	if (v.indexOf("\"") != -1) {
        	v = v.toString().replace(new RegExp('(["\"])', 'g'), "\\\"");
        	}
        	else if (v.indexOf("\\") != -1)
        	v = v.toString().replace(new RegExp("([\\\\])", 'g'), "\\\\");
        	else if(v.indexOf("\n") != -1)
        		v = v.toString().replace(new RegExp("([\\n])", 'g'), "<br/>");
        	return v;
        	}
        
        
        function sendjson(o) {
        	var str=JSON.stringify(o);
        	websocket.send(str);
		}
        
        //获取系统时间        
        function CurentTime()  
        {   
            var now = new Date();  
            var year = now.getFullYear();       
            var month = now.getMonth() + 1;     
            var day = now.getDate();              
            var hh = now.getHours();              
            var mm = now.getMinutes();            
            var ss=now.getSeconds();              
            var clock = year + "-";  
            if(month < 10) clock += "0";         
            clock += month + "-";  
            if(day < 10) clock += "0";   
            clock += day + " ";  
            if(hh < 10) clock += "0";  
            clock += hh + ":";  
            if (mm < 10) clock += '0';   
            clock += mm+ ":";  
            if (ss < 10) clock += '0';   
            clock += ss;  
            return(clock);   
        }  
        
        //处理webrtc连接
        var serverId = location.search.replace('?', '');
        
        if(!serverId) {
            serverId = (+new Date).toString(36) + '_' + (Math.random().toString()).split('.')[1];
        }

        history.replaceState('', '', '?' + serverId);
        
        //在peerjs注册的key，最多支持50个连接
        var peer = new Peer(serverId,  {key: '22upi0erartchaor'});

        navigator.getUserMedia = (navigator.getUserMedia ||
        	    navigator.mozGetUserMedia ||
        	    navigator.msGetUserMedia ||
        	    navigator.webkitGetUserMedia);
        
        var constraints = { audio:true,video: true};
        
        navigator.getUserMedia(constraints, function(stream){
        	
        	
        	var video = document.getElementById("video");
        	window.stream = stream;
        	
        	if (window.URL) {
                video.src = window.URL.createObjectURL(stream);
            } else {
                video.src =stream;
            }
       	    video.play();
        
        }
        , function(err) {
        	alert('获取摄像头失败！');
        	document.getElementById("startlive").disabled="disabled";
            document.getElementById("finishlive").disabled="disabled";
            document.getElementById("status").innerText="尚未开播";
            document.getElementById("status").style.color="red";
        });
        
       
        peer.on('connection', function(conn) {
            conn.on('data', function(clientId){
            	console.log('新连接：' + clientId);
                var call = peer.call(clientId, window.stream);

                call.on('close', function() {
                	console.log('已关闭：' + clientId);
                });
            });
        });
        
        
        
        
        
       
        
        