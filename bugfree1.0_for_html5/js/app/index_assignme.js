(function(B,T,Mod){
	"use strict";
			
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){  
			var that = this,doc =document;
			that.data_ul = doc.getElementById("data_ul");
			that.currentIndex = 0;//当前页数
			
			//页面模板
			var source = doc.getElementById("template").innerHTML;
			that.template = Handlebars.compile(source);	
			
			return true;
		}, 
		onResume:function(extra){    
			var that = this , doc = document;
			that.isAssignMe = extra.isAssignMe||"0"; 
			that.isMeCreate = extra.isMeCreate||"0"; 
			that.queryString = extra.queryString||""; 

			that._renderData(1,function(data){					 	
				var result = that.template(data);  
				that.data_ul.innerHTML = result ;		
				that.currentIndex = 1;
			});	
			that.setPullRefresh("pullrefresh",that.onPullRefresh,that.onPullLoadMore);
			
			//that.onPullLoadMore();
			return true;	
		},
		onJs:function(){    
			var that = this , doc = document;
			var ul = doc.getElementById("data_ul");
			var sty = {top:"0px",bottom:"0px"};
			var sView = T.createView("service.html","service",sty,[]);
			T.on("tap",ul,function(e){
				var article = T.getParentArticle(e.target,"LI");
				var bugId = article.getAttribute("bugId");				
				sView.show({bugId:bugId});
			});
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
		/*下拉刷新*/
		onPullRefresh:function(){
			var that = window.page,doc = document;
			console.log(that);
			that._renderData(1,function(data){					 	
				var result = that.template(data);  
				that.data_ul.innerHTML = result ;
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				mui('#pullrefresh').pullRefresh().refresh(true);
				that.currentIndex = 1;
				
				plus.nativeUI.toast("最新数据加载完成！");
			});	
		},
		/*下拉读取更多*/
		onPullLoadMore:function(){
			var that = window.page,doc = document;
			that.currentIndex += 1;
			that._renderData(that.currentIndex,function(data){		 	
				var result = that.template(data);  
				that.data_ul.innerHTML += result ;
				var flag = false;
				if(data.datas.length<that.pageSize){
					flag = true;
				}
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(flag); 
			});				
		}, 
		refresh:function(){
			var that = this;
			that.onPullRefresh();
		}
		 
	});  
	
	window.page = new page();
})(window.base,window.tools,window._mod);
