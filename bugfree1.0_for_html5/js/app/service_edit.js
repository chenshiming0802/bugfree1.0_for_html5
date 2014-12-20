(function(B,T,Mod){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){
			var that = this , doc = document; 
			//this.isAssignMe = this.currentView.isAssignMe||"0"; 
			
			that.editBt = doc.getElementById("editBt");
			that.cancelBt = doc.getElementById("cancelBt");
		}, 
		onResume:function(extra){    
			var that = this , doc = document;

		}, 
		onJs:function(){  
			var that = this,doc = document;
			T.on("tap",that.editBt,function(e){
				alert('editBt click');
			});
			T.on("tap",that.cancelBt,function(e){
				alert('cancel click');
				that.openerView.hide("slide-out-bottom",150);
			});
		}, 
		 
	});  
	
	window.page = new page();
})(window.base,window.tools,window._mod);
