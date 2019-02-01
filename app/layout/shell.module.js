(function () {
    var name = "app.shell",
        requires = ["ngRoute"];

    angular.module(name, requires)
        .config(function ($routeProvider) {
            $routeProvider
                .when("/search", {
                    templateUrl: "app/search/search.html",
                    controller: "Search"
                })
                .when("/weather/:id",{
                    templateUrl: "app/weather/weather.html",
                    controller: "Weather"
                })
                .when("/forecast/:id", {
                    templateUrl: "app/forecast/forecast.html",
                    controller: "Forecast"
                })
                .when("/", {
                    templateUrl: "index.html",
                    controller: ""
                })
                .otherwise({
                    redirectTo: "/search"
                })
        });

}());
