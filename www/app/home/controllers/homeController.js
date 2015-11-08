(function() {

    'use strict';

    angular.module('sparked').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', '$sce', 'ServicesDataFirebase', 'UserDataFirebase', '$q', '$log'];

    function HomeController($scope, $rootScope, $sce, ServicesDataFirebase, UserDataFirebase, $q, $log) {

        var vm = this;

        vm.computerScienceStack = [];
        vm.designStack = [];
        vm.economicsStack = [];
        vm.generalStack = [];
        vm.mathStack = [];
        vm.physicsStack = [];

        vm.userStack = [];
        vm.userTopics = [];

        var computerScienceIndex = 0;
        var physicsIndex = 0;
        var designIndex = 0;
        var economicsIndex = 0;
        var mathIndex = 0;

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };


        //Loading topics for new users
        var contentPromise = ServicesDataFirebase.getContent();

        //Get topics of interest for the logged in user
        var getTopicsPromise = UserDataFirebase.getUserTopics($rootScope.currentUserPathID);

        $q.all([contentPromise, getTopicsPromise]).then(function(data){

            var allcontentArray = _.values(data[0]);

            for (var i = 0; i < allcontentArray.length; i++) {

                if(allcontentArray[i].computerscience) {

                    var allcontentArrayComputerScience = _.values(allcontentArray[i].computerscience);

                    for(var c = 0; c < allcontentArrayComputerScience.length; c++) {
                        vm.computerScienceStack.push({  name: allcontentArrayComputerScience[c].name,
                                                        videourl: allcontentArrayComputerScience[c].videourl,
                                                        startdate: allcontentArrayComputerScience[c].startdate,
                                                        type: allcontentArrayComputerScience[c].type});
                    }
                }

                if(allcontentArray[i].design) {

                    var allcontentArrayDesign = _.values(allcontentArray[i].design);

                    for(var m = 0; m < allcontentArrayDesign.length; m++) {
                        vm.designStack.push({   name: allcontentArrayDesign[m].name,
                                                videourl: allcontentArrayDesign[m].videourl,
                                                startdate: allcontentArrayDesign[m].startdate,
                                                type: allcontentArrayDesign[m].type});
                    }
                }

                if(allcontentArray[i].economics) {

                    var allcontentArrayEconomics = _.values(allcontentArray[i].economics);

                    for(var m = 0; m < allcontentArrayEconomics.length; m++) {
                        vm.economicsStack.push({    name: allcontentArrayEconomics[m].name,
                                                    videourl: allcontentArrayEconomics[m].videourl,
                                                    startdate: allcontentArrayEconomics[m].startdate,
                                                    type: allcontentArrayEconomics[m].type});
                    }
                }

                if(allcontentArray[i].general) {

                    var allcontentArrayGeneral = _.values(allcontentArray[i].general);

                    for(var m = 0; m < allcontentArrayGeneral.length; m++) {
                        vm.generalStack.push({  name: allcontentArrayGeneral[m].name,
                                                videourl: allcontentArrayGeneral[m].videourl,
                                                startdate: allcontentArrayGeneral[m].startdate,
                                                type: allcontentArrayGeneral[m].type});
                    }
                }

                if(allcontentArray[i].math) {

                    var allcontentArrayMath = _.values(allcontentArray[i].math);

                    for(var m = 0; m < allcontentArrayMath.length; m++) {
                        vm.mathStack.push({ name: allcontentArrayMath[m].name,
                                            videourl: allcontentArrayMath[m].videourl,
                                            startdate: allcontentArrayMath[m].startdate,
                                            type: allcontentArrayMath[m].type});
                    }
                }

                if(allcontentArray[i].physics) {

                    var allcontentArrayPhysics = _.values(allcontentArray[i].physics);

                    for(var m = 0; m < allcontentArrayPhysics.length; m++) {
                        vm.physicsStack.push({  name: allcontentArrayPhysics[m].name,
                                                videourl: allcontentArrayPhysics[m].videourl,
                                                startdate: allcontentArrayPhysics[m].startdate,
                                                type: allcontentArrayPhysics[m].type});
                    }
                }

            }

            vm.userTopics = data[1];
            vm.numberOfItemsToDisplay = 12; //Total will be 4 * number of topics selected
            while(vm.numberOfItemsToDisplay != 0) {

                for (var i = 0; i < vm.userTopics.length; i++) {

                    if(vm.userTopics[i] === "Computer Science") {

                        if(!!vm.computerScienceStack[computerScienceIndex]) {
                            vm.userStack.push({ name: vm.computerScienceStack[computerScienceIndex].name,
                                                videourl: vm.computerScienceStack[computerScienceIndex].videourl,
                                                startdate: vm.computerScienceStack[computerScienceIndex].startdate,
                                                type: vm.computerScienceStack[computerScienceIndex].type});
                            $log.debug("Adding CS content: " +  vm.computerScienceStack[computerScienceIndex].name)
                        }
                        computerScienceIndex++;
                    }

                    if(vm.userTopics[i] === "Design") {

                        if(!!vm.designStack[designIndex]) {
                            vm.userStack.push({ name: vm.designStack[designIndex].name,
                                                videourl: vm.designStack[designIndex].videourl,
                                                startdate: vm.designStack[designIndex].startdate,
                                                type: vm.designStack[designIndex].type});
                            $log.debug("Adding Design content: " +  vm.designStack[designIndex].name)
                        }
                        designIndex++;
                    }

                    if(vm.userTopics[i] === "Economics") {

                        if(!!vm.economicsStack[economicsIndex]) {
                            vm.userStack.push({ name: vm.economicsStack[economicsIndex].name,
                                                videourl: vm.economicsStack[economicsIndex].videourl,
                                                startdate: vm.economicsStack[economicsIndex].startdate,
                                                type: vm.economicsStack[economicsIndex].type});
                            $log.debug("Adding Economics content: " +  vm.economicsStack[economicsIndex].name)
                        }
                        economicsIndex++;
                    }

                    if(vm.userTopics[i] === "Math") {

                        if(!!vm.mathStack[mathIndex]) {
                            vm.userStack.push({ name: vm.mathStack[mathIndex].name,
                                                videourl: vm.mathStack[mathIndex].videourl,
                                                startdate: vm.mathStack[mathIndex].startdate,
                                                type: vm.mathStack[mathIndex].type});
                            $log.debug("Adding Math content: " +  vm.mathStack[mathIndex].name)
                        }
                        mathIndex++;
                    }

                    if(vm.userTopics[i] === "Physics") {

                        if(!!vm.physicsStack[physicsIndex]) {
                            vm.userStack.push({ name: vm.physicsStack[physicsIndex].name,
                                                videourl: vm.physicsStack[physicsIndex].videourl,
                                                startdate: vm.physicsStack[physicsIndex].startdate,
                                                type: vm.physicsStack[physicsIndex].type});
                            $log.debug("Adding Physics content: " +  vm.physicsStack[physicsIndex].name)
                        }
                        physicsIndex++;
                    }


                }

                vm.numberOfItemsToDisplay--;
            }

            //We are gonna randomize the objects store in the user stack
            vm.userStack.sort(function() { return 0.5 - Math.random() });

            console.log("Data coming from Firebase " + data[0], data[1]);
            console.log("Date in User Stack " + vm.userStack);
        });

    };


})();