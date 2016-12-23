var services = angular.module('services',[]);
var directives = angular.module('directives', ['services']);
var myApp = angular.module('myApp', ['services','directives','ngRoute','ngSanitize','pasvaz.bindonce','darthwade.loading']);

myApp.config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/data', {
        templateUrl: 'pages/data/data.html',
        controller: 'DataCtrl'
    })
    .when('/table', {
        templateUrl: 'pages/table/table.html',
        controller: 'TableCtrl'
    })
    .when('/charts', {
        templateUrl: 'pages/charts/charts.html',
        controller: 'ChartsCtrl'
    })
    .when('/share', {
        templateUrl: 'pages/share/share.html',
        controller: 'ShareCtrl'
    })
    .otherwise({ redirectTo: '/table' });
}]);


myApp.controller('NavCtrl', ['$scope', function ($scope) {
    $scope.page = 'table';
    $scope.pageSelect = function(page){
        $scope.page = page;
    };
}]);
$(document).ready(function(){
	$(".button-collapse,#my-slider").sideNav();
});
