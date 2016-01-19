(function () {
    'use strict';

    function UserController($scope, $location, data, identity, notifier) {
        var vm = this;

        vm.request = {};

        vm.currentUser = identity.getCurrentUser();

        vm.changePassword = function (request) {
            data.post('api/Account/ChangePassword', request)
                .then(function (result) {
                    notifier.success('Password successfully changed.');
                }, function (err) {
                    notifier.danger('Password change has failed. Make sure that all the input fields are filled correctly.');
                });
        }
    }

    angular.module('myApp.controllers').controller('UserController', ['$scope', '$location', 'data', 'identity', 'notifier', UserController]);
}());