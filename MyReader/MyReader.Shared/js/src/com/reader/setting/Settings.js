fm.Package("com.reader.setting");
fm.Class("Settings", "jfm.dom.ChangeListener");
com.reader.setting.Settings = function (base, me, ChangeListener){this.setMe=function(_me){me=_me;};
	'use strict';

	this.Settings = function(){

		var settings = JSON.parse(localStorage.settings||"{}");
		this.fontSize = settings.fontSize || 20;
		this.color_class = settings.color_class || {color:'black','background-color':'white'};
		base();
		var t;
		var oldSize = $(window).resize(function(){
			clearTimeout(t);
			t = setTimeout(function() {
				var temp=$(window).width();
				me.window_width = temp;
				me.sourceListwidth =  temp * 15/100 < 150 ? 40 : 160;
				me.callAll('window-resize', temp , oldSize);
				oldSize = temp;
			}, 50);
		}).width();
		this.window_width = oldSize;
		this.sourceListwidth =  oldSize * 15/100 < 150 ? 40 : 160;
	};


	this.set = function(name, value){
		if(value < 10 || value > 30) return;
		var old=this[name];
		this[name] = value;
		localStorage.settings = JSON.stringify(this.serialize());
		this.callAll(name, value, old);
	};

	var instance;
	Static.getInstance = function () {
		if(!instance){
			instance = new me();
		}
		return instance;
	};
};
