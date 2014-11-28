(function(B,T){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){  
			var that = this , doc = document;
			
		}, 
		onResume:function(extra){  
			var that = this , doc = document;
			that.bugId = extra.bugId;
			console.log("  getRemoteJsonByProxy");
			T.getRemoteJsonByProxy("buginfo2.php",
				{
					"bugId":that.bugId,  
				},
				function(data){
					var source = doc.getElementById("template_div").innerHTML;
					var template = Handlebars.compile(source);				 	
					var result = template(data);  
					doc.getElementById("data_div").innerHTML = result ;
					
					var comments = data.comments;
					for(var k in comments){
						console.log(data);
						console.log(" fullInfo1:"+comments[k].fullInfo);
						console.log(" fullInfo2:"+Handlebars.SafeString(comments[k].fullInfo));
						data.comments[k].fullInfo = comments[k].fullInfo.replaceAll("\n","<br>");
						// = Handlebars.SafeString(data.comments[k].fullInfo);
					}
					
					var source = doc.getElementById("template_li").innerHTML;
					var template = Handlebars.compile(source);				 	
					var result = template(data);  
					doc.getElementById("data_ul").innerHTML += result ;
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
