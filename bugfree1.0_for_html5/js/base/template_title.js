/**
 * template的title公共js
 * 如果需要个性化，可继承此类
 */
(function(B,T,bodyPage){
	"use strict";
	 
	var page = function (){};
	page.onOpenerJs_static = bodyPage.onOpenerJs_static;
	T.extend(page.prototype,B,{
		onCreate:function(){  
			var that = this;
			that.bodyUrl = that.currentView.bodyUrl;
 			
		}, 
		/*需要先调用setBody*/
		onResume:function(extra){   	
			console.log(extra);
			var that = this;
			that.extra = extra;
			//只获取外部传入的参数
			var bodyParam = {};
			for(var k in that.currentView){ 
				if(k!="__IDENTITY__" && k!="__uuid__"  && k!="__callback_id__" && k!="id"){
					var v = that.currentView[k];
					if(typeof v=="string"){
						bodyParam[k] = that.currentView[k];
					}								
				}  
			}	
			//TODO 需要将48修改掉
			var bodyView = that.createView(that.bodyUrl,"body",{top:"48px",bottom:"48px"},bodyParam);
			bodyView.show();
			that.resumeView(bodyView,extra);	
		},
		onJs:function(){ 
			var that = this;
			page.onOpenerJs_static(that,that.extra);
		}, 		
 
	}); 
 
	
	window.page = new page();
})(window.base,window.tools,window.page);
