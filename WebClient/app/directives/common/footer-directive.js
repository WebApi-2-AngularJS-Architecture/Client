(function () {
    'use strict';

    function footer() {
        return {
            restrict: 'A',
            templateUrl: 'app/directives/common/footer-directive.html'
        }
    }

    angular.module('myApp.directives')
        .directive('footer', [footer]);
}());