app.controller('tipos', function($scope, $http, auth, $location, params, $cookies){
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
            $http.post(params.server + "tipos/eliminar", {
                "token": $cookies.get("token"),
                "datos": data.idTipo
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
        $http.post(params.server + "tipos/guardar", {
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
        $http.post(params.server + "tipos/", {
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
});