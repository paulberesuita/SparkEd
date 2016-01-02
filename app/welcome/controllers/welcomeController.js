(function() {

    'use strict';

    angular.module('sparked').controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$scope', '$rootScope', 'AuthenticationFirebase', '$state', '$firebaseArray', '$firebaseObject', 'ServicesDataFirebase', '$q'];

    function WelcomeController($scope, $rootScope, AuthenticationFirebase, $state, $firebaseArray, $firebaseObject, ServicesDataFirebase, $q) {

        var vm = this;

        vm.existinguser = {
            email: "",
            password:""
        };

        vm.newuser = {
            name: "",
            email: "",
            password:""
        };

        vm.showLogin = true;
        vm.wrongLogin = false;

        vm.switchForm = function() {
            vm.showLogin = !vm.showLogin;
        };

        vm.createNewUser = function() {

            var promise = AuthenticationFirebase.createUser(vm.newuser.email, vm.newuser.password);

            promise.then(function(userData) {

                var usersRef = new Firebase("https://paul-sparkedu.firebaseio.com/users");

                $rootScope.name = vm.newuser.name;

                var list = $firebaseArray(usersRef);
                list.$add({ 'user_id': userData.uid, 'name': vm.newuser.name, 'topics': "", 'number': "", 'locationLatitude': "", 'locationLongitude': "", 'city': "", 'state': ""}).then(function(ref) {
                    var id = ref.key();
                    console.log("added record with id " + id);
                    $rootScope.currentUserPathID= id;

                });

                $state.go('topics');


            }, function(reason) {

            });
        };

        vm.loginExistingUser = function() {

            //Loading topics for new users
            var loginUserPromise = AuthenticationFirebase.loginUser(vm.existinguser.email, vm.existinguser.password);

            //Get topics of interest for the logged in user
            var allUsersPromise = ServicesDataFirebase.getUsers($rootScope.currentUserPathID);

            $q.all([loginUserPromise, allUsersPromise]).then(function(data) {

                vm.wrongLogin = false;

                var uid = data[0].uid;

                var allUsers = _.values(data[1]);
                var allUserskeysMaps = _.pairs(data[1]);

                for(var c = 0; c < allUsers.length; c++) {

                    if(uid === allUsers[c].user_id){
                        console.log("match");
                        $rootScope.currentUserPathID= allUserskeysMaps[c][0];

                    }
                }

                $state.go('tabs.home');

            }, function(reason) {
                vm.wrongLogin = true;
            });

        };

    };


})();