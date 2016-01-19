(function () {
    var HomeController = function (notifier,identity) {
        var vm = this;

        vm.currentUser = identity.getCurrentUser();
    }

    angular.module('myApp.controllers')
        .controller('HomeController', ['notifier', 'identity', HomeController])
}())