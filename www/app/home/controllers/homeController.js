(function() {

    'use strict';

    angular.module('sparked').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', '$sce', 'ServicesDataFirebase', 'UserDataFirebase', '$q'];

    function HomeController($scope, $rootScope, $sce, ServicesDataFirebase, UserDataFirebase, $q) {

        var vm = this;

        vm.computerScienceStack = [];
        vm.mathStack = [];
        vm.generalStack = [];


        //80% perfect of user stack will contain selected topics; the other 20% will contain non-selected topics
        //Step 1: create user stack
        vm.userStack = [];
        //Step 2: determine the  topics selected
        vm.userTopics = [];
        //Step 3: based on number of topics selected determine what percentage of the 80% will be split among the topics
        var computerScienceIndex = 0;
        var mathIndex = 0;

        //Step 4: The news need will contain at most 20 items for now; While the selected topics stack contain data keep pushing to the user stack

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };


        //Loading topics for new users
        var contentPromise = ServicesDataFirebase.getContent();

        var getTopicsPromise = UserDataFirebase.getUserTopics($rootScope.currentUserPathID);

        $q.all([contentPromise, getTopicsPromise]).then(function(data){

            var allcontentArray = _.values(data[0]);

            for (var i = 0; i < allcontentArray.length; i++) {

                if(allcontentArray[i].computerscience) {

                    var allcontentArrayComputerScience = _.values(allcontentArray[i].computerscience);

                    for(var c = 0; c < allcontentArrayComputerScience.length; c++) {
                        vm.computerScienceStack.push({name: allcontentArrayComputerScience[c].name, videourl: allcontentArrayComputerScience[c].videourl});
                    }
                }

                if(allcontentArray[i].math) {

                    var allcontentArrayMath = _.values(allcontentArray[i].math);

                    for(var m = 0; m < allcontentArrayMath.length; m++) {
                        vm.mathStack.push({name: allcontentArrayMath[m].name, videourl: allcontentArrayMath[m].videourl});
                    }
                }

                if(allcontentArray[i].general) {

                    var allcontentArrayGeneral = _.values(allcontentArray[i].general);

                    for(var m = 0; m < allcontentArrayGeneral.length; m++) {
                        vm.generalStack.push({name: allcontentArrayGeneral[m].name, videourl: allcontentArrayGeneral[m].videourl});
                    }
                }

            }

            vm.userTopics = data[1];
            vm.numberOfItemsToDisplay = 4; //Total will be 4 * number of topics selected
            while(vm.numberOfItemsToDisplay != 0) {

                for (var i = 0; i < vm.userTopics.length; i++) {

                    if(vm.userTopics[i] === "Computer Science") {

                        vm.userStack.push({name: vm.computerScienceStack[computerScienceIndex].name, videourl: vm.computerScienceStack[computerScienceIndex].videourl, startdate: vm.computerScienceStack[computerScienceIndex].startdate});
                        computerScienceIndex++;
                    }

                    if(vm.userTopics[i] === "Math") {

                        vm.userStack.push({name: vm.mathStack[mathIndex].name, videourl: vm.mathStack[mathIndex].videourl, startdate: vm.mathStack[mathIndex].startdate});
                        mathIndex++;
                    }
                }

                vm.numberOfItemsToDisplay--;
            }


            console.log(data[0], data[1]);
        });


    };


})();