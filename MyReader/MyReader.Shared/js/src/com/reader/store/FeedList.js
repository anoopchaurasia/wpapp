fm.Package("com.reader.store");
fm.Include("lib.idbStore");
fm.Include("com.reader.source.SourceList");
fm.Class("FeedList");
com.reader.store.FeedList = function (me) {
    this.setMe = function (_me) { me = _me; };
    'use strict';
    var instance;
    Static.main = function () {
       // instance = new me();
    };

    var myStore;
    this.FeedList = function () {
        this.storeName = "feeds";
        this.storePrefix = "column-reader" + "-";
        this.keyPath = 'id';
        this.autoIncrement = true;
        this.dbVersion = 16.0;
        this.indexes = [
            {
                name: 'type'
            },
			{
			    name: 'name'
			},
			{
			    name: 'inlist'
			},
            {
                name: 'id',
                keyPath: 'id',
                unique: true
            }
        ];
        myStore = new IDBStore(this);
    };
    var paendingCB;
    this.getAll = function (cb) {
        myStore.getAll(cb);
    };

    this.remove = function (id, cb, ecb) {
        myStore.remove(id, cb, ecb);
    };

    this.getSelected = function (cb, ecb) {
        if (!myStore.db) {
            console.log("345");
            paendingCB = function () { me.getSelected(cb, ecb) };
            return;
        }
        console.log("caleed");
        myStore.query(cb, {
            index: "inlist",
            keyRange: myStore.makeKeyRange({
                lower: "true",
                upper: "true",
                onError: ecb
            })
        });
    };

    this.onError = function (error) {
        alert(error);
    };

    this.onStoreReady = function () {
        myStore.get(1000, function (a) {
            if (!a) {
                me.add(sourceList, function () {
                    paendingCB && paendingCB();
                });
            } else {
                paendingCB && paendingCB();
            }
        });
    };

    this.add = function (feed, cb, ecb) {
        if (jQuery.isArray(feed)) {
            var arr = [];
            for (var k = 0; k < feed.length; k++) {
                arr.push({
                    type: "put",
                    value: feed[k]
                });
            }
            myStore.batch(arr, function (s) {
                cb(s);
            }, ecb);
        } else {
            myStore.put(feed, function (s) {
                cb(s);
            }, ecb);
        }
    };

    this.getById = function (id, cb) {
        myStore.get(id, cb);
    };

    this.clear = function () {
        myStore.clear();
    };

    Static.getInstance = function () {
        return instance;
    };
};

