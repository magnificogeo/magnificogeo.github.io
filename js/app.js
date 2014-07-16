// instantiate an angular object for the main app
var fbApp = angular.module('fbApp',[]);

fbApp.controller("CardStackController", function($scope,$http) {

	$scope.profile_stack = [];

	$scope.clickLater = function() {
		alert('lolapalooza!');
	}

	$scope.clickMeet = function() {
		alert('hahaha!');
	}
});