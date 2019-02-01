(function() {
    var name = "app.data",
        requires = ['ngRoute', 'ngResource'];

    angular.module(name,requires);

    angular.module(name)
        .config(function($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                'https://*.openweathermap.org/**',
                'https://openweathermap.org/**'
            ]);
        });

    angular.module(name)
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.hashPrefix('');
        }]);

}());
