fm.Package("com.reader.article");
fm.Import("com.reader.source.Sources");
fm.Import("com.reader.slide.SlideShow");
fm.Import("com.reader.setting.Settings");
fm.Import("lib.FillContent")
fm.Import('lib.Utility');
fm.Class("ArticleController", 'jfm.dom.Controller');
com.reader.article.ArticleController = function (base, me, Sources, SlideShow, Settings, FillContent, Utility, Controller) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    var fontChange;
    this.onStart = function (pathInfo, cb) {
        Sources.getInstance().getArticles(pathInfo.sourceId, function (articles) {
            me.article = articles.getById(parseInt(pathInfo.articleId));
            cb();

            fontChange = Settings.getInstance().on('fontSize,color_class,window-resize', function () {
                create(me.article.content, me.article.image);
            });
			
        });
    };

    this.afterRender = function(){
        create(me.article.content, me.article.image);
        move(me.articleContainer);
    };

    this.onStop = function () {
        fontChange && fontChange();
        renderComplete(0, 0);
        clearTimeout(setTimeOut);
		$("#settingPopup").remove();
    };

    this.ArticleController = function (lastState) {
        $(window).scrollTop(0);
    };
    function getWidth(fs) {
        var w = jQuery(window).width(), cw = fs * multi;
        return Math.min(w - 40, cw);
    }
    var multi = 18;
    var setTimeOut;
    function create(data, image) {

        $(document).off('click').on('click',"#morelink", function () {
            var href = this.href;
            jQuery.get(this.href, function (html) {
                var compare = me.article.contentSnippet.substring(0, 10);
                html = $(html.match(/<body((.*|\s*)*?)(<\/body>)/gi)[0]);
                html.find("script").remove();
                html = html.find(':contains("' + jQuery.trim(compare) + '"):last');
                if (html.length === 0) {
                    window.open(href, "__blank");
                    return;
                }
                html = html.parent().parent().parent();
                var info = Utility.stripHTML(html);
                me.article.content = info[0].trim();
                me.article.imageList = info[1];
                create(me.article.content, me.article.imageList);
            });

            return false;
        });
        var articleContainer = $("#articleContainer").empty();
        var articalWidth = getWidth(Settings.getInstance().fontSize), margins = 0;
        articleContainer.parent().css('fontSize', Settings.getInstance().fontSize);
        var trancatedLength = [0, 1];
        var htm = "<div class='parent selector'><div class='s'></div></div>";
        clearTimeout(setTimeOut);
        var bodyHeight = window.innerHeight - articleContainer.offset().top - 10;
        var content = new FillContent(data);
        var i = 0;
        var removeHeight = margins + 30;
		//data = "<h1 class='title'>" + me.article.title + "</h1>" + data;
        if(false){
            i = 1;
            var elem = $(htm).appendTo(articleContainer);
            elem.find("div.s").height(bodyHeight - removeHeight - 10).width(articalWidth);
            elem.find("div.s").html('<img style="max-width:100%;max-height:100%" src="'+image.url+'">');
            var imageHeight = Math.min(image.height, (articalWidth/image.width)*image.height);
			elem.find("div.s").append("<div class='inImage' style='height:"+ (bodyHeight - removeHeight - 10 - imageHeight ) + "px; width:100%'></div>");
			trancatedLength = content.truncateWithHeight(elem.find("div.inImage"), trancatedLength[0], data);			
		}
        function recursive() {
            if (trancatedLength[1] <= 0) {
                renderComplete(1, i);
                articleContainer.append('<br style="clear:both" />');
                $("div.s:last").append("<a id='morelink' href='" + me.article.link + "'>more...</a>");
                return;
            }
            i++;
            var elem;
            articleContainer.width((i) * (articalWidth + 40));
            elem = $(htm).appendTo(articleContainer);
            elem.find("div.s").height(bodyHeight - removeHeight - 10).width(articalWidth);
            trancatedLength = content.truncateWithHeight(elem.find("div.s"), trancatedLength[0], data);
            setTimeOut = setTimeout(recursive, 10);
        }
        recursive();
    }

	var swipeKeys = {swiperight: 37, swipeleft: 39, swipeup: 39, swipedown: 37};
    function move(elem) {
        var current; elem = $(elem);
        $(document).off('keydown swiperight swipeleft swipeup swipedown').on('keydown swiperight swipeleft swipeup swipedown', function (e, data) {
            var elemets = elem.find(".selector");
            current = current && current.filter(":visible").length && current || elemets.eq(0);
            var changed = false;
            var keyCode = swipeKeys[e.type] || e.keyCode; 
            switch (keyCode) {
                case 37: {
                    if (current.prev().length) {
                        current.removeClass('selected');
                        current = current.prev();
                        changed = true;
                    }
                    break;
                }
                case 39: {
                    if (current.next().length && current.next()[0].nodeName !== "BR") {
                        current.removeClass('selected');
                        current = current.next();
                        changed = true;
                    }
                    break;
                }
            }
            if (changed) {
                renderComplete(current.index() + 1);
                current.addClass('selected');
                scrollIntoView(current, elem);
            }
        });
    };
    function scrollIntoView(element, elem) {
        elem = elem.parent();
        var containerLeft = elem.scrollLeft();
        var containerRight = containerLeft + elem.width();
        var elemLeft = element[0].offsetLeft - elem[0].offsetLeft;
        var elemRight = elemLeft + element.width() + 10;
        if (elemLeft < containerLeft) {
            elem.animate({scrollLeft:elemLeft});
        }
        else if (elemRight > containerRight) {
            elem.animate({scrollLeft:elemRight - elem.width()} );
        }
    }
    var total;
    function renderComplete(page, t) {
        total = t === undefined ? total : t;
        $(document).trigger('page_info', {
            colNumber: page,
            totalCol: total
        });
    }
};
