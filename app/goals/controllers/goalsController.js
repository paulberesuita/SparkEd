(function() {

    'use strict';

    angular.module('sparked').controller('GoalsController', GoalsController);

    GoalsController.$inject = ['$scope', '$rootScope', 'ServicesDataFirebase', '$firebaseObject', '$firebaseArray', 'UserDataFirebase', '$state'];

    function GoalsController($scope, $rootScope, ServicesDataFirebase, $firebaseObject, $firebaseArray, UserDataFirebase, $state) {

        var vm = this;

    };


})();