(function() {

    'use strict';

    angular.module('sparked').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$sce'];

    function HomeController($scope, $sce) {

        var vm = this;

        //$scope.linktest = $sce.trustAsResourceUrl('https://www.youtube.com/embed/YU2LP2QpUaE');

        vm.allcontent = [
            {name: "Video 1 Title", link:'https://www.youtube.com/embed/YU2LP2QpUaE'},
            {name: "Video 2 Title", link:'https://www.youtube.com/embed/kYfNvmF0Bqw'},
            {name: "Video 3 Title", link:'https://www.youtube.com/embed/kYfNvmF0Bqw'},
            {name: "Video 4 Title", link:'https://www.youtube.com/embed/kYfNvmF0Bqw'}
        ];

        $scope.videoOneURL = 'https://www.youtube.com/embed/kYfNvmF0Bqw';
        $scope.videoTwoURL = 'https://www.youtube.com/watch?t=305&v=mgmVOuLgFB0';

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

    };


})();