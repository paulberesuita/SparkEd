(function() {

    'use strict';

    angular.module('sparked').controller('ExploreController', ExploreController);

    ExploreController.$inject = ['$scope', '$rootScope', 'AuthenticationFirebase', '$state', '$firebaseArray', '$firebaseObject', 'UserDataFirebase'];

    function ExploreController($scope, $rootScope, AuthenticationFirebase, $state, $firebaseArray, $firebaseObject, UserDataFirebase) {

        var vm = this;


    };


})();