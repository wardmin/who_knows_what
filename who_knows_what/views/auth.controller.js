export class AuthController {

    constructor($auth) {
        'ngInject';

        this.$auth = $auth;
    }

    register() {
        var vm = this;
        this.$auth.signup(this.users).then(function (token) {
            vm.$auth.setToken(token);
        });
    }
}
