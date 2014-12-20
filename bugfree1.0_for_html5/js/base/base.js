/* Page的基类，理论上非不得已的情况下都放在tools下 */
(function(){
	"use strict"

	window.base =  {
		pageSize:5,
		//_newView:[],/*本窗口创建的view，在返回是需要关闭 deleted*/
		/*初始化base的内容*/
		baseinit:function(){
			var that = this;
		},
		/*创建view，如果存在则直接返回 deleted
		 isAlieWithParent:生命周期是否根据父窗口，默认true
		 * *//*
		createView:function(fileName,viewName,style,param,isAlieWithParent){
			var that = this;
			if(isAlieWithParent==undefined){
				isAlieWithParent = true;
			}
			var view = plus.webview.getWebviewById(viewName);
			if(!view){
				view = plus.webview.create(fileName,viewName,style,param);
				//如果生命周期跟着父窗口，则加入列表
				if(isAlieWithParent===true)
					that._newView.push(view);//记录开的缓存，以备关闭
			}		
			return view;
		},*/
		/*画面create后，需要调用resume才会显示数据 deleted*//*
		resume:function(extra){
			var that = this; 
			extra = extra || {};
			that.currentView.evalJS("window.startup.onResume("+JSON.stringify(extra)+");");	 // 
		},*/
		/*deleted*//*
		resumeView:function(view,extra){
			extra = extra || {};
			var extrastring = JSON.stringify(extra);
			tools.l("resume("+extrastring+");");
			view.evalJS("window.startup.onResume("+extrastring+");");		 
		},*/
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
		/**
		 * 休眠X秒，用于调试用
		 * @param {Object} seconds
		 */
 		sleep:function (seconds) {
		    this.date = Math.round(new Date().getTime()/1000);
		    while(1) {
		        if(Math.round(new Date().getTime()/1000) - this.date >= seconds) break;
		    }
	 	   return true;
	 	},
		 
		/*
	    json2str:function (o) {
	        var arr = [];
	        var currentT = this;
	        var fmt = function(s) {
	            if (typeof s == 'object' && s != null) return currentT.json2str(s);
	            return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
	        }
	        for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
	        return '{' + arr.join(',') + '}';
	    },*/
		isIOS : function() {
			return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i);
		},
		isAndroid : function(t) {
			return navigator.userAgent.match(/Android/i);
		},
		/**
		 * 增加点击后的UI显示效果
		 * @param {Object} obj
		 * @param {Object} className
		 *//*
	    pressDisplay:function(element,className){
	    	console.log('---');
	    	console.log(element);
			var that = window.tools;
	        className = className||"gc_b2";
	        that.on("touchstart",element,function(e){
	        	that.addClass(element,className);
	        });
	        that.on("touchend",element,function(e){ 
	            that.removeClass(element,className);
	        }); 
	    },*/
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
	    createView:function(fileName,viewName,style,param,isAlieWithParent){
	    	var view = new View();
	    	return view.createView(fileName,viewName,style,param,isAlieWithParent);
	    }
	};
	
	
	/*分装webview类*/
	var View = function(){};
	window.tools.extend(View.prototype,{
		_newView:[],/*本窗口创建的view，在返回是需要关闭*/
		view:null,
		/*通过id获取viwe(必须已经创建过的，否则返回null)*/
		getViewById:function(id){
			var that = this;
			var view = plus.webview.getWebviewById(id);
			if(!view)	return null;
			that.view = view;
			return this;
		},
		setView:function(view){
			var that = this;
			that.view = view;
			return that;
		},
		/*创建view，如果存在则直接返回
		 isAlieWithParent:生命周期是否根据父窗口，默认true
		 * */
		createView:function(fileName,viewName,style,param,isAlieWithParent){
			var that = this;
			if(isAlieWithParent==undefined){
				isAlieWithParent = true;
			}
			var view = plus.webview.getWebviewById(viewName);
			if(!view){
				view = plus.webview.create(fileName,viewName,style,param);
				/*如果生命周期跟着父窗口，则加入列表*/
				if(isAlieWithParent===true)
					that._newView.push(view);//记录开的缓存，以备关闭
			}		
			that.view = view;
			return that;
		},
		show:function(extra,aniShow,duration){
			//todo assert view not null
			/*执行resume数据*/
			var that = this;
			extra = extra || {};
			aniShow = aniShow || "slide-in-right";
			duration = duration || "150";
			//console.log(extra); 
			that.view.evalJS("window.startup.onResume("+JSON.stringify(extra)+");");
			//console.log("["+that.view.id+"]onResume");
			/*显示画面*/
			that.view.show(aniShow,duration);
		},
		hide:function(aniShow,duration){
			var that = this;
			aniShow = aniShow || "slide-in-left";
			duration = duration || "150";			
			that.view.hide(aniShow,duration);			
		},
		close:function(aniShow,duration){
			var that = this;
			that.hide();
			that.view.close();
		},
		getWebviewById:function(id){
			var that = this;
			return that.view.getWebviewById(id);
		},
		opener:function(){
			var that = this;
			return that.view.opener();
		},
		append:function(childView){
			this.view.append(childView.view);
		},
	});
	window.View = View;
})();