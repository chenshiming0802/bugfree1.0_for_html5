(function(B,T,Mod){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){
			var that = this , doc = document; 
			//this.isAssignMe = this.currentView.isAssignMe||"0"; 
			that.userName = doc.getElementById("userName");
			that.userPassword = doc.getElementById("userPassword");
			that.loginBt = doc.getElementById("loginBt");
			
		}, 
		onResume:function(extra){    
			var that = this , doc = document;

		},  
		onJs:function(){    
			var that = this , doc = document;
			/*预加载index画面*/
			//var sView = null;
			var sView = T.createView("index.html","index",{},{},false);
			/*登录按钮点击*/
			T.on("tap",that.loginBt,function(e){
				T.l("tap2 loginBt");
				if(that.userName.value==""||that.userPassword.value==""){
					plus.nativeUI.toast("请输入登录帐号名和登录密码。" );
					return;
				}
				Mod.getRemoteJsonByProxy("dologin2.php",
					{
						"userName":that.userName.value,
						"userPassword":that.userPassword.value,
					},
					function(json){
						var user = {
		                    userName:json.userName,
		                    userRealName:json.userRealName,
		                    bugUserEmail:json.bugUserEmail,
		                    ucore1:json.ucore1		 	
						};
						Mod.setUserSession(user);
						sView.show('slide-in-right', 150);
						that.currentView.close();
					}
				);				
			});
		}, 
		 
	});  
	
	window.page = new page();
})(window.base,window.tools,window._mod);
