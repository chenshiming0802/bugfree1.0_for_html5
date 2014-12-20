(function(B,T,Mod){
	"use strict";
			
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){  
			var that = this,doc =document;
			var data_ul = doc.getElementById("data_ul");
			that.isAssignMe = this.currentView.isAssignMe||"0"; 
			that.isMeCreate = this.currentView.isMeCreate||"0"; 
			that.queryString = this.currentView.queryString||""; 
			that.setPullRefresh("pullrefresh",that.onPullRefresh,that.onPullLoadMore);
			
			that.currentIndex = 0;//当前页数
		}, 
		onResume:function(extra){    
			var that = this , doc = document;
		}, 
		_renderData:function(pageIndex,callback){
			var that = this , doc = document;
			Mod.getRemoteJsonByProxy("buginfos2.php",
				{
					"pageIndex":pageIndex,
					"pageSize":that.pageSize,
					"isAssignMe":that.isAssignMe,
					"isMeCreate":that.isMeCreate,
					"queryString":that.queryString,
				},
				callback
			);			
		},
		onJs:function(){    
			var that = this , doc = document;
			var ul = doc.getElementById("data_ul");
			var sty = {top:"0px",bottom:"0px"};
			var sView = that.createView("service.html","service",sty,{bodyUrl:"service_body.html"});	
			T.on("tap",ul,function(e){
				var article = T.getParentArticle(e.target,"LI");
				var bugId = article.getAttribute("bugId");				
				sView.show('slide-in-right', 150);		 
				that.resumeView(sView, {bugId:bugId});  
			});
		}, 
		/*下拉刷新*/
		onPullRefresh:function(){
			var that = window.page,doc = document;
			console.log(that);
			that._renderData(1,function(data){
				var source = doc.getElementById("template").innerHTML;
				var template = Handlebars.compile(source);				 	
				var result = template(data);  
				data_ul.innerHTML = result ;
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				mui('#pullrefresh').pullRefresh().refresh(true);
				that.currentIndex = 1;
			});	
		},
		/*下拉读取更多*/
		onPullLoadMore:function(){
			var that = window.page,doc = document;
			that.currentIndex += 1;
			that._renderData(that.currentIndex,function(data){
				var source = doc.getElementById("template").innerHTML;
				var template = Handlebars.compile(source);				 	
				var result = template(data);  
				data_ul.innerHTML += result ;
				var flag = false;
				if(data.datas.length<that.pageSize){
					flag = true;
				}
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(flag); 
			});				
			
		}, 
		 
	});  
	
	window.page = new page();
})(window.base,window.tools,window._mod);
