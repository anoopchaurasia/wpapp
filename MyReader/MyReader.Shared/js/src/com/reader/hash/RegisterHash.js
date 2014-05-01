fm.Package("com.reader.hash");
fm.Import("com.reader.view.Home");
fm.Import("com.reader.view.NewsList");
fm.Import("com.reader.view.Article");
fm.Import("com.reader.view.EditFeed");
fm.Import('com.reader.view.AddFeedSource');
fm.Class("RegisterHash","jfm.hash.HashChange");
com.reader.hash.RegisterHash = function (base, me, Home, NewsList, Article, EditFeed, HashChange){this.setMe=function(_me){me=_me;};this.setMe=function(_me){me=_me};
    'use strict';
    var lastState = {}; 
    this.RegisterHash = function () {
        base();
        this.route =[
           {
                path: "/source",
                view: Home
           },
           {
                path: "/editfeed",
                view: "com.reader.view.EditFeed"
           },
		   {
				path:"/source/:sourceId",
				view: "com.reader.view.NewsList" 
		   }
           ,
            {
                path: "/source/:sourceId/article/:articleId",
                view: "com.reader.view.Article"
            },
            {
                path: "/addfeedsource",
                view: "com.reader.view.AddFeedSource"
            }
        ];
        this.defaultRoute = "/source";
        this.base.activateCurrent();
    };
};