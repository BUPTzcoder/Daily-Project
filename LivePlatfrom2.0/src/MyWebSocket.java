import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArraySet;
 
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import net.sf.json.JSONObject;
 
//该注解用来指定一个URI，客户端可以通过这个URI来连接到WebSocket。类似Servlet的注解mapping。无需在web.xml中配置。
@ServerEndpoint("/websocket")
public class MyWebSocket {
    private static int onlineCount = 0;
     
    //private static CopyOnWriteArraySet<MyWebSocket> webSocketSet = new CopyOnWriteArraySet<MyWebSocket>();
    
//    private static Map<Session, MyWebSocket> websocketMap =new HashMap<Session, MyWebSocket>();
    
    private static Map<String,ArrayList<MyWebSocket>> websocketMap=new HashMap<String,ArrayList<MyWebSocket>>();
    
    private static ArrayList<MyWebSocket> alllink=new ArrayList<MyWebSocket>();
    
    private Session session;
    
    private DBhelper db=new DBhelper();
     
    
    @OnOpen
    public void onOpen(Session session){
        this.session = session;
        alllink.add(this);
        addOnlineCount();           //在线数加1
    }
     
    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(){
    	alllink.remove(this);
        subOnlineCount();           //在线数减1    
        System.out.println("有一连接关闭！当前连接数为" + getOnlineCount());
    }
     
    @OnMessage
    public void onMessage(String message, Session session) throws SQLException, IOException {
        System.out.println("来自客户端的消息:" + message);
        
        JSONObject json = JSONObject.fromObject(message); 
        Iterator itt = json.keys();
     
        
        if(itt.hasNext()){
        	String type=json.getString("type");
        	String returntext;
            switch(type)
            {
            	case "introduce":
            		boolean modify=db.updateintro(json.getString("username"),json.getString("intro"));
            		if(modify){
	            		  ArrayList<MyWebSocket> groupList=websocketMap.get(json.getString("SeriesId"));
	            		  if(groupList==null) break;
	            		  for(int i=1;i<groupList.size();i++)
	            		  {
	            			returntext="{\"type\":\"intro\",\"value\":\""+json.getString("intro")+"\"}";
	            		    groupList.get(i).sendMessage(returntext);
	            		  }
            		}
            		break;
            	case "startlive":
            		if(!db.addliveifo(json.getString("SeriesId"), json.getString("username")))
            		{
            			returntext="{\"type\":\"starterror\"}";
            			this.sendMessage(returntext);
            		}
            		ArrayList<MyWebSocket> thelist=new ArrayList<>();
            		thelist.add(this);
            		websocketMap.put(json.getString("SeriesId"),thelist);
            		String intro=db.getintroc(json.getString("username"));
            		returntext="{\"type\":\"intro\",\"value\":\""+intro+"\"}";
            		this.sendMessage(returntext);
            		break;
            	case "endlive":
            		db.removeliveinfo(json.getString("username"));
            		removetheHost(json.getString("SeriesId"));
                    break;
            	case "startwatch":
            		ArrayList<MyWebSocket> addlist=websocketMap.get(json.getString("SeriesId"));
            		if(addlist==null)break;
            		addlist.add(this);
            		String intro1=db.getintroc(json.getString("username"));
            		returntext="{\"type\":\"intro\",\"value\":\""+intro1+"\"}";
            		this.sendMessage(returntext);
            		int audiencenum=addlist.size()-1;
            		returntext="{\"type\":\"audience\",\"value\":\""+String.valueOf(audiencenum)+"\"}";
            		addlist.get(0).sendMessage(returntext);
            		
            		returntext="{\"type\":\"comment\",\"username\":\"系统消息\",\"msg\":\""+json.getString("userID")+"进入直播间\"}";
            		for(int i=0;i<addlist.size();i++)
            		{
            		    addlist.get(i).sendMessage(returntext);
            		}
            		
            		break;
            	case "endwatch":
            		ArrayList<MyWebSocket> list=websocketMap.get(json.getString("SeriesId"));
            		if(list==null)break;
            		list.remove(this);
            		returntext="{\"type\":\"audience\",\"value\":\""+String.valueOf(list.size()-1)+"\"}";
            		list.get(0).sendMessage(returntext);     		
            		break;
            	case "login":
            		 boolean res=db.login(json.getString("username"),json.getString("pwd"));
            		 System.out.println(res);
            		 returntext="{\"type\":\"relogin\",\"value\":\""+String.valueOf(res)+"\"}";
            		 this.sendMessage(returntext);
				     break;
            	case "register":
            		boolean registerres=db.register(json.getString("username"), json.getString("pwd"));
            		returntext="{\"type\":\"reregister\",\"value\":\""+String.valueOf(registerres)+"\"}";
            		this.sendMessage(returntext);
				    break;
            	case "getliveifo":
            		ArrayList<String[]> allliveifo=db.getliveifo();
            		if(allliveifo==null||allliveifo.size()==0) {
            			returntext="{\"type\":\"reliveifonull\"}";
               		    this.sendMessage(returntext);
            		}
            		else{
            		returntext="{\"type\":\"reliveifo\",\"value\":[";
            		Iterator<String[]> it =allliveifo.iterator();
            		
            		while(it.hasNext()){
            			String[] str=(String[])it.next();
                    	String temp="{\"username\":\""+str[0]+"\",\"SeriesId\":\""+str[1]+"\"},";
                    	returntext+=temp;
                    }
                    returntext=returntext.substring(0,returntext.length()-1)+"]}";
                    System.out.println(returntext);
                    this.sendMessage(returntext);
            		}
            		break;
            	case "comment":
            		ArrayList<MyWebSocket> grouplist=websocketMap.get(json.getString("SeriesId"));
            		if(grouplist==null) break;
            		returntext="{\"type\":\"comment\",\"username\":\""+json.getString("username")+"\",\"msg\":\""+json.getString("text")+"\"}";
            		for(int i=0;i<grouplist.size();i++)
            		{
            		    grouplist.get(i).sendMessage(returntext);
            		}break;
            }
        }
        
    }
     
