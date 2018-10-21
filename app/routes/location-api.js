/*
    This file contains the backend routes for location
*/

var Location = require('../models/location');
var mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
var geocodingClient = mbxGeocoding({accessToken: 'pk.eyJ1IjoiZG91Z2FndWVycmEiLCJhIjoiY2puNHpwNGk4MDA3azNrbGttMnlndTd6YSJ9.zPFiViInpT-AH8lhvsOE8A'});

module.exports = function(router){

    // Middleware to convert location to coordinates before storing in database
    // Taking advantage of mapbox api
    router.use('/addLocation', function(req, res, next){
        req.coordinate = null;
        if(req.body.city && req.body.state){
            var queryData = req.body.city + ', ' + req.body.state;
            geocodingClient.forwardGeocode({
                query: queryData,
                limit: 1
            }).send().then(function(response){
                req.coordinate = response.body.features[0].center;
                console.log(req.coordinate);
                next();
            });
        }
    });

    // Adding a location into the database
    // http://<url>/location-api/addLocation
    router.post('/addLocation', function(req, res){
        var location = new Location();

        if(req.coordinate == null){
            res.json({
                success: false,
                message: 'Ensure city and state are specified'
            });
        }
        else{
            location.city = req.body.city;
            location.state = req.body.state;
            location.longitude = req.coordinate[0];
            location.latitude = req.coordinate[1];

            location.save(function(err){
                if(err){
                    res.json({
                        success: false,
                        message: 'Could not save location in database'
                    });
                }
                else{
                    res.json({
                        success: true,
                        message: 'Successfully saved location in database'
                    });
                }
            });
        }
    });

    // Retrieving locations from database and returning a geoJson
    // http://<url>location-api/getLocations
    router.get('/getLocations', function(req, res){
        var geojson = {
            type: "FeatureCollection",
            features: []
        };

        Location.find(function(err, locations){
            if (err) throw err;

            for(index in locations){
                geojson.features.push({
                    "type": "Feature",
                    "properties" : {
                        "name": locations[index].city + ", " + locations[index].state
                    },
                    "geometry" : {
                        "type": "Point",
                        "coordinates": [locations[index].longitude, locations[index].latitude]
                    }
                });
            }
            res.json(geojson);
        });
    });

    return router;
}
