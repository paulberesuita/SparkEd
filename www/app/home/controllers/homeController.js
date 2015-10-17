(function() {

    'use strict';

    angular.module('sparked').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$sce', 'ServicesDataFirebase'];

    function HomeController($scope, $sce, ServicesDataFirebase) {

        var vm = this;

        vm.computerScienceStack = [];
        vm.mathStack = [];
        vm.generalStack = [];

        vm.userStack = [];

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

        //Loading topics for new users
        var contentPromise = ServicesDataFirebase.getContent();
        contentPromise.then(function(content) {

            var allcontentArray = _.values(content);

            for (var i = 0; i < allcontentArray.length; i++) {

                if(allcontentArray[i].computerscience) {

                    var allcontentArrayComputerScience = _.values(allcontentArray[i].computerscience);

                    for(var c = 0; c < allcontentArrayComputerScience.length; c++) {

                        vm.computerScienceStack.push({name: allcontentArrayComputerScience[c].name, link: allcontentArrayComputerScience[c].link});
                    }
                }

                if(allcontentArray[i].math) {

                    var allcontentArrayMath = _.values(allcontentArray[i].math);

                    for(var m = 0; m < allcontentArrayMath.length; m++) {

                        vm.mathStack.push({name: allcontentArrayMath[m].name, link: allcontentArrayMath[m].link});
                    }
                }

            }

            console.log("content loaded");

        }, function(reason) {

            console.error(reason);

        });

    };


})();