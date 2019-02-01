(function(){
    angular.module("app.forecast")
    .controller("Forecast", function($scope, $routeParams, weatherSvc){

        $scope.forecast = null;

        if($routeParams.id !== undefined) {
            getForecast($routeParams.id);
        }

        function getForecast(id) {
            // debugger;
            weatherSvc.getForecast(id).$promise
                .then(
                    function (response) {
                        $scope.forecast = response;
                        // console.log($scope.forecast);
                    },
                    function (err) {
                        console.log("Error loading forecase data: ", err);
                    }
                );
        }

    });
}());
