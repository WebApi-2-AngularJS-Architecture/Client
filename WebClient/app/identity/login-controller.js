(function () {
    'use strict';

    function LoginController($scope, $location, notifier, identity, auth, VALIDATION) {
        var vm = this;

        vm.validation = VALIDATION;
        vm.homeIconPath = "app/sources/images/home.png";
        $scope.identity = identity;

        $scope.showCurrentUserData = function () {
            console.log(identity.getCurrentUser())
        }

        $scope.login = function (user, loginForm) {
            if (loginForm.$valid) {
                auth.login(user).then(function (success) {
                    notifier.success('Login successful!');
                    $location.path('/');
                }, function () {
                    notifier.error('Username does not exist or password does not match.');
                });
            }
        }

        $scope.logout = function () {
            auth.logout().then(function () {
                notifier.success('Logout successful!');
                if ($scope.user) {
                    $scope.user.email = '';
                    $scope.user.username = '';
                    $scope.user.password = '';
                }

                $location.path('/');
            })
        }
    }

    angular.module('myApp.controllers')
        .controller('LoginController', ['$scope', '$location', 'notifier', 'identity', 'auth', 'VALIDATION', LoginController]);
}());