/*
    This file contains the profileController which is used in profile.html
    Also includes the directive needed to render the mapbox onto the page view
*/

angular.module('profileController', [])

    //Directive needed to load mapbox onto the screen
    .directive('mapbox', function() {
        return {
            template: "<div id='map'><div>",    //Way to load map in the html file
            link: function(scope, element, attributes) {

                //Initial load of the map
                mapboxgl.accessToken = 'pk.eyJ1IjoiZG91Z2FndWVycmEiLCJhIjoiY2puNHpwNGk4MDA3azNrbGttMnlndTd6YSJ9.zPFiViInpT-AH8lhvsOE8A';
                var map = new mapboxgl.Map({
                    container: 'map', // container id
                    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
                    zoom: 1 //Zoom all the way out would show the entire map
                });

                //Adding the GeoCoder Api to search within a map
                var geocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken
                });
                map.addControl(geocoder);

                //Updates map location to the user's current location
                scope.updateMapLocation = function(longitude, latitude){
                    console.log(longitude, latitude);
                    map.jumpTo({
                        center: [longitude, latitude],
                        zoom: 12
                    });
                };
            }
        };
    })

    //profileCtrl called in profile.html
    .controller('profileCtrl', function($scope) {
        var profile = this;
        profile.showMap = false;
        profile.showProfile = true;

        //Toggle to display map
        profile.displayMap = function() {
            profile.getUserLocation();
            profile.showMap = true;
            profile.showProfile = false;
        };

        //Toggle to display profile
        profile.displayProfile = function() {
            profile.showMap = false;
            profile.showProfile = true;
        };

        //Requesting user's current location to update map view
        profile.getUserLocation = function(){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(position){
                    $scope.updateMapLocation(position.coords.longitude, position.coords.latitude);
                });
            }
            else{
                console.log('Location Request Denied');
            }
        };
    });
