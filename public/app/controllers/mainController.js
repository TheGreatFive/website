/*
    This file contains the mainController which is used in index.html
*/
angular.module('mainController', ['authServices', 'userServices'])

    //mainCtrl called in index.html
    .controller('mainCtrl', function(User, $timeout, $location, $rootScope, $scope) {
        var app = this;
        app.loadingData = true;

        //On every route change checking if the user is logged in
        $rootScope.$on('$routeChangeStart', function() {
            if (User.isLoggedIn()) {
                User.getUser().then(function(data) {
                    app.isLoggedIn = true;
                    app.username = data.data.username;
                    app.email = data.data.email;
                });
            } else {
                app.isLoggedIn = false;
            }
            app.loadingData = false;

            //Force scrolling to the top of the page, when we load a new page to the screen
            window.scrollTo(0, 0);
        });

        //Logging out the user (here instead of userController.js because it is called from the navbar)
        this.logout = function() {
            User.logout();

            //Redirecting to home page after logout
            $timeout(function() {
                $location.path('/home')
            }, 500);
        };

        this.upload = function(file){
            var f = document.getElementById('myImage').files[0],
                r = new FileReader();

            console.log('here');
            r.onload = function(file){
                console.log('done');
            }
        }
    });
