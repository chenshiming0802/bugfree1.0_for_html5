(function(B,T,Mod){
	"use strict";
	 
	var page = function (){};
	T.extend(page.prototype,B,{
		onCreate:function(){
			var that = this , doc = document; 
			
			that.assignUserInfo = doc.getElementById("assignUserInfo");
			that.assignUser = doc.getElementById("assignUser");

			that.editBt = doc.getElementById("editBt");
			that.cancelBt = doc.getElementById("cancelBt");
			that.commonReplySel = doc.getElementById("commonReplySel");
			that.replyTa = doc.getElementById("replyTa");
			
			that.searchuserView = T.createView("searchuser.html","searchuser",{},{});
			return true;
		}, 
		onResume:function(extra){    
			var that = this , doc = document;
			return true;
		}, 
		onJs:function(){  
			var that = this,doc = document;
			T.on("change",that.commonReplySel,function(e){
				 that.replyTa.value = T.form_select_getText(that.commonReplySel);
			});
			T.on("tap",that.assignUserInfo,function(e){
				console.log("tap assignUserInfo");
				that.startActivityForResult(that.searchuserView,"searchuserView");
				that.searchuserView.show([]);
			});			
			T.on("tap",that.editBt,function(e){
				if(that.replyTa.value==""){
					plus.nativeUI.toast("请输入回复意见！");
					return;
				}
				/*
				Mod.getRemoteJsonByProxy("buginfos2.php",
					{
						"pageIndex":pageIndex,
						"pageSize":that.pageSize,
						"isAssignMe":that.isAssignMe,
						"isMeCreate":that.isMeCreate,
						"queryString":that.queryString,
					},
					callback
				);*/	
			});
			T.on("tap",that.cancelBt,function(e){
				that.currentView.hide();
			});
		}, 
		onActivityResult:function(requestCode, resultCode,extraStr){
			var that = this;
			switch(requestCode){
				case "searchuserView":
					that.assignUserInfo.value = extraStr.realName + " - " + extraStr.userName;
					that.assignUser.value = extraStr.userName;
				break;
			}
		},
	});  
	
	window.page = new page();
})(window.base,window.tools,window._mod);
