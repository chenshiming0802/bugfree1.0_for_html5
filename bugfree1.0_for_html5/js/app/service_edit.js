(function(B,T){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){
			var that = this , doc = document; 
			//this.isAssignMe = this.currentView.isAssignMe||"0"; 
		}, 
		onResume:function(extra){    
			var that = this , doc = document;
			/*
			T.getRemoteJsonByProxy("buginfos2.php",
				{
					"pageIndex":"1",
					"pageSize":"20",
					"isAssignMe":that.isAssignMe,
					"isMeCreate":that.isMeCreate,
					"queryString":that.queryString,
				},
				function(data){
					var source = document.getElementById("template").innerHTML;
					var template = Handlebars.compile(source);				 	
					var result = template(data);  
					document.getElementById("data_ul").innerHTML += result ;
				}
			);*/

		}, 
		onJs:function(){    
		}, 
		onPullRefresh:function(){
		},
		onPullLoadMore:function(){
		}, 
		 
	});  
	
	window.page = new page();
})(window.base,window.tools);