    /**
     * 发生错误时调用
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error){
        System.out.println("发生错误");
        error.printStackTrace();
    }
     
   
    public void removetheHost(String seriesID) throws IOException{
    	
    	    ArrayList<MyWebSocket> list=websocketMap.get(seriesID);
    	    if(list!=null){
	    		MyWebSocket temp;
	    		String returntext="{\"type\":\"livefinish\"}";
	    		for(int i=1;i<list.size();i++)
	    		{
	    			temp=list.get(i);
	    			temp.sendMessage(returntext);
	    		}
	    		websocketMap.remove(seriesID);
    	    }
       	    
    	    String returntext="";
    	    ArrayList<String[]> allliveifo=db.getliveifo();
    		if(allliveifo==null||allliveifo.size()==0) {
       		   for(int i=0;i<alllink.size();i++) {
	    	    	alllink.get(i).sendMessage("{\"type\":\"reliveifonull\"}");
	    	    }
    		}
    		else{
	    		returntext="{\"type\":\"reliveifo\",\"value\":[";
	    		Iterator<String[]> it =allliveifo.iterator();
	    		
	    		while(it.hasNext()){
	    			String[] str=(String[])it.next();
	            	String temp="{\"username\":\""+str[0]+"\",\"SeriesId\":\""+str[1]+"\"},";
	            	returntext+=temp;
	            }
	            returntext=returntext.substring(0,returntext.length()-1)+"]}";
	            for(int i=0;i<alllink.size();i++)
	    	    {
	            	
	    	    	alllink.get(i).sendMessage(returntext);
	    	    }
    		}
    }
    
    
    
    
    public void sendMessage(String message) throws IOException{
        this.session.getBasicRemote().sendText(message);
    }
 
    public static synchronized int getOnlineCount() {
        return onlineCount;
    }
 
    public static synchronized void addOnlineCount() {
        MyWebSocket.onlineCount++;
    }
     
    public static synchronized void subOnlineCount() {
        MyWebSocket.onlineCount--;
    }
}