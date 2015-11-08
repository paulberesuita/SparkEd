(function() {

    'use strict';

    angular.module('sparked').controller('ExploreController', ExploreController);

    ExploreController.$inject = ['$scope', '$rootScope', 'AuthenticationFirebase', '$state', '$firebaseArray', '$firebaseObject', 'UserDataFirebase', 'ServicesDataFirebase', '$q', '$log', '$sce'];

    function ExploreController($scope, $rootScope, AuthenticationFirebase, $state, $firebaseArray, $firebaseObject, UserDataFirebase, ServicesDataFirebase, $q, $log, $sce) {

        var vm = this;

        vm.userStack = [];

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
                        vm.userStack.push({  name: allcontentArrayComputerScience[c].name,
                            videourl: allcontentArrayComputerScience[c].videourl,
                            startdate: allcontentArrayComputerScience[c].startdate,
                            type: allcontentArrayComputerScience[c].type});
                    }
                }

                if(allcontentArray[i].design) {

                    var allcontentArrayDesign = _.values(allcontentArray[i].design);

                    for(var m = 0; m < allcontentArrayDesign.length; m++) {
                        vm.userStack.push({   name: allcontentArrayDesign[m].name,
                            videourl: allcontentArrayDesign[m].videourl,
                            startdate: allcontentArrayDesign[m].startdate,
                            type: allcontentArrayDesign[m].type});
                    }
                }

                if(allcontentArray[i].economics) {

                    var allcontentArrayEconomics = _.values(allcontentArray[i].economics);

                    for(var m = 0; m < allcontentArrayEconomics.length; m++) {
                        vm.userStack.push({    name: allcontentArrayEconomics[m].name,
                            videourl: allcontentArrayEconomics[m].videourl,
                            startdate: allcontentArrayEconomics[m].startdate,
                            type: allcontentArrayEconomics[m].type});
                    }
                }

                if(allcontentArray[i].general) {

                    var allcontentArrayGeneral = _.values(allcontentArray[i].general);

                    for(var m = 0; m < allcontentArrayGeneral.length; m++) {
                        vm.userStack.push({  name: allcontentArrayGeneral[m].name,
                            videourl: allcontentArrayGeneral[m].videourl,
                            startdate: allcontentArrayGeneral[m].startdate,
                            type: allcontentArrayGeneral[m].type});
                    }
                }

                if(allcontentArray[i].math) {

                    var allcontentArrayMath = _.values(allcontentArray[i].math);

                    for(var m = 0; m < allcontentArrayMath.length; m++) {
                        vm.userStack.push({ name: allcontentArrayMath[m].name,
                            videourl: allcontentArrayMath[m].videourl,
                            startdate: allcontentArrayMath[m].startdate,
                            type: allcontentArrayMath[m].type});
                    }
                }

                if(allcontentArray[i].physics) {

                    var allcontentArrayPhysics = _.values(allcontentArray[i].physics);

                    for(var m = 0; m < allcontentArrayPhysics.length; m++) {
                        vm.userStack.push({  name: allcontentArrayPhysics[m].name,
                            videourl: allcontentArrayPhysics[m].videourl,
                            startdate: allcontentArrayPhysics[m].startdate,
                            type: allcontentArrayPhysics[m].type});
                    }
                }

            }


            vm.userTopics = data[1];
            vm.numberOfItemsToDisplay = 12; //Total will be 4 * number of topics selected

            //We are gonna randomize the objects store in the user stack
            vm.userStack.sort(function() { return 0.5 - Math.random() });

            console.log("Data coming from Firebase " + data[0], data[1]);
            console.log("Date in User Stack " + vm.userStack);
        });

    };


})();