(function() {

    'use strict';

    angular.module('sparked').factory('UserDataFirebase', UserDataFirebase);

    UserDataFirebase.$inject = ['$q', '$ionicLoading', '$firebaseAuth', '$firebaseObject', '$firebaseArray'];

    function UserDataFirebase($q, $ionicLoading, $firebaseAuth, $firebaseObject, $firebaseArray) {

        var service = {
            saveUserTopicsData: saveUserTopicsData,
            saveUserGoalsData: saveUserGoalsData,
            getUserTopics: getUserTopics,
            getUserGoals: getUserGoals,
            saveUserTelelphoneNumber: saveUserTelelphoneNumber,
            saveUserLocation: saveUserLocation
        };

        return service;

        function saveUserTopicsData(userpath, dataValue) {

            var path = "https://paul-sparkedu.firebaseio.com/users/" + userpath + "/topics";
            var ref = new Firebase(path);
            ref.update({ topics: dataValue});

        }

        function saveUserGoalsData(userpath, dataValue) {

            var path = "https://paul-sparkedu.firebaseio.com/users/" + userpath + "/goals";
            var ref = new Firebase(path);
            ref.update({ goals: dataValue});

        }

        function saveUserTelelphoneNumber(userpath, dataValue) {
            var path = "https://paul-sparkedu.firebaseio.com/users/" + userpath;
            var ref = new Firebase(path);
            ref.update({ number: dataValue});
        }

        function saveUserLocation(userpath, lat, long) {
            var path = "https://paul-sparkedu.firebaseio.com/users/" + userpath;
            var ref = new Firebase(path);
            ref.update({ locationLatitude: lat, locationLongitude: long});
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

        function getUserGoals(userpath) {

            var deferred = $q.defer();

            var path = "https://paul-sparkedu.firebaseio.com/users/" + userpath + "/goals";
            var ref = new Firebase(path);

            var allGoalsTopics = $firebaseObject(ref);

            allGoalsTopics.$loaded().then(function() {

                var goals = _.keys(allGoalsTopics.goals);
                deferred.resolve(goals);

            }).catch(function(err) {

                deferred.reject(err);

            });

            return deferred.promise;

        }

    };


})();