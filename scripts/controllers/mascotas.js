app.controller('mascotas', function($scope, $state, $stateParams, $http, auth, $location, params, $cookies, $window){
    auth.validar().then(function(resp){
        if(!resp.data.result){
            console.log("redirect");
            $location.url('/login');
        }
    });
    
    if ($stateParams.cliente.idCliente == undefined)
        $state.go('dashboard.clientes');

    $scope.cliente = $stateParams.cliente;
    $scope.lista = [];
    $scope.data = {idCliente: $stateParams.cliente.idCliente};
    $scope.sizes = [];
    getLista();

    $http.post(params.server + "sizes/get", {
        "token": $cookies.get("token")
    }).then(function onSuccess(resp){
        $scope.sizes = resp.data.lista;
    });

    $scope.set = function(obj){
        $scope.data = obj;
        mui.tabs.activate("tabForm");
    }

    $scope.eliminar = function(obj){
        if (confirm("¿Seguro?")){
            $http.post(params.server + "mascotas/eliminar", {
                "token": $cookies.get("token"),
                "datos": obj.idMascota
            }).then(function onSuccess(resp){
                if (resp.data.result)
                    getLista();
                else
                    alert("No se pudo eliminar");
            });
        }
    }

    $scope.nuevo = function(){
        $scope.data = {precio: 0, idCliente: $scope.servicio.idCLiente, "icono": ""};
    }

    $scope.guardar = function(){
        $http.post(params.server + "mascotas/guardar", {
            "token": $cookies.get("token"),
            "datos": $scope.data
        }).then(function onSuccess(resp){
            if (resp.data.result)
                getLista();
            else
                alert("No se pudo guardar");
        });
    }

    $scope.vistaPrevia = function(input){
        if (input[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log(e.target.result);
                $scope.data.icono = e.target.result;
                $scope.$apply();
            }
            reader.readAsDataURL(input[0]);
        }
    }

    function getLista(){
        mui.tabs.activate("tabLista");
        $http.post(params.server + "mascotas/", {
            "token": $cookies.get("token"),
            "datos": $scope.cliente.idCliente
        }).then(function onSuccess(resp){
            $scope.lista = resp.data.lista;
        });
    }
});