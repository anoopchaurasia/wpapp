fm.Package("com.reader.view");
fm.Import("com.reader.login.LoginController");
fm.Class("Login", "jfm.dom.View");
com.reader.view.Login = function (base, me, LoginController, View) {
    this.setMe = function (_me) { me = _me; };
    this.Login = function () {
        this.url = '/html/login.view.html';
        this.items = [
            {
                controller: LoginController,
                template: '/html/login.html',
                container: '#logincontainer'
            }
        ];
    };
};