
console.info(`current script: ${(document.currentScript as HTMLScriptElement).outerHTML}`);
import(document.currentScript!.dataset["src"]!).then(function(module){
	//@ts-ignore
	module.default(Application.templateContext);		
});


