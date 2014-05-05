fm.Package("com.reader.login");
fm.Import("com.feedly.Authentication");
fm.Class("LoginController", 'jfm.dom.Controller');
com.reader.login.LoginController = function (base, me, Authentication, Controller) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    var authenticator;

    this.LoginController = function (lastState) {
        base();
        document.cookie = 'feedlyToken=asasasas expires=Fri, 3 Aug 2010 20:47:11 UTC;';

        authenticator = new Authentication();
       // authenticator.remove();
        authenticator.login(loginUser);
    };


    function loginUser(access) {
        window.access_token = access;
        location.hash = "#/source";
    }

    this.reRender = function () {
        return false;
    };

    this.onStart = function (keyValue, cb) {
        cb();
    };
    this.onStop = function (cb) {
        cb();
    };
};

