(function() {

    'use strict';

    angular.module('sparked').factory('UserDataFirebase', UserDataFirebase);

    UserDataFirebase.$inject = ['$q', '$ionicLoading'];

    function UserDataFirebase($q, $ionicLoading) {

        var ref = new Firebase("https://paul-sparkedu.firebaseio.com/");

        var service = {
            saveData: saveData
        };

        return service;

        function saveData(data) {

            var deferred = $q.defer();

            return deferred.promise;

        }

    };


})();