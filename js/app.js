// instantiate an angular object for the main app
var fbApp = angular.module('fbApp',['ngAnimate']);

/***
* Nav Bar Controller
***/
fbApp.controller("NavBarController", function($scope,$http) {

	$scope.showManageContacts = function() {
		if ( $($('managecontactdirective')[0]).hasClass('ng-hide') ) {
			$($('managecontactdirective')[0]).removeClass('ng-hide');
		} else {
			$($('managecontactdirective')[0]).addClass('ng-hide');
		}
	}


});
/***
* Card Stack Controller
*/
fbApp.controller("CardStackController", function($scope,$http) {

	$scope.profile_stack = []; // this array will hold the data

	$scope.clickLater = function() {
		alert('click later succeed');
	}

	$scope.clickMeet = function() {
		alert('click meet succeed');
	}
});


/**
* Manage Contact Directive
*/
fbApp.directive('managecontactdirective', function() {
	return {
		restrict: 'E',
		scope: true,
		templateUrl:'templates/manage_contact.html',	
		controller: function($scope,$http) {

		}
	}
});

/***
* Contact Card List Controller
*/
fbApp.controller("ContactCardListController", function($scope,$http) {
	
});