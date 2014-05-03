fm.Package("com.reader.article");
fm.Import('lib.Utility');
fm.Class("Article");
com.reader.article.Article = function (me, Utility){this.setMe=function(_me){me=_me;};	this.setMe=function(_me){me=_me};
	'use strict';
	this.Article = function (article, index) {
		this.title = article.title;
		this.link = article.alternate[0].href;
		this.id = index + 1;
		this.image = article.visual;
		var content = (article.content || article.summary);
		var info = Utility.stripHTML( "<h1 class='title'>" + this.title + "</h1>" + content.content);
		this.content = info[0];
		this.imageList = info[1];
		this.contentSnippet = $("<div>" + (article.summary && article.summary.content || content.content) +"</div>").text().substring(0, 70).trim();
	};
};
