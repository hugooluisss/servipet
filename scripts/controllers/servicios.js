app.controller('servicios', function($scope, $state, $http, auth, $location, params, $cookies){
    auth.validar().then(function(resp){
        if(!resp.data.result){
            $location.url('/login');
        }
    });

    $scope.lista = [];
    $scope.data = {};
    getLista();

    $scope.set = function(obj){
        $scope.data = obj;
        mui.tabs.activate("tabForm");
    }

    $scope.eliminar = function(user){
        if (confirm("¿Seguro?")){
            $http.post(params.server + "servicios/eliminar", {
                "token": $cookies.get("token"),
                "datos": user.idServicio
            }).then(function onSuccess(resp){
                if (resp.data.result)
                    getLista();
                else
                    alert("No se pudo eliminar");
            });
        }
    }

    $scope.nuevo = function(){
        $scope.data = {icono: ""};
    }

    $scope.guardar = function(){
        $http.post(params.server + "servicios/guardar", {
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
        $http.post(params.server + "servicios/", {
            "token": $cookies.get("token")
        }).then(function onSuccess(resp){
            $scope.lista = resp.data.lista;
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

    $scope.goAdicionales = function(obj){
        $state.go('dashboard.adicionales', {"servicio": obj});
    }

    $scope.goSizes = function(obj){
        $state.go('dashboard.sizes', {"servicio": obj});
    }
});