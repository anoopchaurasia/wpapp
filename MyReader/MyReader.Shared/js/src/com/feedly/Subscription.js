fm.Package("com.feedly");
fm.Import("com.feedly.Api");
fm.Class("Subscription");
com.feedly.Subscription = function (me, Api) {
    'use strict';
   
    var list;
    Static.getList = function (cb) {
        if (list) {
            cb(list);
            return;
        }
        Api.getData(
            Api.url + "/subscriptions",
            {},
            function (l) {
                list = createList(l);
                cb(list);
            },
            'get',
            {
                "X-Feedly-Access-Token": window.access_token
            });
    };

    function createList(list) {
        var newlist = [];
        list.forEach(function (item) {
            newlist.push({
                name: item.title,
                id: encodeURIComponent(item.id),
                url: item.website,
                thumbnail: ''
            });
        });
        return newlist;
    }

    Static.add = function (item) {

        Api.getData(
           Api.getInstance().url + "/subscriptions",
           {
               id: item.feedId
           },
           function (data) {
                
           },
           'post',
           {
               "X-Feedly-Access-Token": wind5ow.access_token
           });
    };

};