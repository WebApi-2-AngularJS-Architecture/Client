(function () {
    'use strict';

    function EventsController($scope, $location, data, identity, notifier) {
        var vm = this;

        vm.currentUser = identity.getCurrentUser();

        var eventsRequestObject = {
            UserName: vm.currentUser.userName
        }

        data.get('api/Events/Active', eventsRequestObject).then(function (result) {
            vm.activeEvents = result;
        }, function (err) {
            notifier.error('Failure loading active events.');
        });

        data.get('api/Events/Presents').then(function (result) {
            vm.availablePresents = result;
        }, function (err) {
            notifier.err('Failure loading presents.');
        })


        vm.parseDate = function (date) {
            return date.slice(0, 10);
        }

        vm.vote = function (presentId, eventId) {
            var requestObject = {
                PresentId: presentId,
                UserVotedUsername: vm.currentUser.userName,
                BirthdayPresentEventId: eventId
            };

            console.log(requestObject);

            data.post('api/Votes/Create', requestObject).then(function (result) {
                notifier.info(result)
            }, function (err) {
                console.log(err);
                notifier.error('Voting failed.');
            });
        }
    }

    angular.module('myApp.controllers').controller('EventsController', ['$scope', '$location', 'data', 'identity', 'notifier', EventsController]);
}());