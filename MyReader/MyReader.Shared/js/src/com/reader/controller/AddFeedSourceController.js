fm.Package("com.reader.controller");
fm.Import("com.feedly.Api");
fm.Import("com.feedly.Subscription");
fm.Class("AddFeedSourceController", 'jfm.dom.Controller');
com.reader.controller.AddFeedSourceController = function (base, me, Api, Subscription, Controller) {
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
	    Subscription.add(item);
	};

	this.onStop = function(){
		me.name.blur();
	};

	function formSubmit(e){
		if($.trim(me.name.val()) === "" ) return false;
		e.preventDefault();
		me.name.blur();
		var api = new Api();
		Api.getData(
            api.url + "/search/feeds?q=" + me.name.val(),
            {},
            addResult);
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