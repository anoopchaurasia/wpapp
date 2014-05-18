fm.Package("com.reader.source");
fm.Import("com.reader.article.Articles");
fm.Import("com.feedly.Api");
fm.Class("Source");
com.reader.source.Source = function (me, Articles, Api) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    this.Source = function (obj) {
        this.url = obj.website;
        this.id = obj.id;
        this.name = obj.name;
        this.thumbnail = obj.thumbnail;
    }

    this.getArticles = function(cb){
    	if(me.articles ){
            cb(me.articles);
        }else{
    	    Api.getData(Api.url + "/mixes/contents", {
    	        streamId:decodeURIComponent(me.id),
                count:3
    	    }, function (data) {
                me.articles = new Articles( data, me );
                cb(me.articles);
    	    }, "get",
            {
                "X-Feedly-Access-Token": window.access_token
            }
            );
        }
    };
}