fm.Package("com.reader.controller");
fm.Class("EditNewsFeed", 'jfm.dom.Controller');
com.reader.controller.EditNewsFeed = function (base, me, Controller) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    this.EditNewsFeed = function () {
		this.FeedList = {};
		FeedList.getInstance().getAll(function(arr){
			var types = {Added:[]};
			for(var k=0, len=arr.length;k<len; k++){
				types[arr[k].type] = types[arr[k].type] || [];
				types[arr[k].type].push(arr[k]);
			}
			if(types.Added.length ===0) delete types.Added;
			if(me.$FeedList){
				me.$FeedList.add(types);
			}else{
				me.FeedList = types;
			}
		});		
    };

	this.isEmpty = function(items){
		for(var k=0; items && k< items.length; k++){
			if(this.filter(items[k])) return false;
		}
		return true;
	};

	this.addNew = function(){
		location.href = "#/addfeedsource?string="+ me.query.val();
	};

	this.remove = function (feeds, type){
		for(var k=0; k < feeds.length; k++){
			FeedList.getInstance().remove(feeds[k].id);
		}
		me.$FeedList.remove(feeds, type);
	}

	this.filter = function(item){
		return  item.name.toLowerCase().indexOf(me.query.val()) !== -1;
	}

	this.isInList = function(feed){
		return feed.inlist == 'true';
	};

	this.addFeed = function(){
		location.hash = "#/addfeedsource";
	};

    this.domchange = function(data, value){
		data.inlist = "" +data.inlist;
		FeedList.getInstance().add(data, function(){
		});
    };

	this.afterRender = function(){
		me.feedlistContainer.height(window.innerHeight- me.feedlistContainer.position().top - 5);
		me.query.keyup(function(){
			setTimeout(function(){
				me.callAll('change');
			}, 100);
		});	
	};

    this.onStart = function(keys, cb){
		cb();
    }
    this.onStop = function(keys, cb){
     }
};