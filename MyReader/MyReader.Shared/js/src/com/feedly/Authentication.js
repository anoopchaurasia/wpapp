fm.Package("com.feedly");
fm.Import("com.feedly.Api");
fm.Class("Authentication");
com.feedly.Authentication = function (me, Api) {
    'use strict';

    function launchWebAuth(serverLogin) {
       
        var feedlyURL = Api.url+"/auth/auth" +
            "?client_id=" + Api.clientId +
            "&redirect_uri=" + encodeURIComponent(Api.callbackURL) +
            "&secret_id=" + Api.secretId +
            "&scope=" + encodeURIComponent(Api.scopeURL) +
            "&display=popup&response_type=code";
        var startURI = new Windows.Foundation.Uri(feedlyURL);
        var endURI = new Windows.Foundation.Uri(Api.callbackURL);
        var app = WinJS.Application;
        var nav = WinJS.Navigation;
        var activationKinds = Windows.ApplicationModel.Activation.ActivationKind;
        if (Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAndContinue)
        {
            Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAndContinue(startURI, endURI, null, Windows.Security.Authentication.Web.WebAuthenticationOptions.none);
            function activated(eventObject) {
                var activationKind = eventObject.detail.kind;
                var activatedEventArgs = eventObject.detail.detail;

                // Handle launch and continuation activation kinds
                switch (activationKind) {

                    case activationKinds.webAuthenticationBrokerContinuation: {
                        var token = eventObject.detail.webAuthenticationResult.responseData.match(new RegExp("code=(.*?)($|\&)", "i"))[1];
                        storeCredentials(token, function (a, b) {
                            serverLogin(a, b);
                        });

                    }
                }
            }
            app.addEventListener("activated", activated, false);
        }
        else
        {
            Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(
                Windows.Security.Authentication.Web.WebAuthenticationOptions.none, startURI, endURI)
                .done(function (result) {
                    var token = result.responseData.match(new RegExp("code=(.*?)($|\&)", "i"))[1];
                    storeCredentials(token, function (a, b) {
                        serverLogin(a, b);
                    });
                   
 
                }, function (err) {

                });
        }
    }

    function storeCredentials(token, cb) {
        
        Api.getData(Api.url + "/auth/token", {
            code: token,
            client_id: Api.clientId,
            client_secret: Api.secretId,
            redirect_uri: Api.callbackURL,
            grant_type: "authorization_code"
        }, function (data) {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            data.currentTime = (new Date).getTime();
            localStorage.accountInfo = JSON.stringify(data);
            cb(data.access_token, data.refresh_token);
        }, "post"); 
    }

    this.remove = function () {
        delete localStorage.accountInfo;
    };

    var resourceName = "App";
    var defaultUserName;

    this.login = function (serverLogin) {
        var loginCredential = localStorage.accountInfo;

        if (loginCredential != null) {
            var accountInfo = JSON.parse(loginCredential);
            if (accountInfo.expires_in > ((new Date).getTime() - accountInfo.currentTime)/1000 ) {
                serverLogin(accountInfo.access_token, loginCredential.refresh_token);
            } else {
                getNewAccessToken(accountInfo.refresh_token);
            }
        } else {
            // There is no credential stored in the locker.
            // Display UI to get user credentials.
            launchWebAuth(serverLogin);
        }

        // Log the user in.
       
    }

    function getNewAccessToken(refresh_token, cb) {
        Api.getData(Api.url + "/auth/token", {
            refresh_token: refresh_token,
            client_id: Api.clientId,
            client_secret: Api.secretId,
            grant_type: 'refresh_token'
        }, function (data) {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            data.currentTime = (new Date).getTime();
            data.refresh_token = refresh_token;
            localStorage.accountInfo = JSON.stringify(data);
            cb(data.access_token, data.refresh_token);
        }, "post");
    }
};