/*×画面启动类*/
(function(B,T,page){
	"use strict";
 	 
 	//base.onCreate();
 
 	var startup = function (){};
 	T.extend(startup.prototype, page ,{
 		 /*可继承 参照android activity#onCreate*/
 		 onCreate:function(){
 		 	console.log("startup#onCreate");
  	
 		 	page.onCreate();
			this.onResume();
 		 }, 
 		 /*可继承 参照android activity#onResume*/
 		 onResume:function(){ 
 		 	console.log("startup#onResume"); 	 
 		 	
 		 	page.onResume();
 		 	this.onJs();  
 		 },
 		 /*可继承*/
 		 onJs:function(){
 		 	console.log("startup#onJs"); 	 
 		 	page.onJs(); 
 		 },
 		 /*可继承 参照android activity#onPause*/
 		 onPause:function(){
 		 	console.log("startup#onPause"); 	 
			if(page.onPause){
				page.onPause();
			}
 		 },
 		 /*可继承 网络环境变化后触发*/
 		 onNetchange:function(){
 		 	console.log("startup#onNetchange");
			if(page.onNetchange){
				page.onNetchange();
			}
 		 },
 		 /*可继承 下拉刷新*/
		 onPullRefresh:function(){
 			console.log("startup#onPullRefresh");
 			page.onPullRefresh();
		 },
		 /*可继承 上拉读取更多*/
		 onPullLoadMore:function(){
 			console.log("startup#onPullLoadMore");
 			page.onPullLoadMore();			
		 },  		 
 		 handleEvent: function(e){ 	
 		 	console.log("startup#handleEvent");
		 }	
 	});  
 		
 	var startPage = function(){  
 		window.startup.onCreate();   
 		
 		/*注册网络修改时  触发*/
	    document.addEventListener("netchange", function(){
	    	window.startup.onNetchange();  
		});	 	
		/*借鉴android onResume注册*/
	    document.addEventListener("resume", function(){
	    	window.startup.onResume();  
		});	   	
		/*借鉴android onPause注册*/
	    document.addEventListener("pause", function(){
	    	window.startup.onPause();  
		});	
 	
 	}
    window.startup = new startup();
    if(window.plus){
    	console.log("window.plus");
    	startPage();
    	startPage = function(){};
    	return;
    }
    document.addEventListener("plusready", function(){
    	console.log("window.plusready ready");
		startPage();
		startPage = function(){};
	});	 
	
	
})(window.base,window.tools,window.page); 
