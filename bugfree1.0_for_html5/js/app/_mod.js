/* Page的基类，理论上非不得已的情况下都放在tools下 */
(function(T){
	"use strict"
 
	window._mod =  {
		/*是否登录过*/
		_SESSION_USER_NAME:"userName",
		_SESSION_USER_RNAME:"userRealName",
		_SESSION_USER_EMAIL:"bugUserEmail",
		_SESSION_USER_UCROE1:"ucore1",
		hasUserSession:function(){
			var that = this;
			var ucore1 = T.storage_get(that._SESSION_USER_UCROE1);
			T.l("hasUserSession:"+ucore1);
			
			if(ucore1){
				return true;
			}else{
				return false;
			}
		},
		/*设置当前用户信息*/
		setUserSession:function(user){
			var that = this;
			T.storage_set(that._SESSION_USER_NAME,user.userName);
			T.storage_set(that._SESSION_USER_RNAME,user.userRealName);
			T.storage_set(that._SESSION_USER_EMAIL,user.bugUserEmail);
			T.storage_set(that._SESSION_USER_UCROE1,user.ucore1);
			
			console.log("setUserSession:"+user.ucore1);
			console.log(T.storage_get(that._SESSION_USER_UCROE1));			
		},
		/*获取用户信息*/
		getUserSession:function(){
			var that = this;	
			if(!that.hasUserSession()){
				return null;
			}
			var user = {
				userName:T.storage_get(that._SESSION_USER_NAME),
				userRealName:T.storage_get(that._SESSION_USER_RNAME),
				bugUserEmail:T.storage_get(that._SESSION_USER_EMAIL),
				ucore1:T.storage_get(that._SESSION_USER_UCROE1),
			};
			console.log("getUserSession:");
			console.log(user);
			
			return user;
		},
		/*清空用户信息*/
		clearUserSession:function(){
			var that = this;
			T.storage_remove(that._SESSION_USER_NAME);
			T.storage_remove(that._SESSION_USER_RNAME);
			T.storage_remove(that._SESSION_USER_EMAIL);
			T.storage_remove(that._SESSION_USER_UCROE1);
		},
		/*
		getRemoteJsonByProxy:function(serviceName,posts,successFunction,errorFunction){
			var that = this;
			var baseUrl = "http://testenv.bsp.bsteel.net/baosteel_cas2/service_proxy2.jsp";
			var url = baseUrl + "?_SERVICE_=" + serviceName; 
			console.log(" post-url="+url);
			console.log(" post-posts="+posts);
			mui.post(url, posts, successFunction, 'json');
		},*/
		
		/*业务功能:*/
		getRemoteJsonByProxy:function(serviceName,posts,successFunction,errorFunction){
			var that = this;
			var baseUrl = "http://testenv.bsp.bsteel.net/baosteel_cas2/service_proxy2.jsp";
			var u = baseUrl + "?_SERVICE_=" + serviceName; 
			//u = "http://192.168.1.107/test/posttest.php?id=1";
 
			
			var sep = "";
			var postData = "";
			for(var p in posts){
				postData += sep + p + "=" + posts[p];
				sep = "&";
			}
			
			var xhr=new plus.net.XMLHttpRequest();
			xhr.onreadystatechange=function(){
				if(xhr.readyState == 4){
					if ( xhr.status == 200 ) {				
						var str = xhr.responseText;
						tools.l("  return.200="+str); 
						var data = [];
						try{
							data = eval('(' + str + ')');
						}catch(e){
							data.resultFlag = "1";
							data.resultMessage = "网络错误";
						}
						if(data.resultFlag=="0"){
							successFunction(data);
						}else{
							errorFunction = errorFunction || alert;
							errorFunction("网络错误");
						}
					}else{
						tools.l("  return.status="+xhr.status);
					}
				}
			};
			xhr.open("POST", u);
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			var user = that.getUserSession();
			if(user && user.ucore1){
				console.log("user.ucore1:"+user.ucore1);	
				xhr.setRequestHeader("ucore1",user.ucore1);
			}
			// xhr.setRequestHeader("ucore1","ADE1C062E16EAB4AACA11F7F89053FFD");
			// xhr.send("pageIndex=1&pageSize=20 ");//
			xhr.send(postData);
			tools.l("post "+u);
			tools.l("   data:"+postData)
		},
	};
	
})(window.tools);
 