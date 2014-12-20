/* Page的基类，理论上非不得已的情况下都放在tools下 */
(function(T){
	"use strict"
 
	window._mod =  {
		/*是否登录过*/
		_KEY_USER_SESSION:"usersummary",
		hasUserSession:function(){
			var that = this;
			if(that.getUserSession(that._KEY_USER_SESSION)){
				return true;
			}else{
				return false;
			}
		},
		/*设置当前用户信息*/
		setUserSession:function(data){
			var that = this;
			T.storage_set(that._KEY_USER_SESSION,data);
		},
		/*获取用户信息*/
		getUserSession:function(){
			var that = this;
			return T.storage_get(that._KEY_USER_SESSION);
		},
		/*清空用户信息*/
		clearUserSession:function(){
			var that = this;
			T.storage_remove(that._KEY_USER_SESSION);
		},
		
		
		/*业务功能:*/
		getRemoteJsonByProxy:function(serviceName,posts,successFunction,errorFunction){
			var that = this;
			var baseUrl = "http://testenv.bsp.bsteel.net/baosteel_cas2/service_proxy2.jsp";
			var u = baseUrl + "?_SERVICE_=" + serviceName; 
			//u = "http://192.168.1.107/test/posttest.php?id=1";
			
			/*
			var forms = new FormData();  
			for(var p in posts){
				console.log(p+"::"+posts[p])
				forms.append(p, posts[p]);	
			}*/
			
			var sep = "";
			var postData = "";
			for(var p in posts){
				postData += sep + p + "=" + posts[p];
				sep = "&";
			}
			
			var xhr=new plus.net.XMLHttpRequest();
			xhr.onreadystatechange=function(){
				tools.l("  return.readyState="+xhr.readyState);
				if(xhr.readyState == 4){
					if ( xhr.status == 200 ) {				
						tools.l("  return.200="+xhr.responseText); 
						var str = xhr.responseText;
						//alert(str);
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
			console.log(user);
			if(user && user.ucore1){
				console.log("user.ucore1:"+user.ucore1);	
				xhr.setRequestHeader("ucore1",user.ucore1);
			}
			xhr.setRequestHeader("ucore1","ADE1C062E16EAB4AACA11F7F89053FFD");
			// xhr.send("pageIndex=1&pageSize=20 ");//
			xhr.send(postData);
			tools.l("post "+u);
			tools.l("   data:"+postData)
		},		
	};
	
})(window.tools);
 