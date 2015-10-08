(function() {

    'use strict';

    angular.module('sparked').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];

    function HomeController($scope) {

        var vm = this;

        $scope.videoOneURL = 'https://www.youtube.com/embed/kYfNvmF0Bqw';
        $scope.videoTwoURL = 'https://www.youtube.com/watch?t=305&v=mgmVOuLgFB0';


    };


})();