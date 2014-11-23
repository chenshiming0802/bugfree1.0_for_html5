(function(B,T){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype, B, {
		onCreate:function(){  
			console.log("testpage#onCreate");
			//plus.nativeUI.alert("natvie oncreate3"); 
		}, 
		onResume:function(){  
			console.log("testpage#onResume");
		}, 
		onJs:function(){    
			console.log("testpage#onJs");
			//this.b_on("click",document.getElementById("hellobt"),this.test1);
		}, 	 
		test1:function(e){ 		
			console.log("testpage#test1");
		}
	});  
	
	window.page = new page();
})(window.base,window.tools);
