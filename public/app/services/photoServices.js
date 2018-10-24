/*
    This file contains services for storing and retrieving photos.
    Accessed by uploadController.js
*/

angular.module('photoServices', [])

    //Factory that retrieves and stores photos for a given user
    .factory('Photo', function($http){
        var photoFactory = {};

        // Stores the photo into the database
        // Photo.storePhoto(photoData) -> this is the function call
        photoFactory.storePhoto = function(photoData){
            return $http.post('/photo-api/addPhoto', photoData);
        };

        // Retrieves all the photos of the given user
        // Photo.displayPhotos(userData)
        photoFactory.displayPhotos = function(userData){
            return $http.put('/photo-api/getPhotos', userData);
        };

        // Deletes photo of a user
        photoFactory.deletePhoto = function(photoData){
            return $http.put('/photo-api/deletePhoto', photoData);
        };

        return photoFactory;
    });
