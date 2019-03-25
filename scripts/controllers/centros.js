app.controller('centros', function($scope, $state, $http, auth, $location, params, $cookies){
    auth.validar().then(function(resp){
        if(!resp.data.result){
            console.log("redirect");
            $location.url('/login');
        }
    });

    $scope.lista = [];
    $scope.data = {};
    getLista();

    $scope.set = function(data){
        $scope.data = data;
        mui.tabs.activate("tabForm");
    }

    $scope.eliminar = function(data){
        if (confirm("¿Seguro?")){
            $http.post(params.server + "centros/eliminar", {
                "token": $cookies.get("token"),
                "datos": data.idCentro
            }).then(function onSuccess(resp){
                if (resp.data.result)
                    getLista();
                else
                    alert("No se pudo eliminar");
            });
        }
    }

    $scope.nuevo = function(){
        $scope.data = {};
    }

    $scope.guardar = function(){
        $http.post(params.server + "centros/guardar", {
            "token": $cookies.get("token"),
            "datos": $scope.data
        }).then(function onSuccess(resp){
            if (resp.data.result)
                getLista();
            else
                alert("No se pudo guardar");
        });
    }

    function getLista(){
        mui.tabs.activate("tabLista");
        $http.post(params.server + "centros/", {
            "token": $cookies.get("token")
        }).then(function onSuccess(resp){
            $scope.lista = resp.data.lista;
        });
    }
});