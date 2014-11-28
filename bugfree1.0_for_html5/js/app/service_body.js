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
					//page.openerView.evalJS("document.getElemnetById('headerTitle').innerHTML='"+data.bugId+"详情';")//TODO test service头标注
					
					var source = doc.getElementById("template_div").innerHTML;
					var template = Handlebars.compile(source);				 	
					var result = template(data);  
					doc.getElementById("data_div").innerHTML = result ;
					
					var comments = data.comments;
					for(var k in comments){
						data.comments[k].fullInfo = comments[k].fullInfo.replaceAll("\n","<br>");
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
			console.log(" body#onAndroidBack");
			console.log(that);
			that.currentView.opener().evalJS("startup.onAndroidBack();");
		},
		onPullRefresh:function(){
		},
		onPullLoadMore:function(){
		}, 
		onOpenerJs_static:function(openExtra){
			var obj = document.getElementById("headerTitle");
			T.on("click",obj,function(e){
				alert(obj);
				console.log(obj);
			});  
			
		},
		 
	});  
	
	window.page = new page();
})(window.base,window.tools);
