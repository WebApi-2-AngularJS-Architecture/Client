(function () {
    'use strict';

    function CreateEventController($scope, $location, data, identity, notifier) {
        var vm = this;

        vm.currentUser = identity.getCurrentUser();

        vm.createEvent = function () {
            if (vm.currentUser) {
                var createEventRequestObject = {
                    CreatorUsername: vm.currentUser.userName,
                    BirthdayGuyUsername: vm.birthdayGuyUsername,
                    BirthdayDate: vm.birthdayGuyBirthdate
                }

                data.post('api/Events/Create', createEventRequestObject)
                    .then(function (result) {
                        notifier.success('Birthday present event successfully created!');
                    }, function (err) {
                        notifier.error('Failed creating event.');
                    });
            } else {
                notifier.warning('Cannot create event when not authorized');
            }
        }

    }

    angular.module('myApp.controllers').controller('CreateEventController', ['$scope', '$location', 'data', 'identity', 'notifier', CreateEventController]);
}());