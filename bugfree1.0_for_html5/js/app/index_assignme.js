(function(B,T){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		extra:function(param){
			this.param = [];
			this.param.isAssignMe = "1";
			this.param.isMeCreate = "0";
			this.param.queryString = ""
			
			/*
			if(param.isMeCreate || param.queryString){
				param.isAssignMe = "1";
			}*/
			
		},
		onCreate:function(){ 
			this.extra();
			console.log("index_weixin#onCreate");
		}, 
		onResume:function(){  
			console.log("index_weixin#onResume");
			var that = this;
			T.getRemoteJsonByProxy("buginfos2.php",
				{
					"pageIndex":"1",
					"pageSize":"20",
					"isAssignMe":that.param.isAssignMe,
					"isMeCreate":that.param.isMeCreate,
					"queryString":that.param.queryString,
				},
				function(data){
					var source = document.getElementById("template").innerHTML;
					var template = Handlebars.compile(source);				 	
					var result = template(data);  
					document.getElementById("data_ul").innerHTML += result ;
				}
			);

		}, 
		onJs:function(){    
			console.log("index_weixin#onJs");
		}, 
		onPullRefresh:function(){
 			alert("onPullRefresh");	
		},
		onPullLoadMore:function(){
			alert("onPullLoadMore");
		}, 
		 
	});  
	
	window.page = new page();
})(window.base,window.tools);
