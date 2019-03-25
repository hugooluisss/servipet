app.controller('adicionales', function($scope, $state, $stateParams, $http, auth, $location, params, $cookies, $window){
    auth.validar().then(function(resp){
        if(!resp.data.result){
            console.log("redirect");
            $location.url('/login');
        }
    });

    if ($stateParams.servicio.idServicio == undefined)
        $state.go('dashboard.servicios');

    $scope.servicio = $stateParams.servicio;
    $scope.lista = [];
    $scope.data = {precio: 0};
    getLista();

    $scope.set = function(obj){
        $scope.data = obj;
        mui.tabs.activate("tabForm");
    }

    $scope.eliminar = function(obj){
        if (confirm("¿Seguro?")){
            $http.post(params.server + "adicionales/eliminar", {
                "token": $cookies.get("token"),
                "datos": obj.idAdicional
            }).then(function onSuccess(resp){
                if (resp.data.result)
                    getLista();
                else
                    alert("No se pudo eliminar");
            });
        }
    }

    $scope.nuevo = function(){
        $scope.data = {precio: 0, idServicio: $scope.servicio.idServicio};
    }

    $scope.guardar = function(){
        $http.post(params.server + "adicionales/guardar", {
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
        $http.post(params.server + "adicionales/", {
            "token": $cookies.get("token"),
            "datos": $scope.servicio.idServicio
        }).then(function onSuccess(resp){
            $scope.lista = resp.data.lista;
        });
    }
});