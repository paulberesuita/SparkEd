(function() {

    'use strict';

    angular.module('sparked').factory('UserDataFirebase', UserDataFirebase);

    UserDataFirebase.$inject = ['$q', '$ionicLoading', '$firebaseAuth', '$firebaseObject', '$firebaseArray'];

    function UserDataFirebase($q, $ionicLoading, $firebaseAuth, $firebaseObject, $firebaseArray) {

        var service = {
            saveUserTopicsData: saveUserTopicsData,
            getUserTopics: getUserTopics,
            saveUserTelelphoneNumber: saveUserTelelphoneNumber
        };

        return service;

        function saveUserTopicsData(userpath, dataValue) {

            var path = "https://paul-sparkedu.firebaseio.com/users/" + userpath + "/topics";
            var ref = new Firebase(path);
            ref.update({ topics: dataValue});

        }

        function saveUserTelelphoneNumber(userpath, dataValue) {
            var path = "https://paul-sparkedu.firebaseio.com/users/" + userpath;
            var ref = new Firebase(path);
            ref.update({ number: dataValue});
        }

        function getUserTopics(userpath) {

            var deferred = $q.defer();

            var path = "https://paul-sparkedu.firebaseio.com/users/" + userpath + "/topics";
            var ref = new Firebase(path);

            var allUserTopics = $firebaseObject(ref);

            allUserTopics.$loaded().then(function() {

                var topics = _.keys(allUserTopics.topics);
                deferred.resolve(topics);

            }).catch(function(err) {

                deferred.reject(err);

            });

            return deferred.promise;

        }

    };


})();