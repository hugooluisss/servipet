app.controller('login', function($scope, $http, params, auth, $location){
    auth.validar().then(function(resp){
        if(resp.data.result){
            console.log("redirect");
            $location.url('/dashboard/usuarios');
        }
    });

    $scope.iniciarSesion = function(){
        $http.post(params.server + 'sesion/iniciar', $scope.usuario).then(function onSuccess(response) {
			var headers = response.headers;
            var data = response.data;

            if(!data.result)
                alert("Tus datos no son válidos");
            else{
                auth.setToken(data.token);
                $location.url('/dashboard/usuarios');
            }
		});
    }
});