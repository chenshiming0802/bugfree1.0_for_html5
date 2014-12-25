(function(B,T,Mod,View){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		_currentBodyView:null,
		_currentNavName:null,
		_currentChildView:null,
		onCreate:function(){  
			var that = this , doc = document;
 
			that.nav = doc.getElementById("nav");
			that.headerTitle = doc.getElementById("headerTitle");
			
			that.currentView.evalJS("window.startup.onResume([])");//第一个页面，需要手动触发resume动作
 			return true;
		},
		onResume:function(extra){   
			var that = this , doc = document;

			/*如果没有登录过，则跳转到登录画面*/
			if(Mod.hasUserSession()===false){
				that._logout();
				return false;
			}	

			var sty = {top:"48px",bottom:"48px"};
			that.assignmeView = T.createView("index_assignme.html","assignme",sty,{});
			that._showView("assignme");
			return true;
		},  
		onJs:function(){  
			var that = this , doc = document;
			var sty = {top:"48px",bottom:"48px"};
			that.mecreateView = T.createView("index_assignme.html","mecreate",sty,{});
			
			/*绑定nav的按钮事件*/
			T.on("tap",that.nav,function(e){
				var obj = T.getParentArticle(e.target,"A");
				if(!obj || !obj.id)	return;				
				if(that._currentNavName && that._currentNavName==obj.id) return; //如果重复点击同一个nav item，则请求不处理

				T.l("tap nav:"+obj.id);
				
				switch(obj.id){
					case "logoutA":
						that._tapLogoutBt();
						break;
					default:
						that._showView(obj.id);	
						break;
				}

			});
		}, 
		_showView:function(id,navObj){
			var that = this;
			var v,extra;
			switch(id){
				case "assignme":
					v = that.assignmeView;
					that.headerTitle.innerText = "指派给我的任务";
					extra = {isAssignMe:"1"};	
					break;
				case "mecreate":
					v = that.mecreateView;
					that.headerTitle.innerText = "我创建的任务";
					extra = {isMeCreate:"1"};				 				
					break;
			}
			if(that._currentChildView) that._currentChildView.hide("none");
			
			that.currentView.append(v);	
			
			v.show(extra);	
			
			that._currentNavItem = id;
			that._currentChildView = v;			
		},
		/*注销操作*/ 
		_tapLogoutBt:function(){
			var that = this,doc=document;
			
			plus.nativeUI.confirm( "您确认是要退出帐号登录吗?", function(e){
				if(e.index==0){
					that._logout();		
				}
			}, "nativeUI", ["退出登录","取消操作"] );			

			
			//that.currentView.close();
		},
		_logout:function(){
			var that = this;
			Mod.clearUserSession();		
			
			var v = T.createView("login.html","login",{},{},false);
			v.show([]);		
			that.currentView.hide();
		}
	});  
	
	window.page = new page();
})(window.base,window.tools,window._mod,window.View);
