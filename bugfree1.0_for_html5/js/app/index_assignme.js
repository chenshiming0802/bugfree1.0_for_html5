(function(B,T){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){  
			this.isAssignMe = this.currentView.isAssignMe||"0"; 
			this.isMeCreate = this.currentView.isMeCreate||"0"; 
			this.queryString = this.currentView.queryString||"";
 			
		}, 
		onResume:function(extra){    
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
			var sty = {top:"48px",bottom:"48px"};
			var sView = that.createView("service.html","service",sty,{bodyUrl:"service_body.html"});	
			T.on("click",ul,function(e){
				var article = T.getParentArticle(e.target,"LI");
				var bugId = article.getAttribute("bugId");
				T.l("  assign click:"+bugId);
				
				sView.show('slide-in-right', 100);	
		 
				that.resumeView(sView, {bugId:bugId});  
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
