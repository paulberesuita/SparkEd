(function() {

    'use strict';

    angular.module('sparked').factory('AuthenticationFirebase', AuthenticationFirebase);

    AuthenticationFirebase.$inject = ['$q', '$ionicLoading'];

    function AuthenticationFirebase($q, $ionicLoading) {

        var ref = new Firebase("https://paul-sparkedu.firebaseio.com/");

        var service = {
            createUser: createUser,
            loginUser: loginUser
        };

        return service;

        function createUser(email, password) {

            var deferred = $q.defer();

            $ionicLoading.show({
                template: 'Glad to have you here, one moment please...'
            });

            ref.createUser({
                email    : email,
                password : password
            }, function(error, userData) {
                if (error) {
                    $ionicLoading.hide();
                    deferred.reject(error);
                    console.log("Error creating user:", error);
                } else {
                    $ionicLoading.hide();
                    deferred.resolve(userData);
                    console.log("Successfully created user account with uid:", userData.uid);
                }
            });

            return deferred.promise;

        }

        function loginUser(email, password) {

            var deferred = $q.defer();

            $ionicLoading.show({
                template: 'Welcome back, one moment please...'
            });

            ref.authWithPassword({
                email    : email,
                password : password
            }, function(error, authData) {
                if (error) {
                    $ionicLoading.hide();
                    deferred.reject(error);
                    console.log("Login Failed!", error);
                } else {
                    $ionicLoading.hide();
                    deferred.resolve(authData);
                    console.log("Authenticated successfully with payload:", authData);
                }
            });

            return deferred.promise;
        }


    };


})();