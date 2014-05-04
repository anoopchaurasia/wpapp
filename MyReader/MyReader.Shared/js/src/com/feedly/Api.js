fm.Package("com.feedly");
fm.Class("Api");
com.feedly.Api = function (me) {
    'use strict';
    this.setMe = function (_me) {
        me = _me;
    }
    this.Api = function () {
        this.url= "https://sandbox.feedly.com/v3",
        this.clientId = "sandbox";
        this.secretId = "0AUDIAHZEB0ISJ1JLFWZ";
        this.scopeURL = 'https://cloud.feedly.com/subscriptions';
        this.callbackURL = "https://localhost";
    };

    Static.getData = function (url, data, cb, type, header) {
        header = header || {};
        jQuery.ajax({
            url: url,
            type: type,
           dataType: type === 'post' ? "text":"json",
            data: data,
            success: cb,
            error: function (resp, a) {
               debugger;
            },
            headers: header
        });
    };

    var singleton;
    Static.getInstance = function () {
        if (!singleton) {
            singleton = new me();
        }
        return singleton;
    };
};