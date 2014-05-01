fm.Package("com.reader.view");
fm.Import("com.reader.controller.AddFeedSourceController");
fm.Class("AddFeedSource", "jfm.dom.View");
com.reader.view.AddFeedSource = function (base, me, AddFeedSourceController, View){this.setMe=function(_me){me=_me;};
    this.AddFeedSource = function(){
        this.url = '/html/addfeedsource.view.html';
        this.items = [
            {
                controller: AddFeedSourceController,
                template: '/html/addfeedsource.html',
                container : '#container'
            }
        ];
    };

    this.onChange = function(keyValue, oldKeyValue){
        this.reRender(ArticleListController, keyValue);
    };
};