(function(B,T){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){  
			this.isAssignMe = this.currentView.isAssignMe||"0"; 
			this.isMeCreate = this.currentView.isMeCreate||"0"; 
			this.queryString = this.currentView.queryString||"";
 			
 			/*
			mui.init({
			  gestureConfig:{
			   tap: true, //默认为true
			   doubletap: true, //默认为false
			   longtap: true, //默认为false
			   swipe: true, //默认为true
			   drag: true //默认为true
			  }
			});
			*/
		}, 
		onResume:function(){    
			var that = this , doc = document;
			T.getRemoteJsonByProxy("buginfos2.php",
				{
					"pageIndex":"1",
					"pageSize":"10",
					"isAssignMe":that.isAssignMe,
					"isMeCreate":that.isMeCreate,
					"queryString":that.queryString,
				},
				function(data){
					var source = doc.getElementById("template").innerHTML;
					var template = Handlebars.compile(source);				 	
					var result = template(data);  
					doc.getElementById("data_ul").innerHTML += result ;
				}
			);

		}, 
		onJs:function(){    
			var that = this , doc = document;
			var ul = doc.getElementById("data_ul");
			
			var sView = that.createView("service.html","service",{},{bodyUrl:"service_body.html",bugId:"000100"});	
			T.on("click",ul,function(e){
				var article = T.getParentArticle(e.target,"LI");
				var bugId = article.getAttribute("bugId");
				console.log("  assign click:"+bugId);
				
				sView.show('slide-in-right', 100);	
				that.resumeView(sView);
			}); 
			/*
			T.on("touchstart",ul,function(e){
				if(that.touchElement){
					T.removeClass(that.touchElement,"gc_b2");
				}				
				var article = T.getParentArticle(e.target,"LI");
				T.addClass(article,"gc_b2");
				that.touchElement = article;
			});*/
 
		}, 
 

		onPullRefresh:function(){
		},
		onPullLoadMore:function(){
		}, 
		 
	});  
	
	window.page = new page();
})(window.base,window.tools);
