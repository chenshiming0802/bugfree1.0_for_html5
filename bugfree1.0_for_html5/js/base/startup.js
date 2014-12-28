/*×画面启动类*/
(function(B,T,page,View){
	"use strict";
 	//window.startup.onActivityResult("searchuserView","0",{"userName":"chenshiming","realName":"陈市明"}); 
 	//base.onCreate();
 
 	var startup = function (){};
 	T.extend(startup.prototype, page ,{
 		
 		 resumeExtra:null,
 		//hasCallOnResume:false,
 		//resultOnCreate:false,
 		 viewUrl:null,//当前页面的url
 		 /*可继承 参照android activity#onCreate*/
 		 onCreate:function(){ 
 		 	T.l("onCreate-"+plus.webview.currentWebview().id);
 		 	var that = this;

 		 	that.baseinit();
 		 	page.currentView = new View().setView(plus.webview.currentWebview());
 		 	that.currentView = page.currentView;
 		 	page.openerView = new View().setView(plus.webview.currentWebview().opener());
 		 	that.openerView = page.openerView;
 		 	page.parentView = new View().setView(plus.webview.currentWebview().parent());
 		 	that.parentView = page.parentView; 
 
 			that.viewUrl = that.currentView._view.getURL();

 		 	page.onCreate();
 		 	//that.resultOnCreate = page.onCreate();
 		 	
 		 	//that.onResume();//TODO for debug
 		 }, 
 		 /*除了第一个页面外，该方法指在onPause后执行onResume动作，由于所有页面都会被调用onPauseResume，因此不建议使用*/
   		 onPauseResume:function(){
   		 	var that = this;
   		 	if(window._runtime.hasCallOnResume===true){
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
 		 	
// 		 	if(that.resultOnCreate===false){
// 		 		T.l("Do not call onResume,due to onCreate's result is false!'");
// 		 		return;
// 		 	}
 		 	
// 		 	if(window._runtime.hasCallOnResume===true){
// 		 		T.l("重复调用resume");
//				return;
//			}
 		 	
 		 	window._runtime.hasCallOnResume = true;
 		 	
// 		 	that.hasCallOnResume = true;
 		 	/*如果是pause后再resume，则数据缓存中*/
 		 	if(window._runtime.isPause===true){ 
 		 		extra = that.resumeExtra;
 		 		window._runtime.isPause = false;
 		 	}  
 		 	that.resumeExtra = extra;
 		 	var resultResume = page.onResume(that.resumeExtra || {});//由webvice的show调用来，来代理调用page的resume	 
 		 	
 		 	if(resultResume!==false){
	  		 	//延迟加载js绑定等动作，为更快的展现数据
	 		 	setTimeout(function(){
	 		 		if(window._runtime.hasCallOnJs===false){
	 		 			window._runtime.hasCallOnJs = true;
	 		 			that.onJs();   		 			
	 		 		}	 		 		
	 		 	},1000);			 		
 		 	}

 		 },
// 		 /*可继承 用户清空UI上的数据，以便该view可服用*/
// 		 unResume:function(){
// 		 	T.l("unResume");	 
// 		 	var that = this;
// 		 	window._runtime.hasCallOnResume = false;
// 		 	console.log(window._runtime);
//			if(page.unResume){
//				page.unResume();
//			}	 	
// 		 },
 		 /*可继承 设置全局的JS，与onResume的数据无关*/
 		 onJs:function(){
 		 	T.l("onJs");
 		 	page.onJs(); 
 		 },
 		 /*可继承 参照android activity#onPause*/
 		 onPause:function(){
 		 	T.l("onPause");	 
 		 	var that = this;
 		 	window._runtime.isPause = true; 
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
 		 		if(that.parentView._view){//TODO 子窗口的后腿
 		 			//that.currentView.openerEvalJS("window.startup.onAndroidBack();");
 		 			that.parentView.evalJS("window.startup.onAndroidBack();");
 		 		}else if(that.openerView){
 		 			page.currentView.close(); 	
 		 		}else{
 		 			plus.nativeUI.toast("当前为最后一页，不能后退了！");
 		 		}
 		 		
 		 			
 		 	}
 		 },
 		 /*可继承  android的关闭事件*/
   		 onHide:function(){
		 	var that = this;
   		 	T.l("onHide");	 
			if(page.onHide){
				page.onHide();
			}	
			

   		 	console.log("hide webview:"+that.currentView._view.id);
   		 	
   		 	var show_aniShow = window._runtime.show_aniShow;
   		 	switch(show_aniShow){
   		 		case "slide-in-right": show_aniShow="slide-in-left";break;
   		 		case "slide-in-left": show_aniShow="slide-in-right";break;
   		 		case "slide-in-top": show_aniShow="slide-in-bottom";break;
   		 		case "slide-in-bottom": show_aniShow="slide-in-top";break;
   		 		case "fade-in": show_aniShow="fade-out";break;
   		 		case "fade-out": show_aniShow="fade-in";break;
   		 		case "pop-in": show_aniShow="pop-out";break;
   		 		case "pop-out": show_aniShow="pop-in";break;
   		 	}
   		 	that.currentView._view.hide(show_aniShow,window._runtime.show_duration);
// 		 	if(window._runtime.hasCallOnResume===true){
// 		 		that.unResume();//如果执行过resume，则调用unResume
// 		 	}
// 		 	
// 		 	setTimeout(function(){
//	   		 	for(var k in window._runtime.newViewOnCreate){
//	   		 		var v = new View().getWebviewById(window._runtime.newViewOnCreate[k]);	
//					v.hide();
//	   		 	}	
//	   		 	for(var k in window._runtime.newViewOnResume){
//	   		 		var v = new View().getWebviewById(window._runtime.newViewOnResume[k]);	
//					v.close();
//	   		 	}  
//	   		 	window._runtime.newViewOnResume = [];   		 			
// 		 	},0);
   		 	
   		 }, 		 
 		 /*可继承  android的关闭事件*/
   		 onClose:function(){
		 	var that = this;
   		 	T.l("onClose");	 	
			if(page.onClose){
				page.onClose();
			}	
			setTimeout(function(){
				T.l(JSON.stringify(window._runtime));
	   		 	for(var k in window._runtime.newViewOnCreate){
	   		 		var v = new View().getWebviewById(window._runtime.newViewOnCreate[k]);	
					v.close();v.destory();
	   		 	}	
	   		 	window._runtime.newViewOnCreate = [];
	   		 	for(var k in window._runtime.newViewOnResume){
	   		 		var v = new View().getWebviewById(window._runtime.newViewOnResume[k]);	
					v.close();v.destory();
	   		 	}  	
	   		 	window._runtime.newViewOnResume = [];
	   		 	//还原当前webview
	   		 	window._runtime = T.json_clone(window._runtime_origal);
	   		 	that.currentView._view.clear();
	   		 	console.log("that.viewUrl-"+that.viewUrl);
	 			that.currentView._view.loadURL(that.viewUrl);
	 			//that.onCreate();  //需确认重新loadurl后是否会覆盖dom内存				
			},0);
   		 },
   		 /*通常不继承*/
   		 onDestory:function(){
		 	var that = this;
   		 	T.l("onDestory");	 	
			if(page.onDestory){
				page.onDestory();
			}	
			setTimeout(function(){
				console.log("destory webview:"+that.currentView._view.id);
				that.currentView._view.close(); 				
			},2000);
   		 },
   		 /*可继承，参照android native的onActivityResult*/
   		 onActivityResult:function(requestCode, resultCode,extra){
   		 	var that = this;
   		 	T.l("onActivityResult:"+requestCode+","+resultCode+","+JSON.stringify(extra));
   		 	if(page.onActivityResult){
   		 		page.onActivityResult(requestCode, resultCode,extra);
   		 	}
   		 },
 	}); 
 	window.startup = new startup();
 	window._runtime = {
   		ar_openerViewId:null,//用于startActivityForResult子窗口的记录父窗口的ID
   		ar_requestCode:null,//用于startActivityForResult子窗口的requestCode 	 		
 		hasCallOnResume:false,//是否调用过onResume
 		hasCallOnJs:false,//是否调用过onJs
 		newViewOnCreate:[],//当前view中在create中创建的view
 		newViewOnResume:[],//当前view中在resume中创建的view
 		show_aniShow:"none",//当前画面进入的滑动方式
 		show_duration:"0",//当前画面进入的滑动时间
 		isPause:false,
 
 	};
 	//保留_runtime的副本
 	window._runtime_origal = T.json_clone(window._runtime);
 		
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




