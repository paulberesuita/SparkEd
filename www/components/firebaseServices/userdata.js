(function() {

    'use strict';

    angular.module('sparked').factory('UserDataFirebase', UserDataFirebase);

    UserDataFirebase.$inject = ['$q', '$ionicLoading', '$firebaseAuth', '$firebaseObject', '$firebaseArray'];

    function UserDataFirebase($q, $ionicLoading, $firebaseAuth, $firebaseObject, $firebaseArray) {

        var service = {
            saveUserTopicsData: saveUserTopicsData
        };

        return service;

        function saveUserTopicsData(userpath, dataValue) {

            var path = "https://paul-sparkedu.firebaseio.com/users/" + userpath;
            var ref = new Firebase(path);
            ref.update({ topics: dataValue});

        }

    };


})();