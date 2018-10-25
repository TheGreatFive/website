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
                    scope.previewImg = document.getElementById('previewImg');

                    reader.onload = function(image){
                        previewImg.src = reader.result;
                        console.log(reader.result);
                    }

                    if(image){
                        reader.readAsDataURL(image);
                    }
                });
            }
        }
    });
