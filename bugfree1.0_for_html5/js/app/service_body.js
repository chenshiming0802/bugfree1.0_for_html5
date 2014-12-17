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
			T.l("  getRemoteJsonByProxy");
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
			that.currentView.opener().evalJS("startup.onAndroidBack();");
		},
		onOpenerJs_static:function(openExtra){
			var that = this,doc = document;
	 
			var obj = doc.getElementById("nav");
			T.on("click",obj,function(e){
				var pObj = T.getParentArticle(e.target,"A");
				var pId = pObj.getAttribute("id");
				switch(pId){
					case "editBt":
						//TODO test 编辑
						alert('hi1');
						var sty = {top:"50%",bottom:"0px"};
						var v1 = that.createView("service_edit.html","service_edit",sty,{});
						v1.show();
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
})(window.base,window.tools);
