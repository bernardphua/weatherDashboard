(function() {
    angular.module("app.forecast")
        .directive("edgzyForecast", function() {
            return {
                restrict: "AE",
                replace: true,
                scope: {
                    dp: "="
                },
                template: "<div id='container'></div>",
                link: linkFn
            };

            function linkFn(scope, element, attrs) {
                var options = {
                    title: {
                        text: '5 Days Forecast Dashboard'
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            formatter: function() {
                                // return Highcharts.dateFormat('%e %b', this.value);
                                return new Date(this.value).getDate() + " " + Highcharts.dateFormat('%b', this.value);
                            }
                        }
                    },
                    yAxis: [{
                        labels: {
                            format: '{value}°C',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        title: {
                            text: 'Temperature',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        }
                    }, {
                        title: {
                            text: 'Speed',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value} m/s',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        opposite: true
                    }],
                    tooltip: {
                        useHTML: true,
                        shared: true,
                        formatter: function() {
                            var s = '<small>' + new Date(this.x).getDate() + " " + Highcharts.dateFormat('%b', this.x) + '</small><table>';
                            $.each(this.points, function(i, point) {
                                //console.log(point);
                                if (point.y != 0)
                                    s += '<tr><td style="color:' + point.series.color + '">' + point.series.name + ': </td>' +
                                    '<td style="text-align: right"><b>' + point.y + '</b></td></tr>';
                            });
                            return s + '</table>';
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        x: 20,
                        verticalAlign: 'top',
                        y: -15,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                    },
                    series: [{
                        name: 'Speed',
                        type: 'column',
                        yAxis: 1,
                        tooltip: {
                            valueSuffix: ' m/s'
                        },
                        data: []

                    }, {
                        name: 'Temperature',
                        type: 'spline',
                        tooltip: {
                            valueSuffix: '°C'
                        },
                        data: []
                    }]
                };

                scope.$watch('dp', onDPChange);

                function onDPChange(newDP) {
                    if (newDP) {
                        initOptions(newDP);
                        render();
                    }
                }

                function initOptions(dp) {
                    var data;
                    var time = [];
                    var temp = [];
                    var speed = [];
                    var p = 0;

                    for (var i = 0; i < dp.list.length; i++) {
                        data = dp.list[i];

                        if (i == 0 || new Date(data.dt*1000).getDate() != new Date(dp.list[p].dt*1000).getDate()) {
                            time.push(new Date(data.dt * 1000));
                            temp.push(Math.round(data.main.temp - 273.15));
                            speed.push(data.wind.speed);
                            // console.log("Date No: ", i, new Date(data.dt*1000).getDate());
                        }
                        p = i;
                    }

                    options.xAxis.categories = time;
                    options.series[1].data = temp;
                    options.series[0].data = speed;
                }

                function render() {
                    // console.log("Chart Data: ", options);
                    element.highcharts(options);
                }
            }
        });
}());
