/*
    This file contains the uploadController, which is used to upload photos and files
    Also takes care of other input that may come along with uploads
*/
angular.module('uploadController', [])

    .directive('ngFiles', function() {
        return {
            require: "ngModel",
            link: function postLink(scope, elem, attrs, ngModel) {
                elem.on('change', function(data){
                    var image = elem[0].files[0];
                    var reader = new FileReader();
                    var previewImg = document.getElementById('previewImg');

                    reader.onload = function(image){
                        scope.imageData = reader.result;
                        previewImg.src = scope.imageData;
                    }

                    if(image){
                        reader.readAsDataURL(image);
                    }
                });
            }
        }
    })

    .controller('uploadCtrl', function($scope) {
        var upload = this;

        // Function to upload image
        upload.uploadImage = function(username){
            console.log(username);
            console.log($scope.imageData);
            upload.getUserLocation();
        }
    });
