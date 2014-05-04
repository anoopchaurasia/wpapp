fm.Package("com.feedly");
fm.Import("com.feedly.Api");
fm.Class("Subscription");
com.feedly.Subscription = function (me, Api) {
    'use strict';
    var api;
    this.Subscription = function () {
        api = Api.getInstance();
    };

    this.getList = function (cb) {
        Api.getData(
            api.url + "/subscriptions",
            {},
            function (list) {
                cb(createList(list));
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