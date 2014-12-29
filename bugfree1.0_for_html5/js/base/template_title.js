/**
 * template的title公共js
 * 如果需要个性化，可继承此类
 */
(function(B,T,bodyPage){
	"use strict";
	 
	var page = function (){};
	page.onOpenerJs_static = bodyPage.onOpenerJs_static;
	page.openerBodyUrl = bodyPage.openerBodyUrl;
	T.extend(page.prototype,B,{
		onCreate:function(){  
			var that = this,doc = document;
			that.titleBackBtn = doc.getElementById("titleBackBtn");
			
			//TODO 需要将48修改掉
			var viewName = that.currentView.id+"_body";
			console.log("bodyUrl-"+viewName+":"+page.openerBodyUrl);
 			that.bodyView = T.createView(page.openerBodyUrl,viewName,{top:"48px",bottom:"0px"},[]);
 			that.currentView.append(that.bodyView);
 			return true;
		}, 
		/*需要先调用setBody*/
		onResume:function(extra){
			var that = this;
			that.bodyView.show(extra);
		},
		onJs:function(){ 
			var that = this;
			page.onOpenerJs_static(that,that.extra);
			
			T.on("tap",that.titleBackBtn,function(e){
				window.startup.onAndroidBack();
			});
		}, 		
 
	}); 
 
	
	window.page = new page();
})(window.base,window.tools,window.page);
