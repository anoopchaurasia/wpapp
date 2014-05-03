fm.Package("lib");
fm.Class("FillContent");
lib.FillContent = function (me) {
	this.setMe = function( _me ) {
		me = _me;
	};
	$.fn.SkipRoot = function( skipAfterA ) {
		var aFound = false;
		this.find("*").not(".a").filter(function( ) {
			if($(this).find(".a").length ) return false;
			if($(this).find('img').length) return false;
			var tag = this.tagName.toLowerCase();
			return tag != 'br' && tag != 'img' && $.trim($(this).text()) == '';
		}).remove();
	};
	this.truncateWithHeight = function( dom, from, origHtml ) {
 		var lineHeight = parseInt(dom.css("line-height"));
		dom.html(origHtml);
		var limit = dom.height() + dom.offset().top - lineHeight;
		var as = dom.find(".a");
		$(as.splice(0, from)).remove();
 		dom.SkipRoot(true);
        
	    as.filter("img.a").filter(function (a, index) {
		  return $(this).height() + $(this).offset().top > limit;
		}).remove();
		as.filter(".a").filter(function(a, index){
		  return $(this).height() + $(this).offset().top > limit;
		}).remove();
		var len = dom.find(".a").length;
		dom.SkipRoot();
		return [ from + len, len ];
	};

	var html;
	this.FillContent = function( data ) {
	    html = data;
	};
};
