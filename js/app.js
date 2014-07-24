// Instantiate an angular object for the main app
// Current dependencies: None
var fbApp = angular.module('fbApp',[]); 

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
	$scope.openChat = function() {
		//$($('#chatModal')[0]).foundation('reveal', 'open');
		$($('#chatModal')[0]).removeClass('ng-hide');
		$($('managecontactdirective')[0]).removeClass('ng-hide');
	}
});

/***
* Chat modal directive
*/
fbApp.directive("chatmodaldirective", ['chatSession', '$interval', function(chatSession) {
	return {
		restrict: 'E',
		scope: true,
		templateUrl: 'templates/chatmodal.html',
		controller: function($scope,$http,chatSession,$interval) {
			$scope.chatUser = "George",
			$scope.getChatMessages = chatSession.getMessages();
			$scope.messageToSend = "";
			$scope.addMessage = function() {
				chatSession.addMessage($scope.messageToSend);
				$interval(chatSession.getMessages()); // this is used to continously poll for messages
			};

			$scope.closeChat = function() {
				$($('#chatModal')[0]).addClass('ng-hide');
			}

		}
	}
}]);

/***
* Chat Service
***/
fbApp.factory("chatSession", function() {
	var ref = new Firebase("https://vivid-fire-1609.firebaseio.com/")
	return {
	      getMessages: function() {
	        var messages = [];
	        ref.on("child_added", function(snapshot) {
	          messages.push(snapshot.val());
	        });
	        return messages;
	      },
	      addMessage: function(message) {
	        ref.push(message);
	      }
	    }
});