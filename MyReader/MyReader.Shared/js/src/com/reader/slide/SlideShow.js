fm.Package("com.reader.slide");
fm.Class("SlideShow");
com.reader.slide.SlideShow = function (me){this.setMe=function(_me){me=_me;};
	'use strict';
	this.SlideShow = function (url) {
		var count = 0;
		var cont = $('<div/>',{
		 height: "100%",
		 width: "100%",
		 class: 'imageView',
		 click: function(){
		    cont.remove();
		 }
		}).appendTo('body');
		cont.append('<img src="'+url +'"/>');
	};
};
