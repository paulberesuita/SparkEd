(function() {

    'use strict';

    angular.module('sparked').controller('ConnectController', ConnectController);

    ConnectController.$inject = ['$scope', '$rootScope', 'AuthenticationFirebase', '$state', '$firebaseArray', '$firebaseObject', 'UserDataFirebase', '$timeout'];

    function ConnectController($scope, $rootScope, AuthenticationFirebase, $state, $firebaseArray, $firebaseObject, UserDataFirebase, $timeout) {

        var vm = this;

        var LatLong = new google.maps.LatLng(37, -120);
        console.log(LatLong);

        var mapOptions = {
            center: LatLong,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map =  new google.maps.Map(document.getElementById("map"), mapOptions);


        navigator.geolocation.getCurrentPosition(function(pos){

            UserDataFirebase.saveUserLocation($rootScope.currentUserPathID, pos.coords.latitude, pos.coords.longitude);

            LatLong = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

            var geocoder= new google.maps.Geocoder();

            geocoder.geocode({ 'latLng': LatLong }, function (results, status) {
                var result = results[0];
                var state = '';

                for (var i = 0, len = result.address_components.length; i < len; i++) {
                    var ac = result.address_components[i];

                    if (ac.types.indexOf('administrative_area_level_1') >= 0) {
                        state = ac.short_name;
                    }
                }

                UserDataFirebase.saveUserCityState($rootScope.currentUserPathID, result.address_components[2]["short_name"], state);

                console.log("result: " + result.address_components[2]["short_name"]);
                console.log("state: " + state);

                //$('#yourInputBox').val(state);

            });

            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

            var marker = new google.maps.Marker({
                position: LatLong,
                map: map,
                title: 'Marker'
            });

            var contentString = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">Paul Beresuita</h1>'+
                '<div id="bodyContent">'+
                '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                'sandstone rock formation in the southern part of the '+
                'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
                'south west of the nearest large town, Alice Springs; 450&#160;km '+
                '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
                'features of the Uluru - Kata Tjuta National Park. Uluru is '+
                'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
                'Aboriginal people of the area. It has many springs, waterholes, '+
                'rock caves and ancient paintings. Uluru is listed as a World '+
                'Heritage Site.</p>'+
                '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
                'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
                '(last visited June 22, 2009).</p>'+
                '</div>'+
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });

        });

        $scope.map = map;


    };


})();