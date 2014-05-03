fm.Package("com.reader.source");
fm.Import("com.reader.article.Articles");
fm.Class("Source");
com.reader.source.Source = function (me, Articles) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    this.Source = function (obj) {
        this.url = obj.url;
        this.id = obj.id;
        this.name = obj.name;
        this.thumbnail = obj.thumbnail;
    }

    this.getArticles = function(cb){
    	if(me.articles ){
            cb(me.articles);
        }else{
            loadData(me.url, function(data){
                me.articles = new Articles( data, me );
                cb(me.articles);
            });
        }
    };

    function loadData (url, cb) {
		var baseURL;
		if(location.href.indexOf('localhost') != -1){
			baseURL = '/reader/getFeed';
		}else{
			baseURL = 'http://feedly.com/v3/mixes/contents?count=10&streamId=feed/' + url;
		}
        var temp = jQuery.ajax;
        temp({ url: baseURL, dataType:'json', data: {query_data: url}, responseType:'json' }).done(
        function fulfilled(result) {
         //   if (result.status === 200 || result.responseStatus === 200) {
                cb(result.items && result || JSON.parse(result.response));
         //   }
         }, function(e){
             console.log(e.status);
        });
    }
}