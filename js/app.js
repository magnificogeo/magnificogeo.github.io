// Instantiate an angular object for the main app
// Current dependencies: None
var fbApp = angular.module('fbApp',['ngRoute']); 

/**
* Routes
*/

fbApp.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : 'index.html',
				//controller  : 'indexController'
			})
			.when('/match', {
				templateUrl : 'match.html',
				//controller  : 'matchController'
			});
	});


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
fbApp.controller("profilePageController", function($scope,$http) {
	
	
	$scope.clickLater_count = 0;
	
 	
	$scope.profile_stack = {
		profile:[
		{
			profile_name:"George Moh",
			profile_photo:"https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xfp1/t1.0-9/969759_10151538556586451_978416852_n.jpg",
			profile_title:"Software Engineer at Beng Huat Electronics",
			profile_tagline:"Internet Entrepreneur looking for Co-founders."
		},
		{
			profile_name:"Ian Loke",
			profile_title:"Embedded Software Engineer at Toys'Rus",
			profile_photo:"https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-xpf1/t31.0-8/335346_10150433708213305_840705482_o.jpg",
			profile_tagline:"Looking for distributors in SEA region"
		},
		{
			profile_name:"Oh Joo Siong",
			profile_title:"Head of Sales at Joo Seng Pte Ltd",
			profile_photo:"https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xaf1/t1.0-9/403168_10150586693139682_218634990_n.jpg",
			profile_tagline:"Hope to meet PR/Journalists in the tech industry"
		},
		{
			profile_name:"T800",
			profile_title:"Cybernetic Organism",
			profile_photo:"http://upload.wikimedia.org/wikipedia/en/b/b9/Terminator-2-judgement-day.jpg",
			profile_tagline:"Come with me if you want to live"
		},
		{
			profile_name:"Arnold Schwarzenegger",
			profile_title:"7 times Mr Olympia",
			profile_photo:"http://imagopolo.info/img/arnold_schwarzenegger/7.jpeg",
			profile_tagline:"Milk is for babies. when you grow up you have to drink beer."
		}]
	}; // this array will hold the data


	/* Initial binding */
	$scope.fb_match_profile_name = $scope.profile_stack.profile[0].profile_name;
	$scope.fb_match_profile_photo = $scope.profile_stack.profile[0].profile_photo;
	$scope.fb_match_profile_title = $scope.profile_stack.profile[0].profile_title;
	$scope.fb_match_profile_tagline = $scope.profile_stack.profile[0].profile_tagline;

	$scope.clickLater = function() {
		
		/* Two way data binding is updated here */
		$scope.clickLater_count++;
	
		if ( $scope.clickLater_count == $scope.profile_stack.profile.length) {
			$scope.clickLater_count = 0; //reset profile stack to top
		}
		$scope.fb_match_profile_name = $scope.profile_stack.profile[$scope.clickLater_count].profile_name;
		$scope.fb_match_profile_photo = $scope.profile_stack.profile[$scope.clickLater_count].profile_photo;
		$scope.fb_match_profile_title = $scope.profile_stack.profile[$scope.clickLater_count].profile_title;
		$scope.fb_match_profile_tagline = $scope.profile_stack.profile[$scope.clickLater_count].profile_tagline;

	}

	$scope.clickMeet = function() {
		/* Two way data binding is updated here */

		// start animation
		$($('.profile_carousel')[0]).addClass('meet_animation');
		// after the animation is done hide it again
		setTimeout(function() {
			$($('.profile_carousel')[0]).removeClass('meet_animation');
		}, 300);


		$scope.clickLater_count++;
	
		if ( $scope.clickLater_count == $scope.profile_stack.profile.length) {
			$scope.clickLater_count = 0; //reset profile stack to top
		}
		$scope.fb_match_profile_name = $scope.profile_stack.profile[$scope.clickLater_count].profile_name;
		$scope.fb_match_profile_photo = $scope.profile_stack.profile[$scope.clickLater_count].profile_photo;
		$scope.fb_match_profile_title = $scope.profile_stack.profile[$scope.clickLater_count].profile_title;
		$scope.fb_match_profile_tagline = $scope.profile_stack.profile[$scope.clickLater_count].profile_tagline;
	

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