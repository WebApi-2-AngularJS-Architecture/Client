(function () {
    'use strict';

    function config($routeProvider, $httpProvider, $locationProvider) {
        $httpProvider.defaults.headers["delete"] = {
            'Content-Type': 'application/json;charset=utf-8'
        };

        var CONTROLLER_AS_VIEW_MODEL = 'vm';

        $routeProvider
            .when('/', {
                templateUrl: 'app/pages/home/home.html',
                controller: 'HomeController'
            })
            .when('/Home', { redirectTo: '/' })
            .when('/Register', {
                templateUrl: 'app/pages/register/register.html',
                controller: 'RegisterController'
            })
            .when('/Login', {
                templateUrl: 'app/pages/login/login.html',
                controller: 'LoginController'
            })
            .when('/User/Profile/ChangePassword', {
                templateUrl: 'app/pages/user/html/change-password.html',
                controller: 'LoginController'
            })
            .when('/Events/Active', {
                templateUrl: 'app/pages/events/html/active-events.html',
                controller: 'EventsController'
            })
            .when('/unauthorized', {
                template: '<h1 class="text-center">Unauthorized</h1>'
            })
            .otherwise({ redirectTo: '/' });
    }

    angular.module('myApp.services', []);
    angular.module('myApp.directives', []);
    angular.module('myApp.filters', []);
    angular.module('myApp.controllers', ['myApp.services']);
    angular.module('myApp', ['ngRoute', 'ngCookies', 'myApp.controllers', 'myApp.directives', 'myApp.filters', 'kendo.directives']).
        config(['$routeProvider', '$httpProvider','$locationProvider', config])
        .value('toastr', toastr)
        .constant('baseServiceUrl', 'http://localhost:38013/')
        .constant('VALIDATION', {
            'minEmailLength': 3,
            'maxEmailLength': 60,
            'minPasswordLength': 6,
            'maxPasswordLength': 32,
            'minUsernameLength': 3,
            'maxUsernameLength': 100,
        });
}());