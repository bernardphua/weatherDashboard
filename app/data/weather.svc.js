(function() {
    angular.module("app.data")
        .factory("weatherSvc", function($http, $resource, $q, weatherImgUrl, weatherSvcUrl, weatherCountryFlagUrl) {
            return {
                find: findByLocation,
                getCurrent: getCurrentWeather,
                getForecast: getForecast,
                getWeatherImgUrl: getWeatherImgUrl,
                getCountryFlagUrl: getCountryFlagUrl,
                kelvinToDegree: kelvinToDegree,
                getTime: getTime
            };

            function findByLocation(location) {
                //var url = "https://openweathermap.org/find?q=" + location;

                var weatherAPI = $resource(weatherSvcUrl + "find", {
                    jsonpCallbackParam: 'callback'
                }, {
                    get: {method: "JSONP"}
                });

                return weatherAPI.get({
                    appid: "1352a59ccac755017f3abce51cca86f9",
                    q: location
                });
            }

            function getCurrentWeather(id) {
                // debugger;
                var getCurrentWeatherAPI = $resource(weatherSvcUrl + "weather", {
                    jsonpCallbackParam: 'callback'
                },{
                    get:{method: "JSONP"}
                });

                return getCurrentWeatherAPI.get({
                    appid: "1352a59ccac755017f3abce51cca86f9",
                    id: id
                });
            }

            function getForecast(id){

                var getForecastAPI = $resource(weatherSvcUrl + "forecast",{
                    jsonpCallbackParam: 'callback'
                },{
                    get:{method:"JSONP"}
                });

                return getForecastAPI.get({
                    appid: "1352a59ccac755017f3abce51cca86f9",
                    id: id
                });
            }

            function getWeatherImgUrl(imgStr){
                return weatherImgUrl + imgStr + ".png";
            }

            function getCountryFlagUrl(flagStr){
                return weatherCountryFlagUrl + flagStr.toLowerCase() + ".png";
            }

            function kelvinToDegree(temp){
                return temp - 273.15;
            }

            function getTime(dt){
                return new Date(dt * 1000);
            }

        });
}());
