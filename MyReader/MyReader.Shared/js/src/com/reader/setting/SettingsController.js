fm.Package("com.reader.setting");
fm.Import("com.reader.setting.Settings");
fm.Class("SettingsController", 'jfm.dom.Controller');
com.reader.setting.SettingsController = function (base, me, Settings, Controller) {
    'use strict';
    this.setMe = function (_me) { me = _me; };

	this.SettingsController = function(settings){
		this.settings = Settings.getInstance();
		$(document).on('page_info', function(e, data){
			me.colNumber.html(data.colNumber);
			me.totalCol.html(data.totalCol);
		});
	};

	this.afterRender = function(){
		$('body').css(this.settings.color_class);
		$("#taskbar").css("visibility", "visible");
	};

	this.onStart = function(keyvalue, cb){
		cb();
	};

	this.onStop = function(){
		var copy = JSON.parse(JSON.stringify(this.settings.color_class));
		for(var k in copy)copy[k]="";
		$('body').css(copy);
	};

	this.open = function(){
		this.createDom('/html/settings.html',function(dom){
			$("body").append( dom.el );
		})
	};

    this.applyFontSize = function(size){
    	this.settings.set('fontSize', size);
    };

	this.applyColors = function(cls){
    	this.settings.set('color_class', cls);
		$('body').css(this.settings.color_class);
    };

    this.close = function(){
    	$("#settingPopup").remove();
    };
};