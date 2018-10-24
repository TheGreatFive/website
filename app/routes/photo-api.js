/*
    This file contains the backend routs for photo
*/

var Photo = require('../models/photo');
var User = require('../models/user');

module.exports = function(router){

    //Middleware for adding and deleting a post
    router.use('/', function(req, res, next){
        if(req.body.username){
            User.findOne({username: req.body.username}, function(err, user){
                if(!user){
                    req.error = "User does not exist in database";
                    next();
                }
                else{
                    next();
                }
            });
        }
        else{
            req.error = "User not provided";
            next();
        }
    });

    // Adding a photo to the database
    // http://<url>/photo-api/addPhoto
    router.post('/addPhoto', function(req, res){
        if(req.error){
            res.json({
                success: false,
                message: req.error
            });
        }
        else if(req.body.photo && req.body.address){
            var photo = new Photo();
            photo.address = req.body.address;
            photo.username = req.body.username;
            photo.photoData = req.body.photo;

            photo.save(function(err){
                if(err){
                    res.json({
                        success: false,
                        message: "Unable to store photo in the database"
                    });
                }
                else{
                    res.json({
                        success: true,
                        message: "Successfully stored photo in the database"
                    });
                }
            })
        }
        else{
            res.json({
                success: false,
                message: "Ensure photo and address are provided"
            });
        }
    });

    // Getting photos from the database and updating
    // http://<url>/photo-api/getPhotos
    router.put('/getPhotos', function(req, res){
        if(req.error){
            res.json({
                success: false,
                message: req.error
            });
        }
        else{
            Photo.find({username: req.body.username}, function(err, photos){
                if(err) throw err;
                res.send(photos);
            });
        }
    });

    return router;
}
