// Instantiate an angular object for the main app
// Current dependencies: None
var fbApp = angular.module('fbApp',['ngRoute']); 

/**
* Routes for front-end. Invoked via the ng-view attribute in DOM
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
			}).when('/chat', {
				templateUrl : 'chat.html',
				//controller : 'chatController'
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
*  Match Page Controller
*/
fbApp.controller("profilePageController", function($scope,$http) {
	
	// Counter to count the number of times the user clicked on later/meet button, also used as index to traverse profile stack
	$scope.clickLater_count = 0;
	$scope.clickMeet_count = 0;

	// Array to hold meet and later profile stacks
	$scope.profile_meet_stack = [];
	$scope.profile_later_stack = [];
	
 	// This is a mocked up profile stack. In actual operations we'll have to do a AJAX query to repopulate once stack reaches a certain array length
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


	// Initial data binding to DOM elements
	$scope.fb_match_profile_name = $scope.profile_stack.profile[0].profile_name;
	$scope.fb_match_profile_photo = $scope.profile_stack.profile[0].profile_photo;
	$scope.fb_match_profile_title = $scope.profile_stack.profile[0].profile_title;
	$scope.fb_match_profile_tagline = $scope.profile_stack.profile[0].profile_tagline;

	$scope.clickLater = function() {

		// start later_animation
		$($('.profile_carousel')[0]).addClass('later_animation');

		// after the animation is done hide it again
		setTimeout(function() {
			$($('.profile_carousel')[0]).removeClass('later_animation');
			$($('.profile_carousel')[0]).addClass('expand_animation');
			setTimeout(function() {
				$($('.profile_carousel')[0]).removeClass('expand_animation');
			}, 200);
		}, 200);
		
		// two way data binding is updated here 
		$scope.clickLater_count++;
	
		if ( $scope.clickLater_count == $scope.profile_stack.profile.length) {
			$scope.clickLater_count = 0; //reset profile stack to top
		}

		// Filter button comes up after a few swipes
		if ( $scope.clickLater_count > 3 ) {
			$($('.fb_match_profile_filter_button')[0]).removeClass('ng-hide');
		}
		$scope.fb_match_profile_name = $scope.profile_stack.profile[$scope.clickLater_count].profile_name;
		$scope.fb_match_profile_photo = $scope.profile_stack.profile[$scope.clickLater_count].profile_photo;
		$scope.fb_match_profile_title = $scope.profile_stack.profile[$scope.clickLater_count].profile_title;
		$scope.fb_match_profile_tagline = $scope.profile_stack.profile[$scope.clickLater_count].profile_tagline;

	}

	$scope.clickMeet = function() {
		

		// start meet_animation
		$($('.profile_carousel')[0]).addClass('meet_animation');

		// after the animation is done hide it again
		setTimeout(function() {
			$($('.profile_carousel')[0]).removeClass('meet_animation');
			$($('.profile_carousel')[0]).addClass('expand_animation');
			setTimeout(function() {
				$($('.profile_carousel')[0]).removeClass('expand_animation');
			}, 200);
		}, 200);


		$scope.clickMeet_count++;
		
		// two way data binding is updated here
		if ( $scope.clickMeet_count == $scope.profile_stack.profile.length) {
			$scope.clickMeet_count = 0; //reset profile stack to top
		}

		// Filter button comes up after a few swipes
		if ( $scope.clickMeet_count > 3 ) {
			$($('.fb_match_profile_filter_button')[0]).removeClass('ng-hide');
		}
		$scope.fb_match_profile_name = $scope.profile_stack.profile[$scope.clickMeet_count].profile_name;
		$scope.fb_match_profile_photo = $scope.profile_stack.profile[$scope.clickMeet_count].profile_photo;
		$scope.fb_match_profile_title = $scope.profile_stack.profile[$scope.clickMeet_count].profile_title;
		$scope.fb_match_profile_tagline = $scope.profile_stack.profile[$scope.clickMeet_count].profile_tagline;
	

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