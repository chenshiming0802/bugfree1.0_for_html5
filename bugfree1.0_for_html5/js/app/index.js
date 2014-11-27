(function(B,T){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{

		onCreate:function(){  
			var that = this , doc = document;
			that.nav = doc.getElementById("nav");
			
	 		that.cuNavItem = doc.getElementById("assignme");
			that._loadPage("assignme",true);

			that.resume([]);
		},
		onResume:function(extra){   
			console.log("index#onResume");
		},  
		onJs:function(){  
			var that = this , doc = document;
			
			that._loadPage("mecreate",false);
			
			/*绑定nav的按钮事件*/
			T.each(that.nav.children,function(element){  
				T.on("click",element,function(e){			 
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
			var that = this; 
			var bodyView = plus.webview.getWebviewById(id);
			if(!bodyView){
				var sty = {top:"48px",bottom:"48px"};
				switch(id){
					case "assignme":
						var pageName = "assignme";
						var extra = {isAssignMe:"1"};
						
						bodyView = plus.webview.create("index_"+pageName+".html",id,sty,extra);
						
						this.setPullRefresh(bodyView);//支持下拉刷新
						this.setPullLoadMore(bodyView);//支持上拉读取更多	
						break;
					case "mecreate":
						var pageName = "assignme"; 
						var extra = {isMeCreate:"1"};
						document.getElementById("headerTitle").innerText = "我创建的任务";
						bodyView = plus.webview.create("index_"+pageName+".html",id,sty,extra);
						this.setPullRefresh(bodyView);//支持下拉刷新
						this.setPullLoadMore(bodyView);//支持上拉读取更多	
						
						break;						
				}
			}
			if(isShow===true){
				//展现UI需要更新title文字
				switch(id){
					case "assignme":
						document.getElementById("headerTitle").innerText = "指派给我的任务";
						break;
					case "mecreate":
						document.getElementById("headerTitle").innerText = "我创建的任务";
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
