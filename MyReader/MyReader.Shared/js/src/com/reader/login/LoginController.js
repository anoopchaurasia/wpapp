fm.Package("com.reader.login");
fm.Class("LoginController", 'jfm.dom.Controller');
com.reader.login.LoginController = function (base, me, Controller) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    this.LoginController = function (lastState) {
        base();
        function launchFeedlyWebAuth() {
            var feedlyURL = "https://cloud.feedly.com/v3/auth/auth\
                              client_id=feedly\
                              &client_secret=0XP4XQ07VVMDWBKUHTJM4WUQ\
                              &grant_type=authorization_code\
                              &redirect_uri=http%3A%2F%2Fwww.feedly.com%2Ffeedly.html";

            var callbackURL = "http://www.feedly.com/feedly.html";
            try {
                var startURI = new Windows.Foundation.Uri(feedlyURL);
                var endURI = new Windows.Foundation.Uri(callbackURL);

                Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(
                    Windows.Security.Authentication.Web.WebAuthenticationOptions.default,
                    startURI,
                    endURI).then(callbackFeedlyWebAuth, callbackFeedlyWebAuthError);
            }
            catch (err) {   
            /*Error launching WebAuth"*/    
            debugger;
            return;
            }
        }


        launchFeedlyWebAuth();

        function callbackFeedlyWebAuth(result) {
            var FeedlyReturnedToken = result.responseData;
            var response = "Status returned by WebAuth broker: " + result.responseStatus + "\r\n";
            if (result.responseStatus == 2) {
                response += "Error returned: " + result.responseErrorDetail + "\r\n";
            }
        }

        function callbackFeedlyWebAuthError(err) {
        debugger;
            var error = "Error returned by WebAuth broker. Error Number: " + err.number + " Error Message: " + err.message + "\r\n";
        }
    };



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

