(function(B,T,Mod){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){
			var that = this , doc = document; 
			that.queryString = doc.getElementById("queryString");
			
			that.data_ul = doc.getElementById("data_ul");
			that.currentIndex = 0;//当前页数
			
			//页面模板
			var source = doc.getElementById("template").innerHTML;
			that.template = Handlebars.compile(source);	
			return true;
		}, 
		onResume:function(extra){    
			var that = this , doc = document;
			//this.isAssignMe = this.currentView.isAssignMe||"0"; 
			console.log(window._runtime);
			return true;

		}, 
		unResume:function(){
			var that = this , doc = document;
		},		
		onJs:function(){    
			var that = this,doc = document;
			T.on("change",that.queryString,function(e){
				console.log("change queryString:"+that.queryString.value);
				if(that.queryString.value.length>=1){
					that.onPullRefresh();
				}
			});
			T.on("tap",that.data_ul,function(e){	
				var obj = T.getParentArticle(e.target,"LI")
				var extra = {
					userName:obj.getAttribute("userName"),
					realName:obj.getAttribute("realName"),			
				};
				console.log("click data_ul:"+JSON.stringify(extra));
				that.setResut("0",extra);
			});
		},
		_renderData:function(pageIndex,callback){
			var that = this , doc = document;
			Mod.getRemoteJsonByProxy("queryUsers2.php",
				{
					"pageIndex":"1",
					"pageSize":"20",
					"queryString":that.queryString.value,
					"type":"user",
				},
				callback
			);			 
		},		
		/*下拉刷新*/
		onPullRefresh:function(){
			T.l("onPullRefresh");
			var that = window.page,doc = document;
			console.log(that);
			that._renderData(1,function(data){		 	
				var result = that.template(data);  
				that.data_ul.innerHTML = result ;
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
				var result = that.template(data);  
				that.data_ul.innerHTML += result ;
				var flag = false;
				if(data.datas.length<that.pageSize){
					flag = true;
				}
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(flag); 
			});				
		}, 	
		openerBodyUrl:"searchuser_body.html",
		onOpenerJs_static:function(openerPage,openExtra){
			var that = openerPage,doc = document;
		}		
	});  
	
	window.page = new page();
})(window.base,window.tools,window._mod);
