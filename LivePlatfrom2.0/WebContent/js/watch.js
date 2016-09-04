              //直播端的串号以及主播ID是通过地址栏传输的
              var temp=location.search.replace('?', '');
              var index=temp.indexOf("&");
              var username=temp.substring(0,index);
              var serverId=temp.substring(index+1);
              //随机生成ID
              var clientId = (+new Date).toString(36) + '_' + (Math.random().toString()).split('.')[1];
         
              document.getElementById("roomname").innerHTML=username+"的直播间";
              
             
              document.title="正在观看————"+username+"的直播间";
              var linkstatus=document.getElementById("linkstatus");
              
              //弹幕相关
              var damoo = Damoo('dm', 'dm-canvas', 20);
              damoo.start();
              
              //随机生成颜色，格式为#111111
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
          
              
              
            
             
              
            //这里是websocket的操作
              var websocket = null;
            
              if('WebSocket' in window){
                	websocket = new WebSocket("ws://localhost:8080/LivePlatfrom2.0/websocket");
               }
              else{
                   alert('你的浏览器版本太旧啦！请升级到高版本浏览器');
                   winndow.location.href="index.jsp";
               }
            
               function sendjson(o) {
            	  var str=JSON.stringify(o);
            	  websocket.send(str);
    		  }
            
            
              websocket.onerror = function(){
                 alert("连接服务器错误！请重试！"); 
              };
              
              //初始化，建立连接
              websocket.onopen = function(event){
            	  var userID;
            	  if(sessionStorage.loginstatus=="true"){
	            		userID=sessionStorage.username;	
	        		}
	            	else{
	                    userID="游客"+clientId;            		
	            	}
            	  var o={"type":"startwatch","SeriesId":serverId,"username":username,"userID":userID};
  		          sendjson(o);
  		          ConnectLive();
              }
            //处理消息
            websocket.onmessage = function(event){
            	var obj = eval('(' +event.data+ ')');
            	switch(obj.type){
            	
            	//直播结束信号
            	case "livefinish":
            		alert("主播已结束直播，去其他直播间看看吧");
            		window.location.href="index.jsp#livelist";
            	     break;
            	 //评论
                 case "comment":
                	 
                	var temp=obj.msg;            
             		if (temp.indexOf("<br/>") != -1) {
             		   temp=temp.toString().replace(new RegExp("<br/>", 'g'), "\n");
             		}
	        		var comment=document.getElementById("comment-area");
	        		emit(temp);
	        		var fullmsg=obj.username+"   "+CurentTime()+"\n"+temp+"\n";
	                var child=document.createTextNode(fullmsg);
	                comment.appendChild(child);
	              //主播简介变动
	              case "intro":
	          		var temp=obj.value;            
	          		if (temp.indexOf("<br/>") != -1) {
	          		   temp=temp.toString().replace(new RegExp("<br/>", 'g'), "\n");
	          		}
	          		document.getElementById("introduce").innerText=temp;
	                break;
        	   }
            }
	           
              //关闭窗口,退出直播
	            window.onbeforeunload = function exitop(){
	            	var o={"type":"endwatch","SeriesId":serverId};
	            	sendjson(o);
	            	websocket.close();
	            }
               
	            //发表评论
	            function sendcomment(){
	            	var comment=document.getElementById('Input_text').value;
	            	//判断不能为空
	          	    if(!/^\s*$/.test(comment)){
	          	    	var username;
	 	            	if(sessionStorage.loginstatus=="true"){
	 	            		username=sessionStorage.username;	
	 	        		}
	 	            	else{
	 	                    username="游客"+clientId;            		
	 	            	}
	 	            	comment=valueReplace(comment); 
	          		    var o={"type":"comment","SeriesId":serverId,"username":username,"text":comment};
	                    sendjson(o); 
	                 }
	          	    else{
	          	    	alert("请不要发送无用或者空白的内容！");
	          	     }
	            }
	            //这里是json特殊字符处理的函数
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
	            //系统当前时间
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
	            
	            
	            
		        function switchalllive(){
		        	 window.location.href="index.jsp#livelist";
		        }
		        function switchlive(){
		        	 window.location.href="Live.jsp";
		        }
	            
	          //  初始化webrtc连接
		        function ConnectLive(){    
		            var peer = new Peer(clientId,  {key: '22upi0erartchaor'});
	            
		            if(!serverId) {
		                alert('没有找到直播信源！去看看其他主播吧');
		                location.href = 'index.jsp#livelist';
		            }
		            var conn = peer.connect(serverId);
		            var timeout=setTimeout(errhint,30000);
		            
		            var errhint=function(){
			            alert("哎呀，主播已经离开了,下次再看吧");
			            window.location.href="index.jsp#livelist";
		            }
		            conn.on('open', function() {
		            	linkstatus.innerHTML="正在请求连接";
		                conn.send(clientId);
		            });
	            peer.on('call', function(call) {
	                call.answer();
	
	                call.on('stream', function(remoteStream) {
	                	clearTimeout(timeout);                 	
	                	linkstatus.innerHTML="直播中";
	                	linkstatus.style.color="green";
	                    
	                    var video = document.getElementById('video');
	                    if (window.URL) {
	                        video.src = window.URL.createObjectURL(remoteStream);
	                    } else {
	                        video.src = remoteStream;
	                    }
	                });
	
	                call.on('close', function() {
	                    console.log('连接被关闭！');
	                });
	            });
		        }
        
       