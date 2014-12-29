(function(B,T,Mod){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){  
			var that = this , doc = document;
			that.nav = doc.getElementById("nav");
			that.editView = T.createView("service_edit.html","service_edit",{top:"30%",bottom:"0px"},{});
			
 			return true;
		}, 
		onResume:function(extra){  
			var that = this , doc = document;
			that.bugId = extra.bugId;
			that.bugModel = null;
			that._loadData();
			return true;
		}, 
		_loadData:function(){
			var that = this , doc=document;
			T.l("  getRemoteJsonByProxy");
			Mod.getRemoteJsonByProxy("buginfo2.php",  
				{
					"bugId":that.bugId,  
				},
				function(data){
	 				that.bugModel = data;
	 				doc.getElementById("data_div").innerHTML = "" ;
	 				doc.getElementById("data_ul").innerHTML = "" ;
	 				
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
//		unResume:function(){
//			var that = this , doc = document;
//			doc.getElementById("data_div").innerHTML = "" ;
//			doc.getElementById("data_ul").innerHTML = "" ;
//		},
		onJs:function(){ 
			var that = this , doc = document;
 
			T.on("tap",that.nav,function(e){
				var pObj = T.getParentArticle(e.target,"A");
				var pId = pObj.getAttribute("id");
				switch(pId){
					case "editBt":	
						that.startActivityForResult(that.editView,"editView");
						that.editView.show(that.bugModel,'slide-in-bottom');
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
		/*子窗口的返回事件传递给父窗口*/ //TODO 子窗口的后腿
//		onAndroidBack:function(){
//			var that = this;
//			that.currentView.openerEvalJS("window.startup.onAndroidBack();");
//		},
		onActivityResult:function(requestCode, resultCode,extra){
			var that = this;
			switch(requestCode){
				case "editView":
				if(resultCode=="0"){
					that.refresh();
				}
				break;
			}
		},
		openerBodyUrl:"service_body.html",
		onOpenerJs_static:function(openerPage,openExtra){
			var that = openerPage,doc = document;

		},
		refresh:function(){
			T.l("refresh");
			var that = this;
			that._loadData();
		},
		 
	});  
	
	window.page = new page();
})(window.base,window.tools,window._mod);
