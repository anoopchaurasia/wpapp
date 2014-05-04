fm.Package("com.reader.article");
fm.Import("com.reader.article.Articles");
fm.Import("com.reader.source.Sources");
fm.Import("com.reader.setting.Settings");
fm.Class("ArticleListController", 'jfm.dom.Controller');
com.reader.article.ArticleListController = function (base, me, Articles, Sources, Settings, Controller) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    this.onStart = function(pathinfo, cb){
        Sources.getInstance().getArticles(pathinfo.sourceId, function(articles){
            me.articles = articles;
            cb();
        });
    };

	this.getThumbnail =function(){
	
	}
	this.replaceSpace=function(a){
	 return a.replace(/\s/g, '&nbsp;');
	};
    this.afterRender = function(){
        me.articleMove.height(window.innerHeight-40);
        move(me.articleMove);
    }
    var pathid;
    this.onChange = function(pathinfo, cb){
        pathid = parseInt(pathinfo.sourceId);
		
         Sources.getInstance().getArticles(pathid, function(articles){
            me.articles = articles;
            cb();
         });
    };

    var windowResize;

    this.onStop = function(){
        windowResize();
        me.articleMove && me.articleMove.parent().scrollTop(0);
    };
    
    this.showArticle = function (articleId) {
        location.hash = location.hash + "/article/" + articleId;  
    };

    function setValues (){
        me.article_height = 130;
        me.width = me.settings.window_width - me.settings.sourceListwidth;
        me.artcle_width = me.width < 300 ? me.width: 300;
        me.verticleAlign = me.width <= 500;
    }

    this.ArticleListController = function  (lastState) {
        me.settings = Settings.getInstance();
        setValues();
		$(window).scrollTop(0);
        windowResize = me.settings.on('window-resize', function(){
            setValues();
            me.callAll("change");
        });
    };


    function move(elem){
	    return
        var current;elem = $(elem);
        $(document).off('swipeleft swiperight').on('swipeleft swiperight', function(e){
            var elemets = elem.find(".newsSnippet");
            current = current || elemets.eq(0);
            current.removeClass('selected');
            switch(e.type){
                case 'swipeleft':{
                    var id = Sources.getInstance().next(parseInt(pathid));
                    location.hash = location.hash.replace(/(\d*?)$/m, id);;
                    break;
                }
                case 'swiperight':{
                     var id = Sources.getInstance().prev(parseInt(pathid));
                    location.hash = location.hash.replace(/(\d*?)$/m, id);;
                    break;
                }
            }
         });
    };

    function scrollIntoViewLeft( element, elem ) {
        elem = elem.parent().parent();
        var containerLeft = elem.scrollLeft();
        var containerRight = containerLeft + elem.width();
        var elemLeft = element[0].offsetLeft - elem[0].offsetLeft;
        var elemRight = elemLeft + element.width() + 10;
        if (elemLeft < containerLeft) {
            elem.scrollLeft(elemLeft);
        }
        else if (elemRight > containerRight) {
            elem.scrollLeft(elemRight - elem.width());
        }
    }
    function scrollIntoViewTop( element, elem ) {
        var containerTop = elem.scrollTop();
        var containerBottom = containerTop + elem.height();
        var elemTop = element[0].offsetTop - elem[0].offsetTop;
        var elemBottom = elemTop + element.height() + 10;
        if (elemTop < containerTop) {
            elem.scrollTop(elemTop);
        }
        else if (elemBottom > containerBottom) {
            elem.scrollTop(elemBottom - elem.height());
        }
    }
};
