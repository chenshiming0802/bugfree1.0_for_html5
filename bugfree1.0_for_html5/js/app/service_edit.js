(function(B,T,Mod){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){
			var that = this , doc = document; 

			that.editBt = doc.getElementById("editBt");
			that.cancelBt = doc.getElementById("cancelBt");
			that.commonReplySel = doc.getElementById("commonReplySel");
			that.replyTa = doc.getElementById("replyTa");
			return true;
		}, 
		onResume:function(extra){    
			var that = this , doc = document;
			return true;
		}, 
		onJs:function(){  
			var that = this,doc = document;
			T.on("change",that.commonReplySel,function(e){
				 that.replyTa.value = that.commonReplySel.values;
			});
			T.on("tap",that.editBt,function(e){
				alert('editBt click');
			});
			T.on("tap",that.cancelBt,function(e){
				this.currentView.hide();
			});
		}, 
		 
	});  
	
	window.page = new page();
})(window.base,window.tools,window._mod);
