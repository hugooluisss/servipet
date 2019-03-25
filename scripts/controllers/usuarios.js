app.controller('usuarios', function($scope, $http, auth, $location, params, $cookies){
    auth.validar().then(function(resp){
        if(!resp.data.result){
            console.log("redirect");
            $location.url('/login');
        }
    });

    $scope.lista = [];
    $scope.usuario = {};
    getLista();

    $scope.setUser = function(user){
        $scope.usuario = user;
        mui.tabs.activate("tabForm");
    }

    $scope.eliminar = function(user){
        if (confirm("¿Seguro?")){
            $http.post(params.server + "usuarios/eliminar", {
                "token": $cookies.get("token"),
                "datos": user.idUsuario
            }).then(function onSuccess(resp){
                if (resp.data.result)
                    getLista();
                else
                    alert("No se pudo eliminar");
            });
        }
    }

    $scope.setNuevo = function(){
        $scope.usuario = {};
    }

    $scope.guardar = function(){
        $http.post(params.server + "usuarios/guardar", {
            "token": $cookies.get("token"),
            "datos": $scope.usuario
        }).then(function onSuccess(resp){
            if (resp.data.result)
                getLista();
            else
                alert("No se pudo guardar");
        });
    }

    function getLista(){
        mui.tabs.activate("tabLista");
        $http.post(params.server + "usuarios/", {
            "token": $cookies.get("token")
        }).then(function onSuccess(resp){
            $scope.lista = resp.data.lista;
        });
    }
});