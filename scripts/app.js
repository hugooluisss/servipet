var app = angular.module("app", ['ui.router', 'ngCookies', 'app.services']);

app.config(function($stateProvider, $urlRouterProvider, $cookiesProvider){
    $stateProvider.state("login", {
        url: "/login",
        templateUrl: "templates/login/panel.html",
        controller: "login"
    });

    $stateProvider.state("dashboard", {
        url: "/dashboard",
        abstract: true,
        views: {
            "": {
                controller: 'dashboard',
                templateUrl: "templates/dashboard.html",
            }
        }
    })
    .state("dashboard.usuarios", {
        url: "/usuarios",
        cache: false,
        views: {
            'contenido': {
                templateUrl: "templates/usuarios.html",
                controller: 'usuarios'
            }
        }
    })
    .state("dashboard.servicios", {
        url: "/servicios",
        cache: false,
        views: {
            'contenido': {
                templateUrl: "templates/servicios.html",
                controller: 'servicios'
            }
        }
    })

    .state("dashboard.adicionales", {
        url: "/adicionales/",
        cache: false,
        params: {
            servicio: {}
        },
        views: {
            'contenido': {
                templateUrl: "templates/adicionales.html",
                controller: 'adicionales'
            }
        }
    })

    .state("dashboard.sizes", {
        url: "/sizes/",
        cache: false,
        params: {
            servicio: {}
        },
        views: {
            'contenido': {
                templateUrl: "templates/sizes.html",
                controller: 'sizes'
            }
        }
    })

    .state("dashboard.clientes", {
        url: "/clientes/",
        cache: false,
        views: {
            'contenido': {
                templateUrl: "templates/clientes.html",
                controller: 'clientes'
            }
        }
    })

    .state("dashboard.tipos", {
        url: "/tipos/",
        cache: false,
        views: {
            'contenido': {
                templateUrl: "templates/tipos.html",
                controller: 'tipos'
            }
        }
    })

    .state("dashboard.mascotas", {
        url: "/mascotas/",
        cache: false,
        params: {
            cliente: {}
        },
        views: {
            'contenido': {
                templateUrl: "templates/mascotas.html",
                controller: 'mascotas'
            }
        }
    })

    .state("dashboard.centros", {
        url: "/centros/",
        cache: false,
        views: {
            'contenido': {
                templateUrl: "templates/centros.html",
                controller: 'centros'
            }
        }
    })

    $urlRouterProvider.otherwise('/login');
});

app.factory('params', function() { 
    return { 
        //server : 'http://localhost/servipet/wsServipet/'
        server: 'http://192.168.2.2/servipet/wsServipet/'
    }; 
});

angular.module('app.services', ['ngCookies'])
.factory("auth", function($cookies, $http, params, $state, $location){
    var self = this;

    self.setToken = function(id){
        $cookies.put("token", id);
    }

    self.unSetToken = function(){
        $cookies.remove("token");
    }
    
    self.getToken = function(){
        return $cookies.get("token");
    }
    
    self.validar = function(){
        return $http.post(params.server + "sesion/validar", {
            "token": $cookies.get("token")
        });
    }

    return self;
});