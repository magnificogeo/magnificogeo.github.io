// instantiate an angular object for the main app
var fbApp = angular.module('fbApp',['ngAnimate']);

fbApp.controller("CardStackController", function($scope,$http) {

	$scope.profile_stack = [];

	$scope.clickLater = function() {
		alert('click later succeed');
	}

	$scope.clickMeet = function() {
		alert('click meet succeed');
	}
});