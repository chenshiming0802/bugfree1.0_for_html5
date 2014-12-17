(function(B,T){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{

		onCreate:function(){  
			var that = this , doc = document;
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
			 	 
			 		T.removeClass(that.cuNavItem,"mui-active");
					T.addClass(e.target.parentElement,"mui-active");					
				 
					that._loadPage(e.target.parentElement.id,true);
					that._loadPage(that.cuNavItem.id).hide();
					
					that.cuNavItem = e.target.parentElement;							 				
				});
			});
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
})(window.base,window.tools);
