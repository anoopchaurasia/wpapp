fm.Package("com.reader.controller");
fm.Class("AddFeedSourceController", 'jfm.dom.Controller');
com.reader.controller.AddFeedSourceController = function (base, me, Controller) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
	var query;
    this.AddFeedSourceController = function () {
		query = location.hash.split("?")[1];
		if(query){
			query = query.match(/string=(.*?)&|string=(.*?)$/i);
			query = query && (query[1] || query[2]);
		}
		me.results = [];
    };

	this.onStart = function(keys, cb){
		cb();
	};

	this.afterRender = function(){
		me.listcontainer.height(window.innerHeight- me.listcontainer.position().top - 5);
		me.submit.click(formSubmit);
		if(query && query.length > 0){
			me.name.val(query);
			me.submit.click();
		}
	}

	this.save = function(item){
		var obj = {
			"website": item.website,
			"url": item.feedId.replace("feed/", ""),
			"type": "Added",
			"name": item.title,
			"thumbnail": "http://www.google.com/s2/favicons?domain="+item.website,
			"full": true,
			inlist: 'true'
		}
		FeedList.getInstance().add(obj, function(){
			history.back();
		});
	};

	this.onStop = function(){
		me.name.blur();
	};

	function formSubmit(e){
		if($.trim(me.name.val()) === "" ) return false;
		e.preventDefault();
		me.name.blur();
		var url = "/reader?method=getFeed&query_data=";
		url = ReadFile.isPhone ? "http://cloud.feedly.com/v3/search/feeds?n=15&q=":url;
		jQuery.get(url+me.name.val(), addResult).fail(function(resp){
			alert("Fail to load. Please check your internet connection.");
 		});
		return false;
	}

	function addResult(data){
		if(data.results.length === 0){
			me.info.show().text("No Result found!");
			return;
		}
		me.info.hide();
		me.$results.clear();
		me.$results.add(data.results);
	}
};