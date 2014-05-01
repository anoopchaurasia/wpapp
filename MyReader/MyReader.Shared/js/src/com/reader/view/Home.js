fm.Package("com.reader.view");
fm.Import("com.reader.source.SourceController");
fm.Class("Home", "jfm.dom.View");
com.reader.view.Home = function (base, me, SourceController, View){this.setMe=function(_me){me=_me;};
	this.setMe=function(_me){me=_me};
	this.Home = function(){
		this.url = '/html/home.view.html';
		this.items = [
            {
                controller: SourceController,
                template: '/html/sources.html',
                container : '#sourceList'
            }
        ];
	};
};