var app = angular.module("app", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state("login", {
        url: "/login",
        templateUrl: "templates/login/panel.html",
        controller: "login"
    });

    $urlRouterProvider.otherwise('/login');
});