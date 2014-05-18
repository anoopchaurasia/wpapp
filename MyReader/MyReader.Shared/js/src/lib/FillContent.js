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
	    var tempDom = $("<div>"+origHtml+"</div>");
		var limit = dom.height() + dom.offset().top - lineHeight;
		var as = tempDom.find(".a");
		var totalA = as.length;
		$(as.splice(0, from)).remove();
		tempDom.SkipRoot(true);
		dom.html(tempDom.children());
		var len;
        (function () {
            var i = 0;
            var total = as.length; var temp;
            while (i < total && (temp = as[i]) ) {
                temp = $(temp);
                if (temp.height() + temp.offset().top > limit) {
                    break;
                }
                i++;
            }
            $(as.splice(i, total)).remove();
            len = i;
        })();
		/*as.filter(".a").filter(function(a, index){
		  return $(this).height() + $(this).offset().top > limit;
		}).remove();
        */
		
		dom.SkipRoot();
		if (len === 0) {
		  //  dom.remove();
		}
		return [from + len, len, totalA];
	};

	var html;
	this.FillContent = function( data ) {
	    html = data;
	};
};
