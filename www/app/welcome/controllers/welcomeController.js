(function() {

    'use strict';

    angular.module('sparked').controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$scope', '$rootScope', 'AuthenticationFirebase', '$state', '$firebaseArray', '$firebaseObject'];

    function WelcomeController($scope, $rootScope, AuthenticationFirebase, $state, $firebaseArray, $firebaseObject) {

        var vm = this;

        vm.existinguser = {
            email: "",
            password:""
        };

        vm.newuser = {
            username: "",
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

                var list = $firebaseArray(usersRef);
                list.$add({ 'user_id': userData.uid, 'username': vm.newuser.username, 'topics': ""}).then(function(ref) {
                    var id = ref.key();
                    console.log("added record with id " + id);
                    $rootScope.currentUserPathID= id;

                });

                $state.go('topics');


            }, function(reason) {

            });
        };

        vm.loginExistingUser = function() {

            var promise = AuthenticationFirebase.loginUser(vm.existinguser.email, vm.existinguser.password).then(function(greeting) {
                vm.wrongLogin = false;
                $state.go('tabs.home');
            }, function(reason) {
                vm.wrongLogin = true;
            });

        };

    };


})();