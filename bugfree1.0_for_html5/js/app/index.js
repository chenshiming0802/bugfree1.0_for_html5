(function(B,T,Mod){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{

		onCreate:function(){  
			var that = this , doc = document;
			//如果没有登录过，则跳转到登录画面
			if(Mod.hasUserSession()===false){
				that._logout();
				return;
			}
			
			that.nav = doc.getElementById("nav");
			that.headerTitle = doc.getElementById("headerTitle");
			
	 		that.cuNavItem = doc.getElementById("assignme");
			that._loadPage("assignme",true);

			that.resume([]);
		},
		onResume:function(extra){   

		},  
		onJs:function(){  
			var that = this , doc = document;
			
			that._loadPage("mecreate",false);
			
			/*绑定nav的按钮事件*/
			T.each(that.nav.children,function(element){  
				T.on("tap",element,function(e){			 
			 		if(that.cuNavItem == e.target.parentElement) return;
			 	 	var tapId = e.target.parentElement.id;
			 	 	//如果注销，则执行出小操作后进入登录页面
			 	 	if(tapId=="logoutA"){
			 	 		that._logout();
			 	 		return;
			 	 	}
			 	 	
			 		T.removeClass(that.cuNavItem,"mui-active");
					T.addClass(e.target.parentElement,"mui-active");					
				 
					that._loadPage(e.target.parentElement.id,true);
					that._loadPage(tapId).hide();
					
					that.cuNavItem = e.target.parentElement;							 				
				});
			});
		}, 
		/*注销操作*/
		_logout:function(){
			var that = this,doc=document;
			var v = that.createView("login.html","login",{},{},false);
			v.show("slide-in-left",150);
			that.currentView.close();
		},
		/*加载body UI*/
		_loadPage:function(id,isShow){
			var that = this , doc = document; 
			var bodyView = plus.webview.getWebviewById(id);
			if(!bodyView){
				var sty = {top:"48px",bottom:"48px"};
				switch(id){
					case "assignme":
						var pageName = "assignme";
						var extra = {isAssignMe:"1"};
						bodyView = that.createView("index_"+pageName+".html",id,sty,extra);			
						break;
					case "mecreate":
						var pageName = "assignme"; 
						var extra = {isMeCreate:"1"};
						bodyView = that.createView("index_"+pageName+".html",id,sty,extra);				
						break;						
				}
			}
			if(isShow===true){
				//展现UI需要更新title文字
				switch(id){
					case "assignme":
						that.headerTitle.innerText = "指派给我的任务";
						break;
					case "mecreate":
						that.headerTitle.innerText = "我创建的任务";
						break;					
				}
				that.currentView.append(bodyView);	
				bodyView.show();
				that.resumeView(bodyView);
			}

			return bodyView; 	
		},
	});  
	
	window.page = new page();
})(window.base,window.tools,window._mod);
