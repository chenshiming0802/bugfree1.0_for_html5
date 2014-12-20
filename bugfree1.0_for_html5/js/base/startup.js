/*×画面启动类*/
(function(B,T,page,View){
	"use strict";
 	 
 	//base.onCreate();
 
 	var startup = function (){};
 	T.extend(startup.prototype, page ,{
 		isPause:false,
 		resumeExtra:null,
 		 /*可继承 参照android activity#onCreate*/
 		 onCreate:function(){ 
 		 	T.l("onCreate");
 		 	var that = this;
 		 	//if(!page) return; 
 		 	that.baseinit();
 		 	//page.currentView = plus.webview.currentWebview();	
 		 	//T.l("currentView:");
 		 	//T.l(plus.webview.currentWebview());
 		 	page.currentView = new View().setView(plus.webview.currentWebview());
 		 	//page.openerView = page.currentView.opener();
 		 	page.openerView = new View().setView(plus.webview.currentWebview().opener());
 		 	page.onCreate();
			//this.onResume(); 
 		 }, 
 		 /*可继承 参照android activity#onResume*/
 		 onResume:function(extra){ 
 		 	T.l("onResume:"+JSON.stringify(extra));
 		 	var that = this;
 		 	
 		 	/*如果是pause后再resume，则数据缓存中*/
 		 	if(that.isPause===true){ 
 		 		extra = that.resumeExtra;
 		 		that.isPause = false;
 		 	}  
 		 	that.resumeExtra = extra;
 		 	page.onResume(extra);//由webvice的show调用来，来代理调用page的resume	 	
 		 	//延迟加载js绑定等动作，为更快的展现数据
 		 	setTimeout(function(){
 		 		that.onJs();  
 		 	},500);
 		 	
 		 },
 		 /*可继承 设置全局的JS，与onResume的数据无关*/
 		 onJs:function(){
 		 	T.l("onJs");
 		 	page.onJs(); 
 		 },
 		 /*可继承 参照android activity#onPause*/
 		 onPause:function(){
 		 	T.l("onPause");	 
 		 	var that = this;
 		 	that.isPause = true; 
			if(page.onPause){
				page.onPause();
			}
 		 },
 		 /*可继承 网络环境变化后触发*/
 		 onNetchange:function(){
 		 	T.l("onNetchange");	 
			if(page.onNetchange){
				page.onNetchange();
			}
 		 },
 		 /*可继承  android的关闭事件*/
 		 onAndroidBack:function(){
 		 	var that = this;
 		 	if(page.onAndroidBack){
 		 		page.onAndroidBack();
 		 	}else{
 		 		/*当前窗口关闭，并且通过当前窗口开的窗口也关闭 deleted*/
 		 		plus.webview.hide(page.currentView,'slide-out-right',100);

 		 		for(var k in that._newView){
 		 			plus.webview.close(that._newView[k]);
 		 		} 		 		
 		 	}
 		 },
 	}); 
 	window.startup = new startup();
 		
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
 		plus.key.addEventListener('backbutton', function(){
 			window.startup.onAndroidBack();    
 		});
 	}

	window.mui.plusReady(function() {
    	startPage();
    	startPage = function(){};
    	return;		
	});

})(window.base,window.tools,window.page,window.View); 




