/*
    This file contains functions related to user requests
    Communicates with authServices to get user tokens know if user is logged in or to log out user
*/

angular.module('userServices', ['authServices'])

    //Factory to register and login a user in the database
    //Called in userController.js
    .factory('User', function($http, AuthToken) {
        userFactory = {};

        //User.registerUser(regData) -> this is how to call it
        userFactory.registerUser = function(regData) {
            return $http.post('/user-api/users', regData);
        }

        //User.loginUser() -> function call
        userFactory.loginUser = function(loginData) {
            return $http.post('/user-api/authenticate', loginData).then(function(data) {
                AuthToken.setToken(data.data.token);
                return data;
            })
        }

        //User.isLoggedIn() -> function call
        userFactory.isLoggedIn = function() {
            if (AuthToken.getToken()) {
                return true;
            } else {
                return false;
            }
        }

        // Auth.facebook(token);
        userFactory.facebook = function(token) {
            AuthToken.setToken(token);
        }

        //User.logout() -> function call
        userFactory.logout = function() {
            AuthToken.deleteToken();
        }

        //User.getUser() -> function call
        userFactory.getUser = function() {
            if (AuthToken.getToken()) {
                return $http.get('/user-api/currentUser');
            } else {
                $q.reject({
                    message: 'User has no token'
                });
            }
        }

        //User.getAllUsers() -> function call
        userFactory.getAllUsers = function(user) {
            return $http.get('/user-api/getAllUsers/' + user);
        }

        //User.getFriends() -> function call
        userFactory.getFriends = function(user){
            return $http.get('/user-api/getFriends/' + user);
        }

        //User.addFriend() -> function call
        userFactory.addFriend = function(followingUserData){
            return $http.put('/user-api/followUser', followingUserData);
        }

        //User.removeFriend() -> function call
        userFactory.removeFriend = function(unfollowUserData){
            return $http.put('/user-api/unfollowUser', unfollowUserData);
        }

        return userFactory;
    });
