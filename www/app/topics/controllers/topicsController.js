(function() {

    'use strict';

    angular.module('sparked').controller('TopicsController', TopicsController);

    TopicsController.$inject = ['$scope', '$rootScope', 'ServicesDataFirebase', '$firebaseObject', '$firebaseArray', 'UserDataFirebase', '$state'];

    function TopicsController($scope, $rootScope, ServicesDataFirebase, $firebaseObject, $firebaseArray, UserDataFirebase, $state) {

        var vm = this;

        vm.topicsnames = [];
        vm.selected = {};

        //Loading topics for new users
        var topicsPromise = ServicesDataFirebase.getTopics();
        topicsPromise.then(function(topics) {

            for (var i = 0; i < topics.length; i++) {
                vm.topicsnames.push({name: topics[i]});
            }

            console.log("Topics loaded");

        }, function(reason) {

            console.error(reason);

        });

        vm.switchToHome = function() {

            UserDataFirebase.saveUserTopicsData($rootScope.currentUserPathID, vm.selected);
            $state.go('tabs.home');

            vm.showLogin = !vm.showLogin;
        };



    };


})();