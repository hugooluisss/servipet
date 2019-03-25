app.controller('dashboard', function($scope, $http, $location, $cookies, auth, params){
    $scope.logout = function(){
        if (confirm("¿Seguro?")){
            $http.post(params.server + 'sesion/logout', {
                "token": $cookies.get("token")
            }).then(function onSuccess(response) {
                auth.unSetToken();
                $location.url('/dashboard/login');
            });
        }
    }
});