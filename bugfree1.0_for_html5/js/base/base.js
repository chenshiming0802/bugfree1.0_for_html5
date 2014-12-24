/* Page的基类，理论上非不得已的情况下都放在tools下 */
(function(){
	"use strict"

	window.base =  {
		pageSize:5,
		/*初始化base的内容*/
		baseinit:function(){
			var that = this;
		},	 
		setPullRefresh:function(id,pullDownF,pullUpF){
			var config = {
				pullRefresh: {
					container: '#'+id,
					down: {
						callback: pullDownF
					},
					up: {
						contentrefresh: '正在加载...',
						callback: pullUpF
					}
				}
			};
			mui.init(config);	
			if (mui.os.plus) {
				setTimeout(function() {
					mui('#pullrefresh').pullRefresh().pullupLoading();
				}, 1000);

			} else {
				mui('#pullrefresh').pullRefresh().pullupLoading();
			}		
			
		},
	};
	
})();

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) { 
	if (!RegExp.prototype.isPrototypeOf(reallyDo)) { 
		return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith); 
	} else { 
	return this.replace(reallyDo, replaceWith); 
	} 
} ;

/*项目的工具类*/
(function(){
	"use strict"

	window.tools =  {
		/**
		 * 打印日志
		 */
		l:function(str){
			console.log("["+plus.webview.currentWebview().id+"] "+ str + "                                ");
		}, 
		/**
		 * 实现类继承
		 * 摘自与csdn.js
		 * @param {Object} target
		 */
		extend: function(target){ 
			var len = arguments.length,
				index = 1,
				first = arguments[0];
			if(typeof target == 'boolean'){
				if(target) first = {};
				else{
					first = arguments[1];
					index = 2;
				}
			}
			for(; index < len; index++){
				var o = arguments[index];
				for(var i in o)
					if(o[i] !== undefined) 
						first[i] = o[i];
						
			}
			return first; 
		},	
		/**
		 * 绑定事件
		 * 摘自与csdn.js
		 * @param {Object} type
		 * @param {Object} el
		 * @param {Object} bubble 
		 */   
		on : function(type, el , func , bubble) {
			//console.log("add event:"+type);
			el.addEventListener(type, func, !!bubble);
			/*
			try{ 
				el.addEventListener(type, func, !!bubble);
			}
			catch(e){
				this.showErr(e, 'on')
			} */
		},
		/**
		 * 解绑事件
		 * 摘自与csdn.js
		 * @param {Object} type
		 * @param {Object} el
		 * @param {Object} bubble
		 */
		off : function(type, el, bubble) {
			try{
				el.removeEventListener(type, this, !!bubble);
			}catch(e){
				this.showErr(e, 'off')
			}
		},	
		/**
		 * 显示错误
		 * 摘自与csdn.js
		 * @param {Object} ex
		 * @param {Object} title
		 */
		showErr : function(ex, title) {
			try {
				var message = [];
				for (i in ex) {
					//if (typeof ex[i] == 'function' || typeof ex[i] == 'object') continue;
					message.push("\n" + i + ":" + ex[i]);
				}
//				plus.statistic.eventTrig("error",message.join(';'));
				//console.trace();
				alert(title + ":" + message.join(';') + ':' + ex.message);
				//plus.console.log(message.join(';'));
				throw ex;
			} catch (err) {
//				alert(ex.type + ':' + ex.message);
//				plus.statistic.eventTrig("error",err.message);
				throw err;//for debug 
			}
		},
		/**
		 * 遍历调用 
		 * callback(element)
		 */ 
		each: function(elements, callback){
			if(elements){
				for(var k in elements){
					if((typeof elements[k])==="object"){
						callback(elements[k]); 
					}	
				}
			};
		},
		/**
		 * Css是否含有class
		 */
		hasClass:function (ele,cls) {
			return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
		},
		
		/**
		 * $增加class
		 * @param {Object} ele
		 * @param {Object} cls
		 */
		addClass:function (ele,cls) {
		    if (!this.hasClass(ele,cls)) ele.className += " "+cls;
		},
		/**
		 * $去掉class
		 * @param {Object} ele
		 * @param {Object} cls
		 */
		removeClass:function (ele,cls) {
		    if (this.hasClass(ele,cls)) {
			    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
			        ele.className=ele.className.replace(reg,' ');
		   }
		},
		isIOS : function() {
			return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i);
		},
		isAndroid : function(t) {
			return navigator.userAgent.match(/Android/i);
		},
		/**
		 * 获取父组织的article节点
		 * @param {Object} element
		 * @param {Object} tagName 默认ARTICLE
		 */
		getParentArticle:function (element,tagName){
			tagName = tagName||"ARTICLE";
			if(element.tagName==tagName){
				return element;
			}
			var a = null;
			for(var i=0,j=8;i<j;i++){
				a = element.parentNode;
				if(a.tagName==tagName){
					return a;
				}
				element = a;
			} 	
			return null;	
 		},	     
	    storage_get:function(key){
	    	return plus.storage.getItem(key);
	    },
	    storage_set:function(key,obj){
	    	plus.storage.setItem(key, value);
	    },
	    storage_remove:function(key){
	    	plus.storage.removeItem(key);
	    },
	    storage_clear:function(){
	    	plus.storage.clear();
	    },
	    /*创建webview*/
	    createView:function(fileName,id,style,param,isAlieWithParent){
	    	var view = new View();
	    	return view.createView(fileName,id,style,param,isAlieWithParent);
	    },
		array_pushUniqueValue:function(arr,value){
	    	var isFound = false;
	    	for(var k in arr){
	    		if(arr[k]==value){
	    			isFound = true;
	    		}
	    	}
	    	if(isFound===false){
	    		arr.push(value);
	    	}
	    }	    
	};
	
	
	/*分装webview类*/
	var View = function(){};
	window.tools.extend(View.prototype,{
		_view:null,
		setView:function(view){
			var that = this;
			that._view = view;
			return that;
		},
		/**
		 * 通过页面号获取页面
		 */
		getWebviewById:function(id){
			var that = this;
			var currentView = plus.webview.currentWebview();
			
			var viewName = id;//+"@"+currentView.id;	
			that._view = plus.webview.getWebviewById(viewName);
			return that;
		},
		/*创建view，如果存在则直接返回
		 isAlieWithParent:生命周期是否根据父窗口，默认true
		 * */
		createView:function(fileName,id,style,param,isAlieWithParent){
			var that = this;
	
			if(isAlieWithParent==undefined){
				isAlieWithParent = true;
			}
			var currentView = plus.webview.currentWebview();
			var viewName = id;//+"@"+currentView.id;
			
			that._view = plus.webview.getWebviewById(viewName);//由于在startup中close 有问题，因此此处页面复用
			if(!that._view){
				that._view = plus.webview.create(fileName,viewName,style,param);
			}
			
			/*如果生命周期跟着父窗口，则加入列表*/
			var currentView = plus.webview.currentWebview();
			if(!that._view || isAlieWithParent===true){//子窗口和不依附于母窗口，不调用close
				if(window._runtime.hasCallOnResume===true){//记录开的缓存，以备关闭				
					window.tools.array_pushUniqueValue(window._runtime._newViewOnResume,that._view.id);//TODO test _newViewOnResume
				}else{
					window.tools.array_pushUniqueValue(window._runtime._newViewOnCreate,that._view.id);
				}			
			}			
			return that;
		},
		show:function(extra,aniShow,duration){
			/*执行resume数据*/
			var that = this;
			extra = extra || {};
			aniShow = aniShow || "slide-in-right";
			duration = duration || "300";
			
			that._view.evalJS("console.log(\"ready to call onResume\");");
			that._view.evalJS("window.startup.onResume("+JSON.stringify(extra)+");");//TODO resume可能早于startup的加载
			
			//如果是子窗口显示，则不用调用show方法
			if(!that._view.parent()){
				that._view.evalJS("window._runtime._show_aniShow=\""+aniShow+"\";");//记录划入的方式，划出时用
				that._view.evalJS("window._runtime._show_duration=\""+duration+"\";");
				/*显示画面*/
				that._view.show(aniShow,duration);				
			}else{
				plus.webview.show(that._view.id,"none");
			}
		},
		remove:function(view){
			var that = this;
			that._view.remove(view._view);
		},
		hide:function(aniShow,duration){
			var that = this;
			aniShow = aniShow || "slide-in-left";
			duration = duration || "300";			
			//that._view.hide(aniShow,duration);	//划出有webview自定处理
			console.log("evalJs onHide at "+that._view.id);
			that._view.evalJS("window.startup.onHide()");
			
		},
		close:function(aniShow,duration){
			var that = this;
			that.hide(aniShow,duration);
			that._view.evalJS("window.startup.onClose()");
			
			//that._view.close(); 有当前页面在js content中关闭
		},
		openerEvalJS:function(js){
			var that = this;
			that._view.opener().evalJS(js);
		},
		append:function(childView){
			var that = this;
			that._view.append(childView._view);
		},
		evalJS:function(js){
			var that = this;
			that._view.evalJS(js);
		},
	});
	window.View = View;
})();