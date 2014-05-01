fm.Package("com.reader.source");
fm.Import("com.reader.source.Source");
fm.Class("Sources", "com.reader.abstract.ItemList");
com.reader.source.Sources = function (base, me, Source, ItemList) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    this.Sources = function () {
	    base([], Source);
    }

	this.next = function(id){
		 
	}

	this.prev = function(id){
		 
	}

	Static.convert = function(items){
		var arr = [], item;
		for(var k=0; k<items.length; k++){
			item = instance.getById(items[k].id);
			if(item){
				arr.push( item );	
			}else{
				arr.push( new Source(items[k]) );
			}
		}
		return arr;
	}

    this.getArticles = function(id, cb){
		if(!this.getById(id)){
			FeedList.getInstance().getById(id, function(item){
				me.add( new Source(item) );
				me.getById(id).getArticles(cb);
			});
		}else{
			me.getById(id).getArticles(cb);
		}
    };

    var instance;
    Static.getInstance = function () {
		if(!instance) instance = new com.reader.source.Sources();
		return instance;
    };
};

window.onerror = function(e){
	//alert(e + "");
}