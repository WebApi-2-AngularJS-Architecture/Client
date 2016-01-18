(function () {
    'use strict';

    function navigationMenu() {
        return {
            restrict: 'A',
            templateUrl: 'app/directives/common/navigation-menu-directive.html'
        }
    }

    angular.module('myApp.directives')
        .directive('navigationMenu', [navigationMenu]);
}());