(function() {

    'use strict';

    angular.module('sparked').controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$scope', '$rootScope', 'AuthenticationFirebase', '$state'];

    function WelcomeController($scope, $rootScope, AuthenticationFirebase, $state) {

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

        vm.switchForm = function() {
            vm.showLogin = !vm.showLogin;
        };

        vm.createNewUser = function() {

            var promise = AuthenticationFirebase.createUser(vm.newuser.username, vm.newuser.email, vm.newuser.password);

            promise.then(function(greeting) {
                $state.go('topics');
            }, function(reason) {
            });
        };

        vm.loginExistingUser = function() {

            var promise = AuthenticationFirebase.loginUser(vm.existinguser.email, vm.existinguser.password);

            promise.then(function(greeting) {
                $state.go('home');
            }, function(reason) {
            });

        };

    };


})();