fm.Package("jfm.hash");
fm.AbstractClass("HashChange");
jfm.hash.HashChange = function (me){this.setMe=function(_me){me=_me;};
	var oldHash;
	function onHashChange(){
		var hash = location.hash.substring(1);
		var query = hash.split("?");
		hash = query[0];
		query = query[1];
		if(hash === oldHash) return;
		var found = false;
		var hashArr = hash.split("/"), s, keyValue = {};
		for(var k=0; k < me.route.length; k++){
			s = me.route[k].path.split("/");
			if(s.length == hashArr.length){
				for(var i= 0; i < s.length; i++){
					if(s[i] == hashArr[i]){
						continue;
					}else if(s[i].indexOf(":") == 0){
						keyValue[s[i].substring(1)] = hashArr[i];
						continue;
					}
					else {
						break;
					}
				}
				if(i == s.length){
					me.onUrlChange( me.route[k], keyValue );
					found = true;
					break;
				}
			}
		}
		if(!found && me.defaultRoute){
			location.hash = me.defaultRoute;
		}
		oldHash = hash;
	}

	this.activateCurrent = function () {
		onHashChange();
	};
	function setTemplates(){
        $("[fm-controller]").each(function(){
            var controller = fm.isExist(this.getAttribute('fm-controller'));
            var url = "" + controller.getClass();
            controller.setTemplate(this,  url);
            new jfm.dom.DomManager($(this), new controller);
         });
    }
    var currentView;
    
    var oldKeyValue;
    this.onUrlChange = function(url, keyValue){
		if(typeof url.view === 'string'){
			fm.Include(url.view);
			//$(document).off('include_file_loaded').on('include_file_loaded', function(e, data){
			//	if(data === url.view){
					setTimeout(function(){
						url.view = fm.isExist(url.view);
						me.onUrlChange(url, keyValue);
					}, 10);
				//}
			//});
		}
		else{
			if(currentView && url.view.toString() === currentView.toString() ){
				currentView.onChange(keyValue, oldKeyValue);
				oldKeyValue = keyValue;
				return;
			}else if(currentView){
				currentView.onStop();
			}
			var view = new url.view(keyValue);
			view.onStart(keyValue);
			currentView = view;
		}
    };

	this.HashChange = function(  ) {
		this.route = [];
		this.defaultRoute = "";
		window.onhashchange = onHashChange
		setTemplates();
	};
};