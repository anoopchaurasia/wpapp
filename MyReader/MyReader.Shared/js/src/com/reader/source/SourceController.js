fm.Package("com.reader.source");
fm.Import("com.reader.source.Sources");
fm.Import("com.feedly.Subscription");
fm.Import("com.reader.setting.Settings");
fm.Class("SourceController", 'jfm.dom.Controller');
com.reader.source.SourceController = function (base, me, Sources, Subscription, Settings, Controller) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    var windowResize, dontRender;
    this.SourceController = function (lastState) {
    	base();
		$(window).scrollTop(0);
        me.settings = Settings.getInstance();
		me.sources = Sources.getInstance();
		me.sources.items = [];
		new Subscription().getList(function(list){
            
			if(me["$sources.items"]){
				me["$sources.items"].add(Sources.convert(list));
			}else{
				me.sources.items = Sources.convert(list);
			}
			if (list.length == 0 && me.addInfo) {
			    me.addInfo.show();
			}
		});
        windowResize = me.settings.on('window-resize', function(){
            me.callAll("change");
        });
    };

    function setValues(){
        me.hideText = window.innerWidth * 15/100 < 150;
    }
	
	this.afterRender = function(){
        var oldScrollY =0;
		me.sourceListCont.height(window.innerHeight - me.sourceListCont.position().top-2);
    };

    this.reRender = function(){
        return false;
    };

    this.onStart = function(keyValue, cb){
        cb(dontRender);
    };
    this.onStop = function(cb){
        windowResize();
        cb(this.sources);
    };
};
 
