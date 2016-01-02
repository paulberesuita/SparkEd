(function() {

    'use strict';

    angular.module('sparked').controller('ConnectController', ConnectController);

    ConnectController.$inject = ['$scope', '$rootScope', 'AuthenticationFirebase', '$state', '$firebaseArray', '$firebaseObject', 'UserDataFirebase', '$timeout', 'ServicesDataFirebase'];

    function ConnectController($scope, $rootScope, AuthenticationFirebase, $state, $firebaseArray, $firebaseObject, UserDataFirebase, $timeout, ServicesDataFirebase) {

        var vm = this;

        var mapOptions = {
            center: new google.maps.LatLng(40.601203, -8.668173),
            zoom: 15,
            mapTypeId: 'roadmap'
        };

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // a new Info Window is created
        var infoWindow = new google.maps.InfoWindow();

        // Event that closes the Info Window with a click on the map
        google.maps.event.addListener(map, 'click', function () {
            infoWindow.close();
        });

        // Finally displayMarkers() function is called to begin the markers creation
        displayMarkers();


        function displayMarkers(users) {

            // this variable sets the map bounds and zoom level according to markers position
            var bounds = new google.maps.LatLngBounds();

            var allUsersArray = _.values(users);

            // For loop that runs through the info on markersData making it possible to createMarker function to create the markers
            for (var i = 0; i < allUsersArray.length; i++) {

                var latlng = new google.maps.LatLng(allUsersArray[i].locationLatitude, allUsersArray[i].locationLongitude);

                var allTopics = _.allKeys(allUsersArray[i].topics.topics);
                var name = allUsersArray[i].name;

                var topicsOfInterest = "";

                for (var j = 0; j < allTopics.length; j++) {

                    if (j === allTopics.length - 1) {
                        topicsOfInterest = topicsOfInterest + allTopics[j];

                    } else {
                        topicsOfInterest = topicsOfInterest + allTopics[j] + ", ";
                    }

                }

                createMarker(latlng, topicsOfInterest, name);

                // Marker’s Lat. and Lng. values are added to bounds variable
                bounds.extend(latlng);
            }

            // Finally the bounds variable is used to set the map bounds
            // with API’s fitBounds() function
            //map.fitBounds(bounds);
        }

        function createMarker(latlng, allTopics, name) {
            var marker = new google.maps.Marker({
                map: map,
                position: latlng,
                title: allTopics
            });

            // This event expects a click on a marker
            // When this event is fired the infowindow content is created
            // and the infowindow is opened
            google.maps.event.addListener(marker, 'click', function () {

                // Variable to define the HTML content to be inserted in the infowindow
                var iwContent = '<div id="iw_container">' +
                    '<div class="iw_title"><b>' + name + '</b></div></div>' +
                    '<div class="iw_title">' + allTopics +  '</div></div>';

                infoWindow.setContent(iwContent);

                // opening the infowindow in the current map and at the current marker location
                infoWindow.open(map, marker);
            });
        }

        //Get all of the users latitude/longitudes
        var usersPromise = ServicesDataFirebase.getUsers();

        usersPromise.then(function (users) {

            displayMarkers(users);

            navigator.geolocation.getCurrentPosition(function (pos) {

                var contentString = "";

                UserDataFirebase.saveUserLocation($rootScope.currentUserPathID, pos.coords.latitude, pos.coords.longitude);

                var LatLong = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

                var geocoder = new google.maps.Geocoder();

                geocoder.geocode({'latLng': LatLong}, function (results, status) {

                    var result = results[0];
                    var state = '';

                    for (var i = 0, len = result.address_components.length; i < len; i++) {
                        var ac = result.address_components[i];

                        if (ac.types.indexOf('administrative_area_level_1') >= 0) {
                            state = ac.short_name;
                        }
                    }

                    UserDataFirebase.saveUserCityState($rootScope.currentUserPathID, result.address_components[2]["short_name"], state);

                    var city = result.address_components[2]["short_name"];

                    console.log("result: " + city);
                    console.log("state: " + state);

                    contentString = '<div id="iw_container">' +
                    '<div class="iw_title"><b>' + $rootScope.name + '</b></div></div>' +
                    '<div class="iw_title">' + city + ", " + state +  '</div></div>';

                    var marker = new google.maps.Marker({
                        position: LatLong,
                        map: map
                    });


                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    });

                });

                map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));


            });

            $scope.map = map;


        });

    }
})();