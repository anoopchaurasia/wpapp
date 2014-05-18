fm.Package("com.feedly");
fm.Import("com.feedly.Api");
fm.Class("Topic");
com.feedly.Topic = function(me, Api){
    
    this.setMe = function (_me) { me = _me; };

    Static.url = "/topics";

    Static.get = function(cb){
        
        Api.getData(Api.url + me.url, {}, cb, 'get',{
                "X-Feedly-Access-Token": window.access_token
            });
    };
    
}; 