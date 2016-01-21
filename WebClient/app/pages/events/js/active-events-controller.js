(function () {
    'use strict';

    function ActiveEventsController($scope, $location, data, identity, notifier, moment) {
        var vm = this;

        vm.currentUser = identity.getCurrentUser();

        if (vm.currentUser) {
            var eventsRequestObject = {
                UserName: vm.currentUser.userName
            }

            getAllActiveEvents(eventsRequestObject);

            data.get('api/Presents/All').then(function (result) {
                vm.availablePresents = result;
            }, function (err) {
                notifier.err('Failure loading presents.');
            })
        }

        vm.parseDate = function (date) {
            return moment(date).format('MMMM Do YYYY');
        }

        vm.vote = function (presentId, eventId) {
            var requestObject = {
                PresentId: presentId,
                UserVotedUsername: vm.currentUser.userName,
                BirthdayPresentEventId: eventId
            };

            data.post('api/Votes/Create', requestObject).then(function (result) {
                notifier.info('Vote successful')
            }, function (err) {
                notifier.error('Cannot vote twice for one event');
            });
        }

        vm.closeEvent = function(eventId) {
            var requestData = {
                RequestUsername: vm.currentUser.userName,
                EventId: eventId
            };

            data.post('api/Events/Cancel', requestData).then(function (result) {
                notifier.info('Event closed successfully');

                getAllActiveEvents({
                    UserName: vm.currentUser.userName
                });
            }, function (err) {
                notifier.error('Cannot close event');
            });
        }

        function getAllActiveEvents(eventsRequestObject) {
            data.get('api/Events/Active', eventsRequestObject).then(function (result) {
                vm.activeEvents = result;
            }, function (err) {
                notifier.error('Failure loading active events.');
            });
        }
    }

    angular.module('myApp.controllers').controller('ActiveEventsController', ['$scope', '$location', 'data', 'identity', 'notifier','moment', ActiveEventsController]);
}());