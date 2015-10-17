(function() {

    'use strict';

    angular.module('sparked').controller('ConnectController', ConnectController);

    ConnectController.$inject = ['$scope', '$rootScope', 'AuthenticationFirebase', '$state', '$firebaseArray', '$firebaseObject', 'UserDataFirebase'];

    function ConnectController($scope, $rootScope, AuthenticationFirebase, $state, $firebaseArray, $firebaseObject, UserDataFirebase) {

        var vm = this;


    };


})();