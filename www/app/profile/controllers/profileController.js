(function() {

    'use strict';

    angular.module('sparked').controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$rootScope', 'AuthenticationFirebase', '$state', '$firebaseArray', '$firebaseObject', 'UserDataFirebase', 'ServicesDataFirebase'];

    function ProfileController($scope, $rootScope, AuthenticationFirebase, $state, $firebaseArray, $firebaseObject, UserDataFirebase, ServicesDataFirebase) {

        var vm = this;
        vm.topicsnames = [];
        vm.goalsnames = [];
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

        var getGoalsPromise = UserDataFirebase.getUserGoals($rootScope.currentUserPathID);

        getGoalsPromise.then(function(goals) {

            for (var i = 0; i < goals.length; i++) {
                vm.goalsnames.push({name: goals[i]});
            }
            console.log("User Goals loaded");

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

            var contentPromise = ServicesDataFirebase.getAll();
            contentPromise.then(function(content) {

                var allUsersArray = _.values(content.users);

                for(var i = 0; i < allUsersArray.length; i++) {

                    var factsRef = new Firebase("https://paul-sparkedu.firebaseio.com/sentMessages");
                    var factsContent = $firebaseArray(factsRef);
                    factsContent.$add({message: _.values(content.facts)[_.values(content.facts).length-1].message,
                                       number: allUsersArray[i].number});
                }

                console.log("Sent Notification");

            }, function(reason) {

                console.error(reason);

            });

        };

        vm.logout = function() {
            AuthenticationFirebase.logout();
            console.log("logout performed");
            $state.go('welcome');
        };

    };


})();