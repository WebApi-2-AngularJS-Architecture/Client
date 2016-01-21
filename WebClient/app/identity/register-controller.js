(function () {
    'use strict';

    function RegisterController($scope, $location, auth, notifier, VALIDATION, COUNTRIES) {
        var vm = this;

        vm.validation = VALIDATION;
        vm.countries = COUNTRIES;

        $scope.signup = function (user) {
            auth.signup(user).then(function () {
                console.log(user);
                notifier.success('Registration successful!');
                $location.path('/Login');
            }, function (error) {
                notifier.error('Registration failed. Make sure your data is filled properly. Username & email duplication are not allowed.');
            })
        }

        vm.isFormDirty = function (registerForm) {
            return registerForm.emailInputField.$dirty &&
                registerForm.usernameInputField.$dirty &&
                registerForm.passwordInputField.$dirty &&
                registerForm.confirmPasswordInputField.$dirty;
        }

        vm.isPasswordMatching = function (user) {
            return user.password === user.confirmPassword;
        }
    }

    angular.module('myApp.controllers').controller('RegisterController', ['$scope', '$location', 'auth', 'notifier', 'VALIDATION','COUNTRIES', RegisterController]);
}());