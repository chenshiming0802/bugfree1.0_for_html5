(function(B,T){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{

		onCreate:function(){  
			console.log("index#onCreate");
			var that = this;
			that.nav = document.getElementById("nav");
	 		that.cuNavItem = document.getElementById("assignme");
			that._loadPage("assignme").show(); 
		},
		onResume:function(){   
			console.log("index#onResume");
		},  
		onJs:function(){  
			console.log("index#onJs");
			var that = this; 
			/*绑定nav的按钮事件*/
			T.each(that.nav.children,function(element){  
				T.on("click",element,function(e){			 
			 		if(that.cuNavItem == e.target.parentElement) return;
			 	 
			 		T.removeClass(that.cuNavItem,"mui-active");
					T.addClass(e.target.parentElement,"mui-active");					
				 
					that._loadPage(e.target.parentElement.id).show();
					that._loadPage(that.cuNavItem.id).hide();
					
					that.cuNavItem = e.target.parentElement;							 				
				});
			});
		}, 
		/*加载body UI*/
		_loadPage:function(id){
			var that = this; 
			var bodyView = plus.webview.getWebviewById(id);
			if(!bodyView){
				bodyView = plus.webview.create("index_"+id+".html",id,{top:"48px",bottom:"48px"});
				if(id=="assignme"){
					this.setPullRefresh(bodyView);//支持下拉刷新
					this.setPullLoadMore(bodyView);//支持上拉读取更多					
				}	
				plus.webview.currentWebview().append(bodyView);		
			}
			return bodyView; 	
		},
	});  
	
	window.page = new page();
})(window.base,window.tools);
