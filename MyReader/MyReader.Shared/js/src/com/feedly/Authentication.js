fm.Package("com.feedly");
fm.Import("com.feedly.Api");
fm.Class("Authentication");
com.feedly.Authentication = function (me, Api) {
    'use strict';
    var api;
    this.Authentication = function () {
        api = Api.getInstance();
    };

    function launchWebAuth(serverLogin) {
       
        var feedlyURL = api.url+"/auth/auth" +
            "?client_id=" + api.clientId +
            "&redirect_uri=" + encodeURIComponent(api.callbackURL) +
            "&secret_id=" + api.secretId +
            "&scope=" + encodeURIComponent(api.scopeURL) +
            "&display=popup&response_type=code";
        var startURI = new Windows.Foundation.Uri(feedlyURL);
        var endURI = new Windows.Foundation.Uri(api.callbackURL);        
        if (Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAndContinue)
        {
            Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAndContinue(startURI, endURI, null, Windows.Security.Authentication.Web.WebAuthenticationOptions.none);
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
        
        Api.getData(api.url + "/auth/token", {
            code: token,
            client_id: api.clientId,
            client_secret: api.secretId,
            redirect_uri: api.callbackURL,
            grant_type: "authorization_code"
        }, function (data) {
            var vault = new Windows.Security.Credentials.PasswordVault();
            vault.add(new Windows.Security.Credentials.PasswordCredential(
                resourceName, data.access_token, data.refresh_token));
            cb(data.access_token, data.refresh_token);
        }, "post");
       
    }

    this.remove = function () {
        var loginCredential = getCredentialFromLocker();
        var vault = new Windows.Security.Credentials.PasswordVault();
        vault.remove(loginCredential);
    };

    var resourceName = "App";
    var defaultUserName;

    this.login = function (serverLogin) {
        var loginCredential = getCredentialFromLocker();

        if (loginCredential != null) {
            // There is a credential stored in the locker.
            // Populate the Password property of the credential
            // for automatic login.
            loginCredential.retrievePassword();
            serverLogin(loginCredential.userName, loginCredential.password);
        } else {
            // There is no credential stored in the locker.
            // Display UI to get user credentials.
            launchWebAuth(serverLogin);
        }

        // Log the user in.
       
    }


    function getCredentialFromLocker() {
        var credential = null;

        var vault = new Windows.Security.Credentials.PasswordVault();
        try{
            var credentialList = vault.findAllByResource(resourceName);
            if (credentialList.length > 0) {
                if (credentialList.length == 1) {
                    credential = credentialList[0];
                }
            }
        }catch(e){

        }
        return credential;
    }

   

};