(function() {

    'use strict';

    angular.module('sparked').factory('ServicesDataFirebase', ServicesDataFirebase);

    ServicesDataFirebase.$inject = ['$q', '$ionicLoading', '$firebaseObject'];

    function ServicesDataFirebase($q, $ionicLoading, $firebaseObject) {

        var ref = new Firebase("https://paul-sparkedu.firebaseio.com/");

        var service = {
            getTopics: getTopics,
            getContent: getContent,
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