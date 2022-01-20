

import(document.currentScript!.dataset["src"]!).then(function(module){
	//@ts-ignore
	module.default(Application.templateContext);		
});


