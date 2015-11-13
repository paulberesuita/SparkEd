(function() {

    'use strict';

    angular.module('sparked').factory('ServicesDataFirebase', ServicesDataFirebase);

    ServicesDataFirebase.$inject = ['$q', '$ionicLoading', '$firebaseObject'];

    function ServicesDataFirebase($q, $ionicLoading, $firebaseObject) {

        var ref = new Firebase("https://paul-sparkedu.firebaseio.com/");

        var service = {
            getTopics: getTopics,
            getGoals: getGoals,
            getContent: getContent,
            getUsers: getUsers,
            getAll: getAll
        };

        return service;

        function getTopics() {

            var deferred = $q.defer();

            var allData = $firebaseObject(ref);

            allData.$loaded().then(function() {

                var topicsArray = _.values(allData.topics);

                deferred.resolve(topicsArray);

            }).catch(function(err) {

                deferred.reject(err);

            });

            return deferred.promise;

        }

        function getGoals() {

            var deferred = $q.defer();

            var allData = $firebaseObject(ref);

            allData.$loaded().then(function() {

                var goalsArray = _.values(allData.goals);

                deferred.resolve(goalsArray);

            }).catch(function(err) {

                deferred.reject(err);

            });

            return deferred.promise;

        }

        function getContent() {

            var deferred = $q.defer();

            var allData = $firebaseObject(ref);

            allData.$loaded().then(function() {

                //var coursesArray = _.values(allData.content);

                deferred.resolve(allData.content);

            }).catch(function(err) {

                deferred.reject(err);

            });

            return deferred.promise;

        }

        function getUsers() {

            var deferred = $q.defer();

            var allData = $firebaseObject(ref);

            allData.$loaded().then(function() {

                //var coursesArray = _.values(allData.content);

                deferred.resolve(allData.users);

            }).catch(function(err) {

                deferred.reject(err);

            });

            return deferred.promise;

        }

        function getAll() {

            var deferred = $q.defer();

            var allData = $firebaseObject(ref);

            allData.$loaded().then(function() {

                //var coursesArray = _.values(allData.content);

                deferred.resolve(allData);

            }).catch(function(err) {

                deferred.reject(err);

            });

            return deferred.promise;

        }

    };


})();