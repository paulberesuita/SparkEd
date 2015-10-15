(function() {

    'use strict';

    angular.module('sparked').controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$rootScope', 'AuthenticationFirebase', '$state', '$firebaseArray', '$firebaseObject', 'UserDataFirebase'];

    function ProfileController($scope, $rootScope, AuthenticationFirebase, $state, $firebaseArray, $firebaseObject, UserDataFirebase) {

        var vm = this;
        vm.topicsnames = [];

        var getTopicsPromise = UserDataFirebase.getUserTopics($rootScope.currentUserPathID);

        getTopicsPromise.then(function(topics) {

            for (var i = 0; i < topics.length; i++) {
                vm.topicsnames.push({name: topics[i]});
            }
            console.log("User Topics loaded");

        }, function(reason) {

            console.error(reason);

        });

    };


})();