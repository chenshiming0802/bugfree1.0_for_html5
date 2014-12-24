/*×画面启动类*/
(function(B,T,page,View){
	"use strict";
 	 
 	//base.onCreate();
 
 	var startup = function (){};
 	T.extend(startup.prototype, page ,{
 		isPause:false,
 		resumeExtra:null,
 		hasCallOnResume:false,
 		 /*可继承 参照android activity#onCreate*/
 		 onCreate:function(){ 
 		 	T.l("onCreate-"+plus.webview.currentWebview().id);
 		 	var that = this;

 		 	that.baseinit();
 		 	page.currentView = new View().setView(plus.webview.currentWebview());
 		 	that.currentView = page.currentView;
 		 	//page.openerView = new View().setView(plus.webview.currentWebview().opener());
 		 	
 		 	page.onCreate();
 		 	
// 		 	if(!window.sessionStorage.isNextPage){//第一个页面调用resume
// 		 		T.l("first page,to execute onResume()"); 
// 		 		this.onResume([]); 
// 		 		window.sessionStorage.isNextPage = true;
// 		 	}
			//this.onResume(); 
 		 }, 
 		 /*除了第一个页面外，该方法指在onPause后执行onResume动作，由于所有页面都会被调用onPauseResume，因此不建议使用*/
   		 onPauseResume:function(){
   		 	var that = this;
   		 	if(that.hasCallOnResume===true){
    		 	T.l("onPauseResume");
		 		if(page.onPauseResume){
					page.onPauseResume();
				}	  		 		
   		 	}
   		 },
 		 /*可继承 参照android activity#onResume*/
 		 onResume:function(extra){ 
 		 	T.l("onResume:"+JSON.stringify(extra));
 		 	var that = this;
 		 	
 		 	window._runtime.hasCallOnResume = true;
 		 	
 		 	that.hasCallOnResume = true;
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
 		 	},2500);	
 		 },
 		 /*可继承 用户清空UI上的数据，以便该view可服用*/
 		 unResume:function(){
 		 	T.l("unResume");	 
 		 	var that = this;
			if(page.unResume){
				page.unResume();
			}	 	
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
 		 /*可继承  android的返回事件*/
 		 onAndroidBack:function(){
 		 	var that = this;
 		 	T.l("onAndroidBack");	 
 		 	if(page.onAndroidBack){
 		 		page.onAndroidBack();
 		 	}else{
 		 		page.currentView.hide(); 		
 		 	}
 		 },
 		 /*可继承  android的关闭事件*/
   		 onHide:function(){
		 	var that = this;
   		 	T.l("onHide");	 
			console.log(window._runtime);
			if(page.onHide){
				page.onHide();
			}	
			

   		 	console.log("hide webview:"+that.currentView._view.id);
   		 	
   		 	var _show_aniShow = window._runtime._show_aniShow;
   		 	switch(_show_aniShow){
   		 		case "slide-in-right": _show_aniShow="slide-in-left";break;
   		 		case "slide-in-left": _show_aniShow="slide-in-right";break;
   		 		case "slide-in-top": _show_aniShow="slide-in-bottom";break;
   		 		case "slide-in-bottom": _show_aniShow="slide-in-top";break;
   		 		case "fade-in": _show_aniShow="fade-out";break;
   		 		case "fade-out": _show_aniShow="fade-in";break;
   		 		case "pop-in": _show_aniShow="pop-out";break;
   		 		case "pop-out": _show_aniShow="pop-in";break;
   		 	}
   		 	that.currentView._view.hide(_show_aniShow,window._runtime._show_duration);
   		 	if(window._runtime.hasCallOnResume===true){
   		 		that.unResume();//如果执行过resume，则调用unResume
   		 	}
   		 	
   		 	setTimeout(function(){
	   		 	for(var k in window._runtime._newViewOnCreate){
	   		 		var v = new View().getWebviewById(window._runtime._newViewOnCreate[k]);	
					v.hide();
	   		 	}	
	   		 	for(var k in window._runtime._newViewOnResume){
	   		 		var v = new View().getWebviewById(window._runtime._newViewOnResume[k]);	
					v.close();
	   		 	}  
	   		 	window._runtime._newViewOnResume = [];   		 			
   		 	},0);
   		 	
   		 }, 		 
 		 /*可继承  android的关闭事件*/
   		 onClose:function(){
		 	var that = this;
   		 	T.l("onClose");	 	
			if(page.onClose){
				page.onClose();
			}	
   		 	for(var k in window._runtime._newViewOnCreate){
   		 		var v = new View().getWebviewById(window._runtime._newViewOnCreate[k]);	
				v.close();
   		 	}	
   		 	window._runtime._newViewOnCreate = [];
   		 	for(var k in window._runtime._newViewOnResume){
   		 		var v = new View().getWebviewById(window._runtime._newViewOnResume[k]);	
				v.close();
   		 	}  	
   		 	window._runtime._newViewOnResume = [];
   		 	console.log("close webview:"+that.currentView._view.id);
   		 	//that.currentView._view.close();  //TODO 关闭会会造成整个程序退出
   		 },
 	}); 
 	window.startup = new startup();
 	window._runtime = {
 		hasCallOnResume:false,
 		_newViewOnCreate:[],
 		_newViewOnResume:[],
 		_show_aniShow:"none",
 		_show_duration:"0",
 	};
 		
 	var startPage = function(){  
 		window.startup.onCreate();   
 		
 		/*注册网络修改时  触发*/
	    document.addEventListener("netchange", function(){
	    	window.startup.onNetchange();  
		});	 	
		/*借鉴android onResume注册*/
	    document.addEventListener("resume", function(){
	    	window.startup.onPauseResume();  
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
	
//  if(window.plus){
//  	startPage();
//  	startPage = function(){};
//  	return;
//  }
//  document.addEventListener("plusready", function(){
//  	startPage();
//  	startPage = function(){};
//	});	

})(window.base,window.tools,window.page,window.View); 




