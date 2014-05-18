fm.Package("com.feedly");
fm.Class("Api");
com.feedly.Api = function (me) {
    'use strict';
    this.setMe = function (_me) {
        me = _me;
    }
    
    this.init = function () {
        Static.url = "https://sandbox.feedly.com/v3",
        Static.clientId = "sandbox";
        Static.secretId = "0AUDIAHZEB0ISJ1JLFWZ";
        Static.scopeURL = 'https://cloud.feedly.com/subscriptions';
        Static.callbackURL = "https://localhost";
    };

    Static.getData = function (url, data, cb, type, header) {
        header = header || {};
        jQuery.ajax({
            url: url,
            type: type,
           dataType: type === 'post' ? "text":"json",
            data: data,
            success: cb,
            error: function (resp, a) {5
               debugger;
            },
            headers: header
        });
    };
};