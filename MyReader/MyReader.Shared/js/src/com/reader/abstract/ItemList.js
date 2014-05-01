fm.Package("com.reader.abstract");
fm.AbstractClass("ItemList");
com.reader.abstract.ItemList = function (me){this.setMe=function(_me){me=_me;};
    'use strict';
    this.setMe = function (_me) { me = _me };
    this.ItemList = function (items, type) {
        this.items = [];
        for (var k = 0; k < items.length; k++) {
            this.items.push(new type(items[k], k) );
        }
    }

    this.getById = function (id) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                return this.items[i];
            }
        }
    }

	this.add = function(item){
		this.items.push(item);
	};
}