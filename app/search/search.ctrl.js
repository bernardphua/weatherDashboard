(function() {
    angular.module("app.search")
        .controller("Search", function($scope, weatherSvc) {
            $scope.$on("search", search);

            function search(evt, data) {
                weatherSvc.find(data.str).$promise
                    .then(
                        function(result) {
                            $scope.weatherResult =  result.list;
                        },
                        function(err) {
                            console.log("Error getting cities: ",err);
                        }
                    );
            }

            // $scope.$watch('weatherResult', function(){
            //     console.log($scope.weatherResult);
            // });

        });
}());
