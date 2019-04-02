app.controller('productos', function($scope, $state, $stateParams, $http, auth, $location, params, $cookies, $window){
    auth.validar().then(function(resp){
        if(!resp.data.result){
            console.log("redirect");
            $location.url('/login');
        }
    });

    $scope.categorias = [];
    $http.post(params.server + "categorias/", {
        "token": $cookies.get("token")
    }).then(function onSuccess(resp){
        $scope.categorias = resp.data.lista;
    });

    $scope.lista = [];
    $scope.data = { precio: 0, icono: '', descripcion: ''};
    getLista();

    $scope.set = function(data){
        $scope.data = data;
        mui.tabs.activate("tabForm");
    }

    $scope.eliminar = function(data){
        if (confirm("¿Seguro?")){
            $http.post(params.server + "productos/eliminar", {
                "token": $cookies.get("token"),
                "datos": data.idProducto
            }).then(function onSuccess(resp){
                if (resp.data.result)
                    getLista();
                else
                    alert("No se pudo eliminar");
            });
        }
    }

    $scope.nuevo = function(){
        $scope.data = {icono: '', descripcion: ''};
    }

    $scope.guardar = function(){
        $http.post(params.server + "productos/guardar", {
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
        $http.post(params.server + "productos/", {
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


app.controller('categoriasprod', function($scope, $http, auth, $location, params, $cookies){
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
            $http.post(params.server + "categorias/eliminar", {
                "token": $cookies.get("token"),
                "datos": data.idCategoria
            }).then(function onSuccess(resp){
                if (resp.data.result)
                    getLista();
                else
                    alert("No se pudo eliminar");
            });
        }
    }

    $scope.nuevo = function(){
        $scope.data = {icono: ''};
    }

    $scope.guardar = function(){
        $http.post(params.server + "categorias/guardar", {
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
        $http.post(params.server + "categorias/", {
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