(function(B,T,Mod){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){  
			var that = this , doc = document;
 
		}, 
		onResume:function(extra){  
			var that = this , doc = document;
			that.bugId = extra.bugId;
			T.l("  getRemoteJsonByProxy");
			Mod.getRemoteJsonByProxy("buginfo2.php",  
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
						data.comments[k].fullInfo = comments[k].fullInfo.replaceAll("\n","<br>");
					}   
					 
					var source = doc.getElementById("template_li").innerHTML;
					var template = Handlebars.compile(source);				 	
					var result = template(data);  
					doc.getElementById("data_ul").innerHTML += result ;
				}
			);

		}, 
		unResume:function(){
			var that = this , doc = document;
			doc.getElementById("data_div").innerHTML = "" ;
			doc.getElementById("data_ul").innerHTML = "" ;
		},
		onJs:function(){ 
		 
		}, 
		/*子窗口的返回事件传递给父窗口*/
		onAndroidBack:function(){
			var that = this;
			that.currentView.openerEvalJS("window.startup.onAndroidBack();");
		},
		onOpenerJs_static:function(openerPage,openExtra){
			var that = openerPage,doc = document;
	 		var sty = {top:"30%",bottom:"0px"};
	 		var editView = T.createView("service_edit.html","service_edit",sty,{});
	 	
			var obj = doc.getElementById("nav");
			T.on("tap",obj,function(e){
				var pObj = T.getParentArticle(e.target,"A");
				var pId = pObj.getAttribute("id");
				switch(pId){
					case "editBt":			
						editView.show('slide-in-bottom', 150);
						break;
					case "uploadBt":
						alert("updateBt");
						//TODO code 上传
						break;
					case "fixBt":
						alert("fixBt");
						//TODO code 解决
						break;							
				}
			});
			
		},
		 
	});  
	
	window.page = new page();
})(window.base,window.tools,window._mod);
