     
     
      //搜索主播
     document.getElementById("close_name").onclick=function(){
    	document.getElementById("input_name").value="";
    	document.getElementById("input_psw").value="";
	    };
	 document.getElementById("close_psw").onclick=function(){
	     document.getElementById("input_psw").value="";
        };
	 document.getElementById("close_registername").onclick=function(){
		 document.getElementById("register_name").value="";
		 document.getElementById("register_psw").value="";
		 document.getElementById("register_psw2").value="";
		};
	 document.getElementById("close_registerpsw").onclick=function(){
		 document.getElementById("register_psw").value="";
		};
	 document.getElementById("close_registerpsw2").onclick=function(){
		 document.getElementById("register_psw2").value="";
	   	};
 
	    		    		    	
     
     function searchhost() {
    	 
	     var list=document.getElementById("livelist");
	     var id=document.getElementById("search").value;
	     document.getElementById("hintifo").innerHTML="搜索结果";
		         
	     //将已有的主播信息隐藏
	     for(var i=0;i<livelist.childNodes.length;i++)
    	 {
	        livelist.childNodes[i].style.display='none';
    	 }
	     var searchres=0;
	     //显示符合条件的主播
	     for(var i=0;i<livelist.childNodes.length;i++)
	    	 {
		         if( fuzzysearch(id,livelist.childNodes[i].getAttribute("id"))){
		        	 livelist.childNodes[i].style.display='block';
		        	 searchres=1;
		         }
	    	 }
	     if(searchres==0){
	    	 var divnode = document.createElement("div");
	         var pnode = document.createElement("h2");
	         pnode.innerHTML="未找到你要的主播信息";
	         divnode.setAttribute("id","id");
	         divnode.appendChild(pnode);
	         livelist.appendChild(divnode);
	     }
	}
    //接受消息后的处理
    websocket.onmessage = function(event){
    	
    	var obj = eval('(' +event.data+ ')');
		switch(obj.type){
		    //登陆回执
	    	case "relogin":
	    		if(obj.value=="true"){
	    			document.getElementById("login").style.visibility='hidden';
	    			document.getElementById("register").style.visibility='hidden';
	    			var temp=document.getElementById("usernamed");
	    			temp.style.visibility='visible';
	                sessionStorage.loginstatus="true";
	    			temp.value=sessionStorage.username;
	    			document.getElementById("layout").style.visibility='visible';
	                
	    			$("#login_location").hide();
	    			$("#register_location").hide();
	    			}
	    		else{
	    			   alert("账号或者密码错误请重试");
	    			}
	    		break;
	    	//注册回执
	    	case "reregister":
			if(obj.value=="true")
				{
				    var res=confirm("注册成功，现在去登陆？")
	                if(res==true)
	                	{
	                	   switchtologin();
	                	   document.getElementById("input_name").value=sessionStorage.username;
	                	}
	                else
	                	{
	                	   $("#register_location").hide();
	                	}
				}
			else{
				alert("该用户名已经被注册了,请尝试其他ID");
			    }break;
			//直播列表
	    	case "reliveifo":
	    		 document.getElementById("hintifo").innerHTML="全部直播";
	    		var livelist=document.getElementById("livelist");
	    		
	    		livelist.innerHTML = '';
	    		
	    		var data=obj.value;
	    		var i=1;
	    		
	    		//动态添加直播信息
	    	    for(var o in data){  
	    	    	    var divnode = document.createElement("div");
	    		        var anode=document.createElement("a");
	    		        var imgnode = document.createElement("img");
	    		        var pnode = document.createElement("h4");
	
	    		        divnode.className="divnode";
	    		        divnode.setAttribute("id",data[o].username);
	    		        i=(i+1)%9;
	    		        imgnode.className="imgnode";
	    		        pnode.className="pnode";
	    		        pnode.innerHTML ="主播ID："+data[o].username;
	    		        imgnode.setAttribute("src","image/"+i+".jpg");
	    		        
	    		        anode.href="watch.jsp?"+data[o].username+"&"+data[o].SeriesId;
	    		        anode.appendChild(imgnode);
	    		        divnode.appendChild(anode);
	    		        divnode.appendChild(pnode);
	    		        livelist.appendChild(divnode);
	    		 }
	    	    break;
	    	  //无直播时调用
	    	case "reliveifonull":
	    		 var livelist=document.getElementById("livelist");
	    		 livelist.innerHTML="<br>暂无直播内容，刷新试试<br><br>";
	    		 break;
		}
	}