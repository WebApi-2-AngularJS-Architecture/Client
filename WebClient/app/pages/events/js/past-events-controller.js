(function () {
    'use strict';

    function PastEventsController($scope, $location, data, identity, notifier) {
        var vm = this;

        vm.currentUser = identity.getCurrentUser();

        if (vm.currentUser) {
            var eventsRequestObject = {
                UserName: vm.currentUser.userName
            }

            data.get('api/Events/Statistics', eventsRequestObject).then(function (result) {
                vm.statistics = result;
                console.log(vm.statistics);
            }, function (err) {
                notifier.error('Failed loading statistics');
            });
        }

        vm.parseDate = function (date) {
            return date.slice(0, 10);
        }
    }

    angular.module('myApp.controllers').controller('PastEventsController', ['$scope', '$location', 'data', 'identity', 'notifier', PastEventsController]);
}());