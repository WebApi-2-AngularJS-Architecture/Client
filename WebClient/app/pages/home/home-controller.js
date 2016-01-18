(function () {
    var HomeController = function (notifier) {
        var vm = this;
    }

    angular.module('myApp.controllers')
        .controller('HomeController', ['notifier', HomeController])
}())