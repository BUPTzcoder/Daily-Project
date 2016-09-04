import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DBhelper {
	private static String JDBC_DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
	private static String DB_URL = "jdbc:sqlserver://localhost:1433; DatabaseName=livePlatfrom";
	private static String USER = "sa";
	private static String PASS = "123";
	
	public static Connection getConnect(){
		Connection conn = null;
	    try{
	       Class.forName(JDBC_DRIVER);
	    }catch(ClassNotFoundException e){
	    	System.out.println("wcale");
	    	e.printStackTrace();
	    	
	    }
	    try{ 
	    	conn = DriverManager.getConnection(DB_URL,USER,PASS);
	    	   System.out.println("连接数据库成功！");
	    }catch(SQLException e){
	    	e.printStackTrace();
	    	System.out.println("22222222hahaha");
	    }
	    return conn;
	}
	
	public static void close(Connection conn,Statement st){
		//连接不为空则进行释放
		if(conn!=null){
			try{
				conn.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}
		
		if(st!=null){
			try{
				st.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}
	}
	
	public static void close(Connection conn,PreparedStatement st){
		if(conn!=null){
			try{
				conn.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}
		
		if(st!=null){
			try{
				st.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}
	}
	
	public boolean login(String username,String pwd){
		
		Connection connection=getConnect();
		if(connection==null) return false;
		
		Statement statement = null;
		try{
			String sql = "select * from loginfo where username='"+username+"'";
			System.out.println(sql);
			statement = connection.createStatement();
			ResultSet rset = statement.executeQuery(sql);
			
			if(rset!=null){
				rset.next();
				if(rset.getString("pwd").equals(pwd))
					   return true;
			}
		}catch(SQLException e){
			e.printStackTrace();
			return false;
		}finally {
			close(connection, statement);
		}
		return false;
	}
    public  boolean register(String username,String pwd){
		
		Connection connection=getConnect();
		if(connection==null) return false;
		
		Statement statement = null;
		try{
			String sql = "insert into loginfo values('"+username+"','"+pwd+"')";
			statement = connection.createStatement();
			
			int rset = statement.executeUpdate(sql);
			if(rset==1){
				return true;
			}
			System.out.println(2);
		}catch(SQLException e){
			e.printStackTrace();
			return false;
		}finally {
			close(connection, statement);
		}
		return false;
	 }
    
    public boolean addliveifo(String SeriesId,String username){
    	Connection connection=getConnect();
		if(connection==null) return false;
		
		Statement statement = null;
		String sql = "insert into liveinfo values('"+username+"','"+SeriesId+"')";
		int rset;
		try {
			statement = connection.createStatement();
			rset = statement.executeUpdate(sql);
			if(rset==1){
				return true;
			}
		} catch (SQLException e) {
			
				return false;
		}
		finally {
			close(connection, statement);
		}
		return false;
    }
    
    public void removeliveinfo(String username)
    {
    	Connection connection=getConnect();
		if(connection!=null)
		{
			Statement statement = null;
			String sql = "delete from liveinfo where username='"+username+"'";
			try {
				statement = connection.createStatement();
				statement.executeUpdate(sql);
			} catch (SQLException e) {
			    System.out.println("重复删除了这里");
			}
			finally {
				close(connection, statement);
			}
		}
    }
    
    public ArrayList<String[]> getliveifo()
    {
        
        ArrayList<String[]> res=new ArrayList<String[]>();
        
        Connection connection=getConnect();
		if(connection==null) return null;
		
		Statement statement = null;
		String sql = "select * from liveinfo";
		
		try {
			statement = connection.createStatement();

			ResultSet rset = statement.executeQuery(sql);
			
			if(rset==null) return null;
			else
			{
				while(rset.next())
				{
					 String record[]=new String[2];
					 record[0]=rset.getString("username");
				     record[1]=rset.getString("SeriesId");
				     System.out.println("shujvku"+record[0]+record[1]);
				     res.add(record);
				}
				if(res.size()==0) return null;
				return res;
			}
		} catch (SQLException e) {
			return null;
		}
		finally {
			close(connection, statement);
		}
    }
    
    public boolean updateintro(String username,String intro){
    	Connection connection=getConnect();
		if(connection==null) return false;
		
		Statement statement = null;
		String sql = "update intro  set introduce='"+intro+"'where username='"+username+"'";
		try {
			statement = connection.createStatement();
			int rset = statement.executeUpdate(sql);
			if(rset==1){
				return true;
			}
			else
			{
				sql ="insert into intro values('"+username+"','"+intro+"')";
				statement = connection.createStatement();
				rset = statement.executeUpdate(sql);
				if(rset==1)
					return true;
				else
					return false;
			}
		} catch (SQLException e) {
			return false;
		}
		finally {
			close(connection, statement);
		}
    }
    
    public String getintroc(String username)
    {
    	Connection connection=getConnect();
		if(connection==null) return "主播暂无简介";
		
		Statement statement = null;
		String sql = "select * from intro where username='"+username+"'";
		
		
		try {
			statement = connection.createStatement();
			ResultSet rset = statement.executeQuery(sql);
			if(rset!=null){
				rset.next();
				return rset.getString("introduce");
			}
			else
				return "主播暂无简介";
		} catch (SQLException e) {
			return "主播暂无简介";
		}
		finally {
			close(connection, statement);
		}
    }
}