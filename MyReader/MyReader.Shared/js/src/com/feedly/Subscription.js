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
            cb,
            'get',
            {
                "X-Feedly-Access-Token": window.access_token
            });
    };

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