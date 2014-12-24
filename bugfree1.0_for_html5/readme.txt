编码要求：
1.整个项目应用代码不能直接调用plus.webview
2.第一个页面需要手动调用resume动作 that.currentView.view.evalJS("window.startup.onResume([])");