(function() {

    'use strict';

    angular.module('sparked').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$sce', 'ServicesDataFirebase'];

    function HomeController($scope, $sce, ServicesDataFirebase) {

        var vm = this;

        vm.computerScienceStack = [];
        vm.mathStack = [];
        vm.generalStack = [];


        //80% perfect of user stack will contain selected topics; the other 20% will contain non-selected topics
        //Step 1: create user stack
        vm.userStack = [];
        //Step 2: determine how many topics selected

        //Step 3: based on number of topics selected determine what percentage of the 80% will be split among the topics

        //Step 4: The news need will contain at most 20 items for now; While the selected topics stack contain data keep pushing to the user stack

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