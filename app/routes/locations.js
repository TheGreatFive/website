/*
    This file contains the backend routes for location
*/

var Location = require('../models/location');

module.exports = function(router){
    router.post('/addLocation', function(req, res){
        var location = new Location();
        location.city = req.body.city;
        location.state = req.body.state;
        location.zipCode = req.body.zipCode;

        if(req.body.city == null){
            res.json({
                success: false,
                message: 'Ensure city is specified'
            });
        }
        else{
            location.save(function(err){
                if(err){
                    res.json({
                        success: false,
                        message: 'Could not save'
                    });
                }
                else{
                    res.json({
                        success: true,
                        message: 'Successfully save location'
                    });
                }
            });
        }
    });

    return router;
}
