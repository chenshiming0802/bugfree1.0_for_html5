(function(B,T,Mod){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){
			var that = this , doc = document; 
			
			//var data_ul = doc.getElementById("data_ul");
			//that.currentIndex = 0;//当前页数
			//页面模板
			//var source = doc.getElementById("template").innerHTML;
			//that.template = Handlebars.compile(source);				
			return true;
		}, 
		onResume:function(extra){    
			var that = this , doc = document;
			//that.isAssignMe = extra.isAssignMe||"0";

			
//			Mod.getRemoteJsonByProxy("queryUsers2.php",
//				{
//					"pageIndex":"1",
//					"pageSize":"20",
//					"queryString":that.queryString.value,
//					"type":"user",
//				},
//				callback
//			);	

//			that.setResut("0",extra);
			return true;

		}, 
//		unResume:function(){
//			var that = this , doc = document;
//		},		
		onJs:function(){    
			var that = this,doc = document;
			
			//T.on("tap",that.loginBt,function(e){
			//});
		},
		openerBodyUrl:"",
		onOpenerJs_static:function(openerPage,openExtra){
			var that = openerPage,doc = document;
		},
		onActivityResult:function(requestCode, resultCode,extra){
			var that = this;
			switch(requestCode){
				case "":
				break;
			}
		},		
	});  
	
	window.page = new page();
})(window.base,window.tools,window._mod);
