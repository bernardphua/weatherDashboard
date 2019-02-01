(function(){
    angular.module("app.data")
        .value("weatherImgUrl", "http://openweathermap.org/img/w/")
        .value("weatherSvcUrl", "https://api.openweathermap.org/data/2.5/")
        .value("weatherCountryFlagUrl", "http://openweathermap.org/images/flags/");
}());
