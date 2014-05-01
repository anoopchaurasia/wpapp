fm.Package("com.reader.view");
fm.Import("com.reader.article.ArticleListController");
fm.Class("NewsList", "jfm.dom.View");
com.reader.view.NewsList = function (base, me, ArticleListController, View){this.setMe=function(_me){me=_me;};
	this.NewsList = function(){
		this.url = '/html/newslist.view.html';
		this.items = [
            {
                controller: ArticleListController,
                template: '/html/articles.html',
                container : '#dynamic'
            }
        ];
	};

	this.onChange = function(keyValue, oldKeyValue){
		this.reRender(ArticleListController, keyValue);
	};
};