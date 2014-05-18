fm.Package("com.feedly");
fm.Import("com.feedly.Api");
fm.Class("Feeds");
com.feedly.Feeds = function (me, Api) {
    'use strict';

    var list;

    Static.getMix = function (cb) {
        if (list) {
            cb(list);
            return;
        }
        Api.getData(
            Api.url + "/mixes/contents",
            {
                streamId: "user/8b7ff160-7141-4ea5-b344-cac0bb77949e/category/global.all",
                count: 3
            },
            function (l) {
                cb(list);
            },
            'get',
            {
                "X-Feedly-Access-Token": window.access_token
            }
        );
    };
};