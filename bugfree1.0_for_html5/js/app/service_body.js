(function(B,T){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){  
			var that = this , doc = document;
			
		}, 
		onResume:function(extra){    
			var that = this;
			that.bugId = extra.bugId;

			T.getRemoteJsonByProxy("buginfo2.php",
				{
					"bugId":that.bugId,
				},
				function(data){
					console.log(data);
				}
			);

		}, 
		onJs:function(){    
		}, 
		/*子窗口的返回事件传递给父窗口*/
		onAndroidBack:function(){
			var that = this;
			that.currentView.opener().evalJS("startup.onAndroidBack();");
		},
		onPullRefresh:function(){
		},
		onPullLoadMore:function(){
		}, 
		 
	});  
	
	window.page = new page();
})(window.base,window.tools);
