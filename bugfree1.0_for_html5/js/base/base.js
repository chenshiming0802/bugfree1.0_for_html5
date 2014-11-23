/* Page的基类，理论上非不得已的情况下都放在tools下 */
(function(){
	"use strict"

	window.base =  {  
		/*给子窗口继承，父窗口调用*/
	 	setPullLoadMore:function(weixin){
			weixin.evalJS("document.addEventListener('plusscrollbottom',function(){page.onPullLoadMore()});");	
	 	},
	 	/*给父窗口继承，父窗口调用*/
		setPullRefresh:function(weixin){
			var that = this;
			weixin.setBounce({position:{top:"20px"},changeoffset:{top:"48px"}});	 
			var etext = document.getElementById("text"),
				eicon = document.getElementById("icon");			 
			weixin.addEventListener("dragBounce",function(e){
					switch(e.status){
						case "beforeChangeOffset"://下拉可刷新状态
							etext.innerText = "下拉可以刷新";
							eicon.className = 'mui-pull-loading mui-icon mui-icon-pulldown';
							eicon.style.webkitTransition = "all 0.3s ease-in";
							eicon.style.webkitTransform = "rotate(0deg)";
							break;
						case "afterChangeOffset"://松开可刷新状态 
							etext.innerText = "释放立即刷新";
							eicon.className = 'mui-pull-loading mui-icon mui-icon-pulldown';
							eicon.style.webkitTransition = "all 0.3s ease-in";
							eicon.style.webkitTransform = "rotate(180deg)";
							break;
						case "dragEndAfterChangeOffset"://正在刷新状态							
							etext.innerText = "正在刷新...";
							eicon.className = 'mui-pull-loading mui-icon mui-icon-spinner-cycle';
							eicon.style.webkitAnimation = "spin 1s infinite linear";
							setTimeout(function(){
								weixin.evalJS("page.onPullRefresh();");	
								weixin.endPullToRefresh();
								that._pullReset();								
							},0);
							
							break;
						default:
							break;
					}
				},false);
		},
		_pullReset:function() {
			var etext = document.getElementById("text"),
				eicon = document.getElementById("icon");	
			etext.innerText = "下拉可刷新";
			eicon.style.webkitTransition = "";
			eicon.style.webkitTransform = "";
			eicon.style.webkitAnimation = "";
			
		},
		
	};
	
})();

/*项目的工具类*/
(function(){
	"use strict"

	window.tools =  {  
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
		/*业务功能:*/
		getRemoteJsonByProxy:function(serviceName,posts,successFunction,errorFunction){
			var baseUrl = "http://testenv.bsp.bsteel.net/baosteel_cas2/service_proxy2.jsp";
			var u = baseUrl + "?_SERVICE_=" + serviceName; 
			//u = "http://192.168.1.107/test/posttest.php?id=1";
			
			/*
			var forms = new FormData();  
			for(var p in posts){
				console.log(p+"::"+posts[p])
				forms.append(p, posts[p]);	
			}*/
			
			var sep = "";
			var postData = "";
			for(var p in posts){
				postData += sep + p + "=" + posts[p];
				sep = "&";
			}
			
			var xhr=new plus.net.XMLHttpRequest();
			xhr.onreadystatechange=function(){
				if(xhr.readyState == 4){
					if ( xhr.status == 200 ) {				
						console.log("  return="+xhr.responseText); 
						var str = xhr.responseText;
						//alert(str);
						var data = [];
						try{
							data = eval('(' + str + ')');
						}catch(e){
							data.resultFlag = "1";
							data.resultMessage = "网络错误";
						}
						if(data.resultFlag=="0"){
							successFunction(data);
						}else{
							errorFunction = errorFunction || alert;
							errorFunction("网络错误");
						}
					}else{
						
					}
				}
			};
			xhr.open("POST", u);
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			xhr.setRequestHeader("ucore1","ADE1C062E16EAB4AACA11F7F89053FFD");			
			// xhr.send("pageIndex=1&pageSize=20 ");//
			xhr.send(postData);
			console.log("post "+u);
			console.log("   data:"+postData)
		}
	};
	
})();