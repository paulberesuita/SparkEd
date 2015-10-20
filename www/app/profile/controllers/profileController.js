(function() {

    'use strict';

    angular.module('sparked').controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$rootScope', 'AuthenticationFirebase', '$state', '$firebaseArray', '$firebaseObject', 'UserDataFirebase'];

    function ProfileController($scope, $rootScope, AuthenticationFirebase, $state, $firebaseArray, $firebaseObject, UserDataFirebase) {

        var vm = this;
        vm.topicsnames = [];
        vm.userNumber = "Enter Number";
        vm.editMode = false;

        var getTopicsPromise = UserDataFirebase.getUserTopics($rootScope.currentUserPathID);

        getTopicsPromise.then(function(topics) {

            for (var i = 0; i < topics.length; i++) {
                vm.topicsnames.push({name: topics[i]});
            }
            console.log("User Topics loaded");

        }, function(reason) {

            console.error(reason);

        });

        vm.saveUserNumber = function() {

            //We need to append one to the number because twillio service is worldwide and needs area code
            var appendedOne = "1" + vm.userNumber;

            UserDataFirebase.saveUserTelelphoneNumber($rootScope.currentUserPathID, appendedOne);
            vm.editMode = !vm.editMode;
        };

        vm.goToEditMode = function () {
            vm.editMode = !vm.editMode;
        };

        vm.sendMessage = function() {

            var factsRef = new Firebase("https://paul-sparkedu.firebaseio.com/facts");
            var factsContent = $firebaseArray(factsRef);
            factsContent.$add({topic: "Computer Science",
                               message: "6 - Only 8% of the world’s currency is physical money, the rest only exists on computers.",
                               number: "16787738013"});

            console.log("test button");
        }

    };


})();