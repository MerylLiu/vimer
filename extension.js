var hx = require("hbuilderx");

var escCount = 0;

var escCount = 0;

//该方法将在插件激活的时候调用
function activate(context) {
	let vimerCfg = hx.workspace.getConfiguration("vimer");
	let enableVimer = vimerCfg.get("enable");
	
	let editorConfig = hx.workspace.getConfiguration("editor");
	escCount++;
	if(escCount % 2 ==0){
		editorConfig.update("careWidth",3);
	}else{
		editorConfig.update("careWidth",2);
	}
	
	hx.window.getActiveTextEditor().then(editor=>{
		let oldText = editor.document.getText();
		
		let onDidChangeTextDocumentEventDispose = hx.workspace.onDidChangeTextDocument(function(event){
		        let document = event.document;
				let newText = document.getText();
				
				let balance = newText.replace(oldText,'');
				
				console.log(balance);
		        //do something with document.
		    });
		context.subscriptions.push(onDidChangeTextDocumentEventDispose);	
	})
		
	
	let disposable = hx.commands.registerCommand('extension.helloWorld', () => {
		hx.window.showInformationMessage('你好，这是我的第一个插件扩展。');
	});
	//订阅销毁钩子，插件禁用的时候，自动注销该command。
	context.subscriptions.push(disposable);
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
