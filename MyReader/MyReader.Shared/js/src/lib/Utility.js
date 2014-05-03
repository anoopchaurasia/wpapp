fm.Package('lib');
fm.Class("Utility");
lib.Utility = function (me){this.setMe=function(_me){me=_me;};
	var myRegEx = /<\/?[^<>]*\/?>/gim;
	Static.stripHTML = function (htmlStr) {
	    var html = htmlStr;
	    if (typeof htmlStr === 'string') {
	        html = $("<div>" + htmlStr + "</div>");
	    }
		var imageList = [];
		var temp;
		html
		 .find("img").filter(function( ) {
		 	var outerHTML = this.outerHTML;
				temp = {
					
					height: outerHTML.match(/(height=.)([\d]*)/) && outerHTML.match(/(height=.)([\d]*)/)[2] || this.style.height,
					width: outerHTML.match(/(width=.)([\d]*)/) && outerHTML.match(/(width=.)([\d]*)/)[2] || this.style.width
				};
				
				if(temp.height > 100 && temp.width > 100)
				{
				   $(this).replaceWith("<div class='ImageShow'><img class='a' style='max-width:100%;max-height:100%;' src='"+this.src+"' /></div>").after("<div style='clear:left'>&nbsp;</div>");
				   return false;
					
				}
				return true;
			
		}).remove();
		html.find("iframe").remove();
		var counter = 0;
		return [html.html().replace(/>|</gim, function(a){ return a=='>'?"> ": " <"})
		.replace(/\sstyle=""/gim, " ").replace( /(\s*)<\/?[^<>]*\/?>|(\s*)(.*?)\s/gim,function(a, b){
			if(a.match(/<\/?[^<>]*\/?>/gim) || !a.trim()) return a;
			return "<span id='word-"+ counter++ +"' class='a'>"+ a+" </span>";
		}), 5];
	};
};