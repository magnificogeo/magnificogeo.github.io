// Instantiate an angular object for the main app
// Current dependencies: None
var fbApp = angular.module('fbApp',['ngRoute']); 

/**
* Routes for front-end. Invoked via the ng-view attribute in DOM
*/

fbApp.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : 'splash.html'
			})
			.when('/event', {
				templateUrl : 'event.html'
			})
			.when('/match', {
				templateUrl : 'match.html'
			})
			.when('/chat', {
				templateUrl : 'chat.html'
			})
			.otherwise({
		        redirectTo: '/'
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

	$scope.clickAll_count = 0;

	// Array to hold meet and later profile stacks
	$scope.profile_meet_stack = [];
	$scope.profile_later_stack = [];
	
 	// This is a mocked up profile stack. In actual operations we'll have to do a AJAX query to repopulate once stack reaches a certain array length
	$scope.profile_stack = {
		profile:[
		{
			profile_name:"George Moh",
			profile_photo:"https://media.licdn.com/mpr/mpr/shrink_200_200/p/3/005/013/274/0d24646.jpg",
			profile_title:"Software Engineer at Liquor.com",
			profile_tagline:"Internet Entrepreneur looking for Co-founders."
		},
		{
			profile_name:"Ian Loke",
			profile_title:"Embedded Software Engineer at CSIT",
			profile_photo:"https://media.licdn.com/mpr/mpr/shrink_200_200/p/3/000/221/303/1ec2ec4.jpg",
			profile_tagline:"Looking for distributors in SEA region"
		},
		{
			profile_name:"Oh Joo Siong",
			profile_title:"Head of Sales at Innova Technologies",
			profile_photo:"https://media.licdn.com/mpr/mpr/shrink_200_200/p/2/000/221/367/27186e4.jpg",
			profile_tagline:"Hope to meet PR/Journalists in the tech industry"
		},
		{
		  profile_tagline: "Business Developer in the health and medical sector", 
		  profile_name: "Juulia Tarma", 
		  profile_title: "On sabbatical", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_5KCgs7Ky1_ucg9sCbcrmsDA20GRUl9sCF-nGsD8uhFfwmtSGdntlqSqCAuUk-AUmkP8_vEYWhirV"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Mok Oh", 
		  profile_title: "CEO at Moju Labs", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_pl4feBvfz7zfP37wYcsrezv1Bf6Sx3OwOz2Kez61eW-g85dIKBHi6vtjMGQtp60bjtVAbtqA6ufP"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Alex Green", 
		  profile_title: "Entrepreneur | Senior Video game Executive | Volunteer Scuba Diver", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_vJv4JC1nSQ0rDRoCBZNIJhCFD5RASYVCcUTbJ3A9-Qf3tVDGJ05qBT54iDUaaMRmNVB69Q73az8G"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Oren Bennett", 
		  profile_title: "Developer Relations at Appington", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_utI7LyFiNHQktLxqa12pL0B8q7rwYQxqG90rL0XjIEXsTGeNhNR_wxK1V3KvjTY4SldloZnzb1mL"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Risto Haukioja", 
		  profile_title: "CEO, Founder at Appington", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_RNyrI5XpJwxfY_JIJnO_IFbgMIwit_dIJre7I6qTQSx1SFOwBtup5Q87B6IpAkHFVBYaXTo4x-S-"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Ville Kurki", 
		  profile_title: "Chief Operating Officer at Idean", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_-zC9rqlOfAKCPpL0KrP5rntg7-CtlVL0rBnWrBAuKAnCmY-xY1tVYc5CTsGS-jX1198H0rimTLzS"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Barrett Cohn", 
		  profile_title: "Co-Founder & Managing Director at Battery East Group, LLC", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_yrLwHnN0fmTyyMgop1v4Hzimif5DpMpoYtAqHzLxpolpijIEr9zbQvllDTL1xYj6g1FvFtR5vPTL"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "Chris Doell", 
		  profile_title: "Vice President, Customer Success at OpenDNS", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_V5_s-XEx2tRmnOvyZTtd-bEf21a394qyZFBL-QR71vVAdyipn_Pny67TGOmOv0zKRQTkj351IvNx"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Jennifer Wong", 
		  profile_title: "Personal Banker at UOB", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_e0hbvSk9hGRL_O2PoVCZvaBJ850d342Po4q4vakwx8IJOyR1XJrwRmr5mIx9C0DxWpGMsWnYfZyQ"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "Eric Koh", 
		  profile_title: "Program Director | NUS Overseas Colleges", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_2bYEOyZpWrTFBW-hmhaJO0M-5nvbv2-haLEzO0VisvTBEeL88TmQKxmDwOzZ9I12DkyNAZe_xKuk"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Andy Bromberg", 
		  profile_title: "Student & Entrepreneur", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_fl6WHRk2_2hH0Rxo79n9HZ_aTfLI0ZxoSn-9HZ5OYoAVhpeE_B95Q4Ar7T5zyxY6atXBF0RcqMNB"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Nickesh Viswanathan", 
		  profile_title: "Sales and Business Development Representative", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_Lw2NlIOHwn4JLmnpwD0IlWmBINf9LeFpbE4IlexHq-R6V2ryWSpZ0HI6LM7dQ76rXeaEYfDj12XH"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Eric Jones", 
		  profile_title: "Marketing Partner at North Bridge Venture Partners", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_DBwsjZXGoK-WxHkDDte5jVBCoAbk0wNDfzxLjVvYzqPvhf_STlUnPs3KXxFsyuv32NWk-gIYO5aO"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "Jasmine Ho", 
		  profile_title: "Marketing Mobster at Love With Food", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_OurBLBwNmE92b4U4KW3XLzRnuW8fFOo4KHXHLqEbPuNO4sjZtEhUwNOWCFhAkJIq07-WoPZX2e9g"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Justin Altman", 
		  profile_title: "Internal Technology Resident at Google", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_jbmxXtUYq75CBLMng3ShXrVP4u-_vQMn0ishXrMfFo6PEGm9lTYPEKD39Tty9TZspkuTIBFFTkBh"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "Amir Michael", 
		  profile_title: "Founder at Coolan", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_xrBNYr9T3c8uOY6T0BcbYtBDDznSyjbTjt_IYtQt-PCg_MK319bZr--yi49t0VQSY1vElzqyb1BN"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Sean Choi", 
		  profile_title: "Software Engineer at LinkedIn", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_fDcXEpoI8o8weyyXSwqUEY7oCHnIeyuXDoiUEYWcgDCVB4Uk_IFHXOjJuQ9zIUSHaazV5JRUNl55"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "ANG Jin Hui (\u6d2a\u8fdb\u8f89)", 
		  profile_title: "Associate at Microsoft and Lee Kuan Yew Scholar", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_fl6WHRLDTmhXgRaoSvQ9HMX_TfLI0ZxoDn-9HZ5OYoAVhpeE_B95Q4Ar7T5zyxY6atXBF0UqrqnB"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Nitzan Wilnai", 
		  profile_title: "Founder at Engineous Games Inc.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_tlYgplrPRcTyP_Q_-rMmp-htJ-zxPhn_r1EGp-_i6c37ukTiOBmlttcDcyv8rFB7Pty_1vlYvKo2"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "Hersey Liu", 
		  profile_title: "Data Analyst | Business Strategist | Entrepreneur", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_wM8zE7NMGe7HhyJkIOl6E2QMawU58JekWRNEE2cHAm7NxgxXFxKJXu_6hLRUiOWeEsCI5wWQs3Sx"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "Rajesh Panicker", 
		  profile_title: "Lecturer at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_vJv4JCAnSbDTfjoCzYzIJ3toD_RrSYVCRgTbJ3A9-Qf3tVDGJ05qBT54iDUaaMRmNVB69QiDTQcG"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Rachel Ng", 
		  profile_title: "Product Marketing & Business Development at Ensuant Inc.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_5fq3Tojbr0I9IlAVF7FtTexkKZfRwl3VIwhYTeDn7ORINz9sddXDfHMZYv7XHnh9k290mf0J8KpT"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "Nick Evans", 
		  profile_title: "Co-founder and CEO at Tile", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_mv6Vd4XTuurIYgHeulQddscC27FXy4Meut-5dUNO1E1z_ymHGP99bRhrG3bV00Zk7nXX6pE8gcP1"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "John Kenevey", 
		  profile_title: "Group Program Manager at Facebook", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_Z3_74XI-P6VDqNau9LAK4bZYl8e7qNxuV_Br4bW2m6yxIre2qFP_nFjGxSHKBPY8MGTlchcJhjXf"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Andrew Holt", 
		  profile_title: "VP of Product at Pixate, Inc.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_5P24io_pIyO4tIB4b-jwietaIpuRKe94bc4bie3aqsZI723ZdvpqSHvhLA2X17cqkKa62f0Vg9hP"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Swetha Gopalakrishnan", 
		  profile_title: "UX Designer/Software Engineer at Bumbox Logistics", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_hW3LF0pBGHqcEJfcCHrnFy0NGDlcQsmcCIzsFyjeja5FMOMBu7AdWpWQ25AHLg7R3EiRHRihWKRw"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "Alex Yao", 
		  profile_title: "Entrepreneur & Front-end Developer", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_SEVdfpHHwyA6WDPXDoJnfYZ6bp9LIm-X7SanfxsBZJGqqoLk3uoLT0aMWtnReW1HuW4ch4eOI9lF"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "Ngoc Trung Nguyen", 
		  profile_title: "Software Developer at Dealflicks", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_IP83M2Nx1i7W-9p_In_tM7N016MHKvS_dANYM7ka2iSJ7AsibvKDcfrhjeJ91tu7oKC0nHsZB1sI"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Gaurav Namit", 
		  profile_title: "Co-Founder at Nokbox", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_R84qRCZKWLO0Bms3J3ebRhEDICU7UDE3JT2wRhdKqT7xkWgTBQH4v8gYLoRK4owDV_VoqbRTwe4F"
		 }, 
		 {
		  profile_tagline: "Deep interest in big data", 
		  profile_name: "Alison Kline", 
		  profile_title: "Client Engagement Manager at Appington", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_fjdmjpvI9liVGL8TTJwljYFHNtnoaLATSpjAjY5VwqCVAT63_RJCPOAqsx9zSGrSaOIK-JUCf-as"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "William Cheung", 
		  profile_title: "Co-Founder at Nokori Inc.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0__NWrbZ98ZHXzOXes_nIfbVTDVeC9OXds3vg7bRlpLSnF38OVftMpdUL-q6GHgiHnCBwaey7A0QA0"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Edmund Cai", 
		  profile_title: "QA Engineer at Loop Commerce, NatSteel Scholar, Undergraduate at National University of Singapore (NUS)", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_GNQk2J3mCVAMOJKdCz5B2UG3CUkvYJ3durtR2UlggYKkTg9WmtneCRLPuzXwjOhLiBksipfYRozu"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Wen Qin Lee", 
		  profile_title: "Freelancer, programmer, web developer, photographer", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_B1FpR_hCxLxaAvJ3vchfR3KTxCUxj9J3v-1_Rh3j8b7mGtaTRzcrv8v1l2RTYA4DnrLGqb13oG3e"
		 }, 
		 {
		  profile_tagline: "Entrepreneur with disruptive technology", 
		  profile_name: "Bo Liu", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_CHQ4YJ0ImrAvLsbDC75IYsj6mKFzdJ9D2utbYUO4l91L9g3SaanqrRE98gboEOc3_Ik6lpuAltk_"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "George Moh", 
		  profile_title: "Aspiring Entrepreneur", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_mLnj-OIhx9LdMPBKu3Xm-gd30KtXRPBK2XCC-gZlhvQzXc8rGiQAyj2xAO-VZNny76NijVE8epiE"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Lucas Artusi", 
		  profile_title: "Product Designer at IDEO", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_xxsvAN8qXzchufkjA4oQA9nWHN32ufLjARmoAcFqclzjPw-g1MEMxBPV6VT-fHXAYyZwOKM48vOu"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Joel Ding", 
		  profile_title: "Marketing & Technology", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_0-CI4P50i6C21M28xP5Z4Aq7iiNuPVg8gKnN4AXfp58yuYEhPqtFnlK3DaqPrjyuOA8zcn9ikm6T"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Asha Ashok", 
		  profile_title: "Product Engineer at Micron Technology", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_Pk_hAcsOtnFpq-tglQ1PAvpArt8AqqigA5BxANg2flN3IKqj0CP2xqdGOVhaB1GltbTOO1fUlW7B"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Nicholas Teo", 
		  profile_title: "Frontend Developer Intern at 2359 Media", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_TLYPQpyjVozsBQJq_CauQY2t4wrNB8dqibE2Qxj8FDXkeXONDimxH0Wm9QKwqbH486ySW4fTpMmO"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Ishmam Ahmad", 
		  profile_title: "Electrical Engineer | Embedded Designing (Software and Hardware) | Passionate about Mobile App and Web Development", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_UBEYuFz3Njg70icHRrVSu5BmZgoi0LcHJKY3u59ObZO-hTheclstGLCrn1EjyG9XsNe8_GHGxo7b"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Seliyan Silvarajoo", 
		  profile_title: "Intern at MasterCard", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_GNQk2JGj8jrBOyAdhnhR2UhjCgkNYJ3dhPtR2UlggYKkTg9WmtneCRLPuzXwjOhLiBksip7gOlcu"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Justin Legakis", 
		  profile_title: "Co-founder & CTO at Moju Labs", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_xjj5WtbFkEQ3GdaLgOOVWrczXoNSCu7LjxdVWA6FRu8ggHZ51RDWFltdoFqt3wmdYO0UQnN1pfms"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Roger Binns", 
		  profile_title: "Networked software and mobile tech generalist", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_tlYgplirJ9tOP_Q_rcSmp-_1J-zxPhn_r1EGp-_i6c37ukTiOBmlttcDcyv8rFB7Pty_1vAXII42"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Daryl Lim", 
		  profile_title: "Chemical Engineering Graduate from University of Toronto", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_fDcXEjaEGmiQoyuXfavBEYMQCHnIeyuXS2iUEYWcgDCVB4Uk_IFHXOjJuQ9zIUSHaazV5JRq2kr5"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Scott Harvey", 
		  profile_title: "Automation Specialist at Cimation", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_k14DPHXm9-dz0Gh06vstPE_mnrmJgTl06-2tPwCKWzsdCLQxHzH3jI9YZYa6OQK15rV1y2yZ0Pro"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Joo Siong Oh", 
		  profile_title: "Head of Business Development at PROTAG", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_oLg_hd4PcYpbBk1JHkmKhEsjBOaFc3iJebWphER3ejVcH5qMQiS7mo7fMnm4N6GzI6xgfDdVzjF4"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Gerald J.Z. Yeo", 
		  profile_title: "Developer at Pear Comms", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_9G8uJTmpPLu0J9OGNkl1JGulP_VjzvOGq8N1JiSauLaDoAdCsXK8B_JhgmsGnt0ac3Ct9k1nLJDx"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Masahiro Mizuno", 
		  profile_title: "at", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_uBxCSgkgzJhol3862rJjS0B1cRv6PC36aKwjS0v_HOT9u69Qhl7mix3SJvzJr5hoSNgyCZb619kg"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Javier Chew", 
		  profile_title: "Final Year Student at Nanyang Technological University", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_GNQk2JTSCV8ZOs3d8l9R2UrDCUkvYJ3d8vtR2UlggYKkTg9WmtneCRLPuzXwjOhLiBksipfBhuFu"
		 }, 
		 {
		  profile_tagline: "Deep interest in big data", 
		  profile_name: "supriti Gupta", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_V5_s-XZYmAoDnU5y4Ttd-QR02Kah94qyZkBL-QR71vVAdyipn_Pny67TGOmOv0zKRQTkj3dXAsix"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "Chih-Po Wen", 
		  profile_title: "CTO at Glint", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_UQF0ZCW7y3mDUzM3MFvuZ3ZSO8UGRn43Jb18Zhsj357-X-fTc8c198a1raRjZlJDs5L3BbHJjRvR"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Li Chen Elsie", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_in1UQZtjDIzRAVRZ3NleQVAlfa3clxsZS-FXQR1hrIz6mRS47KiBHUba38Td-ZUNGvA5Wy3NrE1Z"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Steven Sun", 
		  profile_title: "Founder,CEO at Goodo,Inc.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_ljrrcP_crXXPhqdA0J87cAAMpFlOC-dAPxX7crhbiT5agnOljRhpMKNW-oA33zHjKO-a4BYjydOo"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Sabrina Brown", 
		  profile_title: "Executive Assistant to Carmichael Roberts at North Bridge Venture Partners", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_T8jL9RS0H59ecf0x3_O99Mx0XX_4cumx_Gds9Mu3RCBHHHM0DQDdZJ4fodiFNw7P8_0RJOtocuZ3"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Eunice Yeap", 
		  profile_title: "Learning Enthusiast at NUS", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_9-Hjc8i3ZXMAxXEl99fCcGr_s3ppxbRlqzpCciT05XHD8i2Asq4AM_zAN7yGp8VgcAoi4k0E6IMD"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Shuling Chen", 
		  profile_title: "Biomedical Sciences Undergraduate at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_8D2tXJdqRDzqXCUshEy3Xsa9RdGVkkwsCW4DXs7wX79oUhyV2IpYEVR5zXCLF_EnTaauIjgGAR2p"
		 }, 
		 {
		  profile_tagline: "Global distributors for green tech products", 
		  profile_name: "Zhe Jin", 
		  profile_title: "Engineer at Newzstand", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0__by8vYspB8nFz_71TCSxvjOPv6tnz_a1Die0vjpGEiQboFJPfTuuRge2Ue-enkf0CkYYssm58kXS"
		 }, 
		 {
		  profile_tagline: "Investor looking to for startups to fund", 
		  profile_name: "Ke Jun Wang", 
		  profile_title: "Highly versatile finance expert with an enthusiastic passion for wealth management", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_UZgaG6AqRYV-CkhVUUujGkzqc07CC3rVJxWlG5BFHVUtg5FscYSGuLidJlfg36A9sUxrDGWARTt8"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Alex Liew", 
		  profile_title: "Student", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_9r8JGiFt2VUpyJ5nq1TEGTimasOgKJqnqcNQG88aAMoS7gi9s9Kzuhqhh-YC1Ozsc1CFDF-hjH6w"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Chris Gruenwald", 
		  profile_title: "Business Operations Analyst at Tesla Motors", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_zdfeR_p4QG0jwEu3z7aUR3DnkFRKbdj3caRcR3YoUXf8ZSoTMf0kvToXE7U7XapDqoDnqQuFUgMg"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "Jason Yu", 
		  profile_title: "Software Developer Intern at Appsverse Inc", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_CHQ4Y4uIaNtvI0BD82hwYUx5mzFzdJ9D8ftbYUO4l91L9g3SaanqrRE98gboEOc3_Ik6lpuyeJt_"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Benjamin Kong", 
		  profile_title: "at IRAS", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_W1fpi26-Us4XA6qqIcHiim6PMpyIl5vqIqR_imF2QseRm3CNLz0rSaPGBApq-CN4erDG2dMJBz02"
		 }, 
		 {
		  profile_tagline: "Investor looking to for startups to fund", 
		  profile_name: "Bang Hui Lim", 
		  profile_title: "Intern at EasilyDo", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_sNXFMbk7GQjCygS74lLqMX5y8hW8OUS7qrrZMLqyxigK30sf9tqIc58tmedxgyu_UB6JnCQaAx2r"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Song Wei Hern", 
		  profile_title: "Final Year Undergraduate at Nanyang Business School", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_pl4fen8uBWPuxkOwt9sKez8hBu6Sx3OwY12Kez61eW-g85dIKBHi6vtjMGQtp60bjtVAbtNfmsmP"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Weichong Yap", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_2bYEOyZyFP6FM2Ph2_7JOOWP5KvQv2-haQEzO0VisvTBEeL88TmQKxmDwOzZ9I12DkyNAZHSAsek"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Yang XU", 
		  profile_title: "ExxonMobil", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_UBEYu6LhZR77gLFHRrHDukvCZUoG0LcHMKY3u59ObZO-hTheclstGLCrn1EjyG9XsNe8_GHQkRSb"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Han Wei Quek", 
		  profile_title: "Production Editor", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_e0hbvucsuXZWTgpPERKqvfNs850H342P6Uq4vakwx8IJOyR1XJrwRmr5mIx9C0DxWpGMsWVeasmQ"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Michael Yue", 
		  profile_title: "Software Engineer (Intern) at Victrio", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_-RFTK-AWAti-m9KtrgBOKlGw1qA1m98tKV1OKlrR2ALGltB-YjcSOAkzjslDDATY14Lxx9aXLmpG"
		 }, 
		 {
		  profile_tagline: "Global distributors for green tech products", 
		  profile_name: "Andrew Ho", 
		  profile_title: "Realtor at PropNex Realty Pte Ltd", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_oCf8SdMrzsud9hCEHi7PSEWyvjHIq5CEehR0SEw2EOpRI3voQk0uio0GUveqBC_QITDYCDv1Zm-m"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Huang Yongchang", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_O-y3pn9YJcl3A637KvgYpq6tzBL71_37pKeYpqbGotAY2F9ftquDtN12RJ5lKkh_0AY01Pvcgm2E"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Spencer Nai", 
		  profile_title: "Sales Executive at Leeden Limited", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_M5umgF4An-Sani32MGOjg5exNAdhnLA2c3ZAgkRawqjAWT6uz_yC1X7hsxWOzGrhZQmKtiWgzjsJ"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Aaron Leow", 
		  profile_title: "Chief Investment Officer", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_N-oHBQAhbTZ-0eDpqNdBBXh7FCfO0eypVnOBBXGO4bRfh2wy4qVXJknrd27hy7grvAH9Z_p3-dPy"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "chew barry", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0__gnH4ZhqG53c70SuiYbR4RGqCikUf0pu3sCB4Rhqg6KwrUI2fUQXnUNVuSXku4j8CYN9cyOP0nZX"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Sebestian Ng", 
		  profile_title: "Chief Fitness Specialist at SAF", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_mB1VmUX1SVzH1Mvwurq5mJqt7JQ5Pxvw2zF5m4v_KVtvuRCIGli9hZ3STl6srZNb7NAXTxIvKtPO"
		 }, 
		 {
		  profile_tagline: "Entrepreneur with disruptive technology", 
		  profile_name: "NOEL PANG", 
		  profile_title: "Student at Nanyang Technological University", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_UZgaGFN4BjwCC3rVJgmlG5Aqcy7CC3rVJxWlG5BFHVUtg5FscYSGuLidJlfg36A9sUxrDGL4d7C8"
		 }, 
		 {
		  profile_tagline: "Deep interest in big data", 
		  profile_name: "Wayne Tan", 
		  profile_title: "Student at Nanyang Technological University", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_FEYCEmyQ9IDnF8jk5egAE2JcNwUNb8DkLSEjE20Qwm75ZXVXwummXuwesLREXb2e6Wyy5wDcjkeG"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Jinshun Lim", 
		  profile_title: "Intern at GetQuik", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_-zC9rz1lDPL-Apz0rNPWrnGx7-CtlVL0KqnWrBAuKAnCmY-xY1tVYc5CTsGS-jX1198H0r7hMQ8S"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Jun Jie Pang", 
		  profile_title: "Software Engineer", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_N0TLAXtU_l4p3jCjNMtVAb8UTcDO3RCj94vsAbCIY-JfOxvg4JldxF9L7MShCp_Avp_ROhyItMKY"
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
		},
		{
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Pete Hanson", 
		  profile_title: "Owner, Up and Running Software, Inc.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_r9mLMn9KXi9AKfx7rKSnMq8xX65lrEa7tcssMzKfRilTfaJfyrYdcvX3oeLmPSf_AzuRntmjTrtl"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Heidi Roizen", 
		  profile_title: "Corporate Director, Venture Capitalist, Educator", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0__NWrbZPuVuvJYGesi-E7bRl2VeCcOXds3vg7bRlpLSnF38OVftMpdUL-q6GHgiHnCBwaey77SkF0"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Tom Kosnik", 
		  profile_title: "Are you interested in collaborating across the triple chasms of generation, gender and culture?", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_Lw2NlomcdlWJFmcp5W0FleMMIAf9LeFpFu4IlexHq-R6V2ryWSpZ0HI6LM7dQ76rXeaEYfDTi36H"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Matthew Fonda", 
		  profile_title: "Head of Talent & Culture at Hall", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_tK6jMqCgyLA7j-UfrvLGMnt2y_kxjqUfKq-CMBig_LK7GKu7On9AccBPtmX8Y1siPPXinrlAGjtr"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "Kit Codik", 
		  profile_title: "CEO / Co-Founder of Liquor.com", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_OPQTE-kCAm5TYPykpBhYEl871Hc7yvukpNtOElFO2DiY_AUXtvnSXAPrjQBl0tSe0Kkx59z4wDAX"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Tai Hou Tng", 
		  profile_title: "Vice President, Technology Development (Media, Security, Analytics) at Exploit Technologies Pte Ltd", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_goVSNvELs_thETgjxwE-N9ydniTiEGpj1ma-N9sqW6v-vQIgA2oTVnaVZS3jdLjAyd4PUlH9NMed"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Hillary Gomez", 
		  profile_title: "Entrepreneur, partner, Private equity, property development, Software", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_ukJ16Od7ZmvnVLdza8xh6yo24w-b4ieza5Du6y4rFm6nFbxvhCd0epuO9LtMUXWJSbRDdRobHoID"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Ash Narain", 
		  profile_title: "Founder & CEO - BankerBay", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_vtozjCFCWqx1ymz3B-sQj3CmwARjYek3cvOEj3TgN-fDT2PTJNVJPTzP5MUGj75DNlHI-Q0kvPQy"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Henry Ho", 
		  profile_title: "Chairman & General Director at Startup Bootcamp Asia", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_4dB69TZE8_siIOfPsILJ9GjwhX0_IgfPVa_M9GRc03ItqJ41NfboZC7JaExgesaxJov4J5dgPUZp"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Scott Kritz", 
		  profile_title: "Executive Vice President, Audience Development at Liquor.com", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_OEI5XzWk6DzCIu7sODo9XByQXdCiIE7sKa0VXBsRR2n-qaZVtuRWEcazobGjeSmn0WdUIrertXgS"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "Ryan Ho", 
		  profile_title: "Founder at Yae Collection", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_y9lKkKnPpoka-B4B-1tik1L1pEr3KlHB-t5fk1zCi7Xr7z0crrTyoPTu-XK01ndUgzPmwNISXiBt"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Darius Cheung", 
		  profile_title: "Founder & CEO at 99.co", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_XUxLRdTJbLpVTemD6pYVRw_qbFIz_mmD6swsRwr5ZG0XyoMSeg7dvIkwWWwIhW73LZgRq2aNAPEj"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Kristal Sellamuttu", 
		  profile_title: "GAMES. TECHNOLOGY. CHANGING THE FACE OF HISTORY.(ksellamuttu@machinezone.com)", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_ncgMlbA1IlHhKeLpNlmQlLPjwA7rtDzpqrW6lLP3NBUhSWGyVASv05Ff5pffAoqrBqxbYCToTkSP"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Sean Wycliffe", 
		  profile_title: "Co-founder at Dealflicks, President at Project Pueblo", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_in1UQZ3rSWLBPpIZTt-eQV-1fS39lxsZTBFXQR1hrIz6mRS47KiBHUba38Td-ZUNGvA5WySS8GAZ"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Siti Amirah Sumardi Sidi", 
		  profile_title: "President and Founder,       E-mage Marketing", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_-ev3kqjHKmXKHlpRraLtkBpEKE3PH-SRrWTYkBg977zCcnsUYm5Docd4YXTSwzuc1wB0wrfkckCq"
		 }, 
		 {
		  profile_tagline: "Investor looking to for startups to fund", 
		  profile_name: "Minh Nguyen Phan", 
		  profile_title: "Technical Manager at 3M", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_V5_s-LE1uNohqOvy4bCW-bsP21a394qyZFBL-QR71vVAdyipn_Pny67TGOmOv0zKRQTkj35NT2Fx"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Kym McNicholas", 
		  profile_title: "Emmy Award-Winning TV Personality", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_bIomhmfdRpUqkF8zLfIghDS6cgOzekAz5WOAh2pUHZoXBh6vIDVCmuevJ1YII_rJQHHKfwm-xAfm"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "Oren Bennett", 
		  profile_title: "Developer Relations at Appington", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_utI7LyFiNHQktLxqa12pL0B8q7rwYQxqG90rL0XjIEXsTGeNhNR_wxK1V3KvjTY4SldloZnzb1mL"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Keith Ng (@keizng)", 
		  profile_title: "Co-founder & Hustle Ninja at Gametize", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_3rnHNj8a8h6ZK0glTl9cNx1mCirZy0pliACBNxi-g6XW_UIAS9QXV0BpuSKQ04jgh1N9U4g_NbPa"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Una Softic", 
		  profile_title: "Chief Global Manager at anydooR Inc", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_uXLP60OfymTbMnZza3vu6gMGOH-bMzdzaQA26y4x3D6nQlOvhGzxepulrQtMV-HJSFFSdREpUnr9"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "Lynda Smith", 
		  profile_title: "CMO at Twilio, Inc.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_2AaKEs8tV2iXKTdHCBu_EJ62Vw6w-beHmPVfEJ6uLm-UDixe8cOyXMtCqLQNl8WXD-2m5Y4vgrVq"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "Zhijian Guo", 
		  profile_title: "Looking for finance related internships, starting immediately", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_dCvykod7pWeEZBMUwLkikWw2puuw4-4UI_TikeHriWZsFnfR5k5KoHyO-G2vUzJBHTBCwf9sWvHN"
		 }, 
		 {
		  profile_tagline: "Deep interest in big data", 
		  profile_name: "Rodrick Ang", 
		  profile_title: "CEO at SaaVee Inc", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_hTReAOpCQ-9cJuKA8hgUAygikclUJuAAGifcAy2tUq5w6H6lubIkxpZyExAkswrj3CJnORY-NnKM"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Yiping Goh", 
		  profile_title: "CEO of AllDealsAsia.com", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_k14DPHX_qBMU0bT0QtYOPwKunrmJgTl06l2tPwCKWzsdCLQxHzH3jI9YZYa6OQK15rV1y2KvR7ho"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Giovanni Carreri", 
		  profile_title: "Junior Trading Manager at Eurotrading Asia", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_hC1YLg2gYuiM4KUqCL_DL0wAY7rRq1UqG6F3L0ShTdXIIBuNukitwxJaKCKXBqs43TA8oZ108TO9"
		 }, 
		 {
		  profile_tagline: "Deep interest in big data", 
		  profile_name: "Phillip Cohen", 
		  profile_title: "Learning Innovation Specialist at ASAP (After School Action Plan)", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_xjj5Wt3Z6STGCfaLjsgVWAnzXWNSCu7LjpdVWA6FRu8ggHZ51RDWFltdoFqt3wmdYO0UQnNxSWDs"
		 }, 
		 {
		  profile_tagline: "Business Developer in the health and medical sector", 
		  profile_name: "Ajay Gopal", 
		  profile_title: "Account Manager at Loop Commerce", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_Dr__gVbygBBMKcC27qCygMC1lt5WrNi27tBpgML7mllMfrquT9P71JlTxVLnPPGh21TgtOUFTdq6"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Jessica Smith", 
		  profile_title: "VP Client Relations at AngelHack", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_6H28ifVJNUMsLTPNXDD0iu2M9Vg9LXGNkE40iugHd0WFV8zqEapuS2d64NjHQiiZFIaY2Iiqz0WI"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "Himawan Gunadhi", 
		  profile_title: "Founder & CEO at Sankia, Inc.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_ncgMlbGAd-ppKINp9zmElXGlwt7rtDzpq9W6lLP3NBUhSWGyVASv05Ff5pffAoqrBqxbYCDpg5MP"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Jay Zalowitz", 
		  profile_title: "Technical Co-Founder at Generator Lab", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_vrCZ-h3YacZApJbrvqTw-C-Km10grsBrctnF-C8flvISfO8KJ9tNyGq38OxCPgnpN18QjLY4HHVt"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Kyra Davis", 
		  profile_title: "Entrepreneurship Center at UCSF", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_HAcsUdFi_8fdyVduQzqLUEvT73edYpZuo9iLUw6AKXy4TZ72kcFnzIt0T7HcjRM8d-zkN24VHNhX"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Jun Huh", 
		  profile_title: "Founder & CEO at Zitzifly", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_8GEYKgfTsccNM8c-CkVDK07_ZlrUJLc-C8Y3K0aObNXE6Tht2XstOxsrn0K5sG9OT3e8xZr4bAp1"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Jacky Yap", 
		  profile_title: "Business Development, Content Strategist", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_gxkFOr3HiclGuxThjOGZOPkMizvm2VTh0jKZOPFJpPTY1Yn8AMNIK1PcD4zl7j82yyQJAqJkgCOU"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "Mohamed Hussain", 
		  profile_title: "In transit.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_U-ft055tNBYT186mRvWD06TtZ9w7PLbmMzRD06b7b1xYuTKacq0YlQ1TnZIlrGQCsADurTzYI-16"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Alex Ung", 
		  profile_title: "Student at Dev Bootcamp", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_bIomh7ykRYWNe33zFdIlhD7wcgOzekAzLoOAh2pUHZoXBh6vIDVCmuevJ1YII_rJQHHKfwm6FiJm"
		 }, 
		 {
		  profile_tagline: "Global distributors for green tech products", 
		  profile_name: "Kevin Alicbusan", 
		  profile_title: "HR | Business Development at HackerX", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_FfbQYoe6CNgvdgPSLIzvYWYEhno4IUGSLHPJYWmR0POdq0zDwdBErdVza4E6eyiT625ZlapUNIoR"
		 }, 
		 {
		  profile_tagline: "Business Developer in the health and medical sector", 
		  profile_name: "Nina Levchuk", 
		  profile_title: "Account Manager at Google", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_OMZdSnzvkgA_2EioysH9SqnvXRLC2utoyZunSqczR4At1H5EtxeLiN_RoP5g7wP60sscCPd3HWfz"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Emily Lee", 
		  profile_title: "Global Community Manager at HackerX", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_Lw2NlIgMdzMqdIQp5DjwlWpeINf9LeFpbd4IlexHq-R6V2ryWSpZ0HI6LM7dQ76rXeaEYfSHRGhH"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Alexis Doctolero", 
		  profile_title: "Director of Trade and Activation at Liquor.com", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_R84qRCshWQDhMmI3U6dbRhf8ICU7UDE3JG2wRhdKqT7xkWgTBQH4v8gYLoRK4owDV_VoqbUFdFVF"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Victor Tan", 
		  profile_title: "International Business Development and Strategist", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_DjKFeMQ4_WzbGVpISO-qeRQ4idbWCxSIfMkZeV5bp7PMgRswTR8I6sAWDXFn3ZuF2OtJbgctFT8W"
		 }, 
		 {
		  profile_tagline: "Entrepreneur with disruptive technology", 
		  profile_name: "Clarence Sundram", 
		  profile_title: "HSSE Manager, Global Ocean Shield Pte Ltd", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_ljrrcPTnpG5xClZAP4tfcAPRpFlOC-dAPMX7crhbiT5agnOljRhpMKNW-oA33zHjKO-a4Btc5Zpo"
		 }, 
		 {
		  profile_tagline: "Entrepreneur with disruptive technology", 
		  profile_name: "Jennifer Chou", 
		  profile_title: "Attorney Recruiting Assistant at Wilson Sonsini Goodrich & Rosati", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_2bYEOyJpLAlBc7_hu6pMO0wt5KvQv2-haQEzO0VisvTBEeL88TmQKxmDwOzZ9I12DkyNAZXEWpZk"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "Shane Yin", 
		  profile_title: "CEO and Cofounder at ARTISANARY", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_e0hbvSvvGisk3g2PoVK4vaFR8_0d342PEgq4vakwx8IJOyR1XJrwRmr5mIx9C0DxWpGMsWV86a0Q"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Ajay Virkar", 
		  profile_title: "Co-Founder and CTO at C3Nano Inc.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_mv6VdJBT2utHKUHe2zF5dUt727FLy4Me2t-5dUNO1E1z_ymHGP99bRhrG3bV00Zk7nXX6poY0Kh1"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "Dexin Zhao", 
		  profile_title: "Managing Partner at Imperio Trading | Chief Activist at Slingprint.com", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_DjKFeM6BioqWhxpI7OlNeViviEbWCxSI7VkZeV5bp7PMgRswTR8I6sAWDXFn3ZuF2OtJbgB6GtKW"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Adam Breckler", 
		  profile_title: "Internet Professional", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_2weeFgWWXuc55EjBmoVBF0oXkmrbWEjBafycF0VJUHXBnaoc8SZkWxmcE_KZoSpUDeEnHZHAhX78"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Lorraine Bower", 
		  profile_title: "Intern at Consulate General of Ireland, San Francisco", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_tm_nI-HUmS3xXgZFKa8LIlHV2Dc0X4eFKWBdIlao1aifRyxbOePs5AsXG5Bhb0WIPSTeX9ysMl9Y"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Angad Singh", 
		  profile_title: "Software Engineer at Twitter", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_A8PuXPy8reBtvq7nP3NPXrxOru-xB-OnPbb1XrfhfW67end9gQ_8EKUaOGt8qz0sr_ltIBjVWgip"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "HuiMin Mak", 
		  profile_title: "Public Relations Executive at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_QQ0tAdDpsldzcLFjkCpDAEOxZcS9BiFjXTIDAE0hb-M6ebrgo8fYxowanMDdqX6Ab5juODSoonjT"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "Virginia Rider", 
		  profile_title: "Assistant Account Manager at Venables Bell and Partners", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_M3jGdhM3NuWC9ipXMiajd_HANWsuN82XUhdgdCo3wumgwXRkzFDabGYfsFVtcbDHZG0p6LZhi8m8"
		 }, 
		 {
		  profile_tagline: "Deep interest in big data", 
		  profile_name: "Scott Clayton", 
		  profile_title: "Senior Software Engineer", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_txz5sK1X8F3O2yYGt4X9s1tkGXnO20fGKj3Vs-Cvj3Cf1U4COMLWqt9U2E9h74aaPycUvvK6uAY6"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "Jean Tet", 
		  profile_title: "Business Development Professional", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_MC0ebCUhQaV7nfynUiSRbhWhkIYDqfjnR_Icb3whUHEjIwo9zkfkdT0aE_O-BHpsZTjneQMn4J3R"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Eric Koh", 
		  profile_title: "Program Director | NUS Overseas Colleges", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_2bYEOyZpWrTFBW-hmhaJO0M-5nvbv2-haLEzO0VisvTBEeL88TmQKxmDwOzZ9I12DkyNAZe_xKuk"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Sharon Lourdes Paul", 
		  profile_title: "UX/UI Designer  |  Owner of We Are Spaces", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_Ow-uHBIsKo1iFBxoYIK1HzMJruLi5lOopu61HqVLfWA-szdEtSG8QNmIOG5j6n060ertFPXWk0Yt"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Jeff Loui", 
		  profile_title: "Director of Product Management", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_5R4EHmGEQojRaSxQ50evH2_w6uZBaSOQFV2zHDrnJWubAdd6djHQQSkZHG4eSE0Ek4VNFEG2tuVw"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Edmund Yong", 
		  profile_title: "Managing Partner Accel-X Pte Ltd", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_LPiHRI-jCi7vK0DSLqhcRW3fCkEsrJySFtcBReC7gbYEfgwDWv1XvH9Tu2o5POgTXK39qfyaGjEo"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Warren Stan Lee", 
		  profile_title: "Venture Capital Associate", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0__by8vYxCBLXNv5a1iFg1vpjKv5tBz_a1TLe0vjpGEiQboFJPfTuuRge2Ue-enkf0CkYYssGc6DlS"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Chip Krueger", 
		  profile_title: "Account Executive at xAd, Inc", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_upscW4QWwHlQa7Udm44kWUnkd2Xou7wdajmeWsLq9frVPIyWhVERFVlVFkkzfeELS0ZdQjUPWtak"
		 }, 
		 {
		  profile_tagline: "Business Developer in the health and medical sector", 
		  profile_name: "Andy Ong", 
		  profile_title: "Graphic Designer", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_4dB698ech3wTIOfPVmzM9GHehG0CIgfPsH_M9GRc03ItqJ41NfboZC7JaExgesaxJov4J5WpDCRp"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Kah Hong Tay", 
		  profile_title: "Product Designer at Quora", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_R7Vm6_4Ic2H7oFDzRHyA6hIecaOfECjzJIaA6heqHeo0v6ovBWoCe8pVJiYrd5pJVu4KdbnD7yAj"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Jasmine Ho", 
		  profile_title: "Marketing Mobster at Love With Food", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_OurBLBwNmE92b4U4KW3XLzRnuW8fFOo4KHXHLqEbPuNO4sjZtEhUwNOWCFhAkJIq07-WoPZX2e9g"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Lilly Huang", 
		  profile_title: "Director of Global Gateway at Silicon Valley Bank", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_zR-8K5-cKNRghqiYcsCxKFGQrlDrGlCYUx60KFPQftJhjzvOMjGuObFeOJSfTn_tq4rYx8TCgJ9K"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "LiHeng Shia", 
		  profile_title: "Entrepreneur at Elusyf Global", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_7bH7EYRhzm8cR30kSCRpEpWiBacQMF0kSQprEjV0eIiBQ_HXiT4_XgmAM8BZVhOemkol5sX7LV-k"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Seth Schreiner", 
		  profile_title: "Executive Director of Marketing at Liquor.com", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_FEYCE7y6q7aqFiukLISlE20UNSUvb8DkLSEjE20Qwm75ZXVXwummXuwesLREXb2e6Wyy5wTEYZIG"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Jeffrey Glover", 
		  profile_title: "Software Engineer at Liquor.com", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_utI7Lyvu9E_QOixqanoyL0Bgq2rEYQxqav0rL0XjIEXsTGeNhNR_wxK1V3KvjTY4SldloZsxBUIL"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Yang Lin", 
		  profile_title: "Marketing Manager at Clearvision Eye Clinic & LASIK Centre", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_OYjMBB6bEXbuCfZpp0SQBqTUHCi7CuJpppd6BqbFcbcYgHaytZDvJN1d62_l3w4r0g0bZPMxMoq0"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Emily R Speer", 
		  profile_title: "Enterprise Account Manager at Sailthru", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_eOkdZfvdGhuJ7y73eRqVZSG5G8RH7sO36sKnZSXJj5fJKOdTX4NL9DKc2aU92g0DWjQcBo9qNi15"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Agustiadi Lee", 
		  profile_title: "Senior Executive at NUS Enterprise", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_tlYgplh-MPC1xhQ_KAxap-3yJ-zxPhn_rnEGp-_i6c37ukTiOBmlttcDcyv8rFB7Pty_1vlFIC42"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "KYI LAY NWE", 
		  profile_title: "Accounts Assistant at Careerminded Pte Ltd", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_9G8uJ8S-xGgSzP7GN3GPJip-P_VjzvOGN8N1JiSauLaDoAdCsXK8B_JhgmsGnt0ac3Ct9k0UuFmx"
		 }, 
		 {
		  profile_tagline: "Entrepreneur with disruptive technology", 
		  profile_name: "ANG Jin Hui (\u6d2a\u8fdb\u8f89)", 
		  profile_title: "Associate at Microsoft and Lee Kuan Yew Scholar", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_fl6WHRLDTmhXgRaoSvQ9HMX_TfLI0ZxoDn-9HZ5OYoAVhpeE_B95Q4Ar7T5zyxY6atXBF0UqrqnB"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Yang Shun Tay", 
		  profile_title: "Game Producer Intern at Singapore University of Technology and Design (SUTD) Game Lab", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_ukJ160YaV2keZ8ZzG8x86gMS4S-Q4iezm5Du6y4rFm6nFbxvhCd0epuO9LtMUXWJSbRDdRoFyzID"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Rajesh Panicker", 
		  profile_title: "Lecturer at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_vJv4JCAnSbDTfjoCzYzIJ3toD_RrSYVCRgTbJ3A9-Qf3tVDGJ05qBT54iDUaaMRmNVB69QiDTQcG"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Pearl Hanami", 
		  profile_title: "PowerCellSingaporeTel:64656844", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_rOHwyzhXQNhj_HAmtREZynh5Qlbj7wKm-spqynTJMcPDKfbay44b-9zceyFG2ulCAjovPA0cKdj7"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Jian Liang Low", 
		  profile_title: "Incubator & Accelerator Leviathan at Reactor Industries", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_Lw2NlIgvIlJc5eQpbofblWaJIcfcLeFpFu4IlexHq-R6V2ryWSpZ0HI6LM7dQ76rXeaEYfTDk1lH"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Saran Raj", 
		  profile_title: "Account Executive at Ogilvy Public Relations", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_IP83M2FaP8EIKv2_5nT-M7Q116MHKvS_dANYM7ka2iSJ7AsibvKDcfrhjeJ91tu7oKC0nHVHDbII"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Shao Hong Peh", 
		  profile_title: "Software Engineer at Apple", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_jbmxXPEp4Wq1vQHn0CShXrwx4d-_vQMn0LshXrMfFo6PEGm9lTYPEKD39Tty9TZspkuTIBbXLXlh"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Wayne Wong", 
		  profile_title: "Lead Analyst at Venture Scanner", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_ZSvRnXEwmCO8wgRYVoQenbWXubD7WORYVfTknbWvPkJxns2Oqw5c4FjUCfSKoJVtMmBLMhB0TxHM"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Ritesh Angural", 
		  profile_title: "Cofounder at Shutterpair", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_2AaKEsXpV7loKTZHmzm_EJ9rVH6w-beHavVfEJ6uLm-UDixe8cOyXMtCqLQNl8WXD-2m5YqJQEWq"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Rachel Ng", 
		  profile_title: "Product Marketing & Business Development at Ensuant Inc.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_5fq3Tojbr0I9IlAVF7FtTexkKZfRwl3VIwhYTeDn7ORINz9sddXDfHMZYv7XHnh9k290mf0J8KpT"
		 }, 
		 {
		  profile_tagline: "Entrepreneur with disruptive technology", 
		  profile_name: "Michael Vassallo", 
		  profile_title: "Business Development, Brewbound.com at BevNET", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_UciCe3qlt7HarK2bJ1PAeCvltEVi-zSbJvcje_92S7a-DlsFcA1m6iCGyXsjl-uwsq3ybXkL_RkL"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Megan Speir", 
		  profile_title: "Software Engineer", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_SLdZcZEuoGzEBEIjS_oIcRJ2e3T5UdRj7GjFcVRpBXvNkS2g3iJNMs7-Q73U4aVAu6IQ4g5B5mUl"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Kenneth Seet Wenlei", 
		  profile_title: "Senior Associate at Changi Airport Group (Singapore) Pte Ltd", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_Fl0jZe8pR5ZsP5VD597CZI-YJ8wMP_UD51ICZo__65xWuFuSwBfA9EcScaIQrks36tjiBSllrU3m"
		 }, 
		 {
		  profile_tagline: "Investor looking to for startups to fund", 
		  profile_name: "Tianwei Liu", 
		  profile_title: "Software Development Engineer II at Amazon Lab126", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_tpExEq8HZ7-y2QeeKOH2EBPF4SFxuLJerjYhEBi4FI17PTaHOVsPXcB998b8fG4kP0eT5rAi8xcz"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Dixon Chan", 
		  profile_title: "Co-founder & President at Burpple", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_W1fpi2qYJgMW1_XqdAWfi7nlMxyol5vqwqR_imF2QseRm3CNLz0rSaPGBApq-CN4erDG2dJfCOy2"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Peck Ying Tan", 
		  profile_title: "Co-Founder at PSLove", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_3rnHNpkfGCvNYJpliq9BNYKiCirZy0plicCBNxi-g6XW_UIAS9QXV0BpuSKQ04jgh1N9U4jKCx9a"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Sanjana Rajgarhia", 
		  profile_title: "Assistant Project Manager at PointStar Group", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_oFea4Eo3NFSc4Qg2o8Uj4HwSNLWb4Qp2k_yl4dVyw6gBFGIuQ3ZGnWmtsSdZUTjhIXErcmktYBSX"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Daniela Zahab-Palmer", 
		  profile_title: "Digital Advertising and Marketing", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_-vl8EB-rKIAPKqYHtzKPEqiOrwQtKlmHKt50EqACfmtC7zMeYPTuXN5uOL6S1n7X1nPY5PiBohWY"
		 }, 
		 {
		  profile_tagline: "Entrepreneur with disruptive technology", 
		  profile_name: "John Shum", 
		  profile_title: "Online Product Manager", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_sMe3tG5wJvwTu_TAqg7Yt8Q5zKg826TAqjyYt8NJoPWK1Cnl9xZDphhcR4jx738jUsE0gF6oexJn"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Scott Png", 
		  profile_title: "CEO at Feet Care", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_IUM7SeQFvUae_31EIYsrSobzBYH57C1EWsSrSovveUpvK6XobgW_iE3UMres25-QoZUlCSb65dm4"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "Kia Min Phua", 
		  profile_title: "Master Student exploring Battery Materials, Energy Storage and Electric Vehicles", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_ZSvRnLHdaFda5OsYZIcenboLubD7WORYVETknbWvPkJxns2Oqw5c4FjUCfSKoJVtMmBLMhUAFbUM"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Ian Lim Wei Fong", 
		  profile_title: "Automotive Technopreneur, Kauffman Fellow, Founder-Hondaism, Inspire 21", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_9-HjcThxnTetxXRlqcZCci18sCpjxbRlqKpCciT05XHD8i2Asq4AM_zAN7yGp8VgcAoi4k00X6OD"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "Molly Wu", 
		  profile_title: "Senoir Executive at Global Marketing Dept", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_oivHPfUf3noFBjT1kkzRPSZT3POoUYr1HGTBPuIrOnoRkVFPQL5Xj2xOfjYq4MA0IhB9yIvPlT9D"
		 }, 
		 {
		  profile_tagline: "Business Developer in the health and medical sector", 
		  profile_name: "Eugene Cheang", 
		  profile_title: "International Graduate Trainee (Finance) at Nokia", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_bvDvUetOXQxJrddub-OEUIGlHCHNKEduLNJoUoAmcTpk7aO2IPjMzE586oew1SH8QnfwNSiUw4ZZ"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Zi Ying Chang", 
		  profile_title: "Team player. Believer. Do-er.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_bIomh7VQzYuceF3zbfsjhDgIcUOqekAz5WOAh2pUHZoXBh6vIDVCmuevJ1YII_rJQHHKfwmfGuem"
		 }, 
		 {
		  profile_tagline: "Entrepreneur with disruptive technology", 
		  profile_name: "Samuel Chan", 
		  profile_title: "Guerilla Marketing | Marketing Communications | Google Marketing", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_tK6jMqtupQK10-UftvkCMnCgy_kxjqUfr--CMBig_LK7GKu7On9AccBPtmX8Y1siPPXinrl68SKr"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Skip Boykin", 
		  profile_title: "The Home-Team Sports Bar & Grill", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_-1nutqhmxP9pgr_jttbPtBCDPK3xjP-jr-C1tB3luvzmGcLgYzQ8pcvxgOTTYN1A1rNtgr1RzLQF"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Brenda Tay", 
		  profile_title: "HR Executive at Resorts World Sentosa", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_FfbQYoyEGPpzIO-SWokzYWjEhKoJIUGS5aPJYWmR0POdq0zDwdBErdVza4E6eyiT625ZlaKKrEUR"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Inez Wihardjo", 
		  profile_title: "co-founder at BonAppetour", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_uMN4t0QvmAvwu0bAms5FtynHm1lb2y9AmZ8btyNzl95n143lhxkqpphR8gAM7UcjSsn6gR6JyG9v"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Bill Bing Li Lim", 
		  profile_title: "Student at Singapore Management University", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_SLdZcMg_EQLbBdRjf3oIcVJTeCTkUdRj7TjFcVRpBXvNkS2g3iJNMs7-Q73U4aVAu6IQ4gL6Z8pl"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "Swetha Gopalakrishnan", 
		  profile_title: "UX Designer/Software Engineer at Bumbox Logistics", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_hW3LF0pBGHqcEJfcCHrnFy0NGDlcQsmcCIzsFyjeja5FMOMBu7AdWpWQ25AHLg7R3EiRHRihWKRw"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Ryan Dao", 
		  profile_title: "Hacker. Thinker. Entrepreneur", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_OurBLBDFafvDIgU4KI3kLqIVuo8aFOo4pHXHLqEbPuNO4sjZtEhUwNOWCFhAkJIq07-WoPNbxdlg"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Alex Yao", 
		  profile_title: "Entrepreneur & Front-end Developer", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_SEVdfpHHwyA6WDPXDoJnfYZ6bp9LIm-X7SanfxsBZJGqqoLk3uoLT0aMWtnReW1HuW4ch4eOI9lF"
		 }, 
		 {
		  profile_tagline: "Business Developer in the health and medical sector", 
		  profile_name: "Charles Ng", 
		  profile_title: "Global Markets Analyst at Deutsche Bank", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_JhxB85ExoxZ3naFZBLyk8FZtEOD29aQZR3wH8Fd_vjJpdEl4v67UabgSknS1vdbN4igW78BmkNdl"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Rick Tan", 
		  profile_title: "Managing Director at Innova Technology Private Limited", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_N0TLAXKV3BJfiYijqYA9AbtsTND03RCjnUvsAbCIY-JfOxvg4JldxF9L7MShCp_Avp_ROhpDazLY"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Ngoc Trung Nguyen", 
		  profile_title: "Software Developer at Dealflicks", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_IP83M2Nx1i7W-9p_In_tM7N016MHKvS_dANYM7ka2iSJ7AsibvKDcfrhjeJ91tu7oKC0nHsZB1sI"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Ying Loong Lee", 
		  profile_title: "AVP, Head Certis CISCO Protection & Enforcement Services at Certis Cisco Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_QoM0AdfLJlxUoCzjQdR8AEZeUtS9oCNjkmS8AE0vkqM6z6_go2W1xowUvxDdW5vAbdU3ODT5Wf7c"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Clovis Tan", 
		  profile_title: "Graduated from the National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_yq555n5m3fq20jOMy9FV5qzDTo_8xZ7MOnlV5zqxYuBK8pZJr-vWIv8l7FixpxmvgcbUEt6aYjjM"
		 }, 
		 {
		  profile_tagline: "Deep interest in big data", 
		  profile_name: "Wei Luo", 
		  profile_title: "Software Engineer at ibm", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_9NypJi9lUQap-hHCN1U7JTPTM5UAt_MCN9e_J8lTQQ73SFmGsturBhL7BDRaAkZmcBYG9F_dRbZA"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Cheryl Dan", 
		  profile_title: "Entrepreneur, Writer", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_r4vDWnhktf_ySBSW-Vk-Wq-kK25r7-gW-sTtWzlv7dl3KnEdyO53FvLUYCLa2zy5ARB1QtfUDJeh"
		 }, 
		 {
		  profile_tagline: "Investor looking to for startups to fund", 
		  profile_name: "Winston Yao", 
		  profile_title: "Art Director at Liquor.com", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_jbmxXPU-4W5_BLMnxFg8XrV14d-_vQMn0QshXrMfFo6PEGm9lTYPEKD39Tty9TZspkuTIBFNHO-h"
		 }, 
		 {
		  profile_tagline: "Entrepreneur with disruptive technology", 
		  profile_name: "Ken Ryu", 
		  profile_title: "Founder, GetQuik.  \"find out who caters to you\"", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_ukJ160x34DToZLez2bUu6yR74w-Q4ieza_Du6y4rFm6nFbxvhCd0epuO9LtMUXWJSbRDdRoA1iID"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Vivek KS", 
		  profile_title: "Co-Founder and CEO at 8packs", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_lwfCFtfBZH_1WLjcleaAFr7qNIl15LDcPERjFrpWwa5GsTVBjS0mWKebs5AD6G2RKeDyHBa6qkq4"
		 }, 
		 {
		  profile_tagline: "Deep interest in big data", 
		  profile_name: "Tze Siang Tam", 
		  profile_title: "Hardware Engineering Intern at Maxus", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_7QQHyxMG8rC6Rs3C33TUypEDC-cQRJKCDbtByjsggciBXgbGi8nX-gaPuyBZZOlmm5k9PskGFRGp"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Jun Xiang Ong", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_wM8zEmQ4ue25usdkL0GoE2K4awU58JekdZNEE2cHAm7NxgxXFxKJXu_6hLRUiOWeEsCI5wWw4IVx"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Louis Puah", 
		  profile_title: "Product Management Intern at PlayPhone", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_n2b0MQ7bl8s-HAH79w32MXykg6WpEc47qIP8MLfZCLg2vPffVoB1c5UnPmdidrJ_Bf53nCl7aw_G"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Edmund Cai", 
		  profile_title: "QA Engineer at Loop Commerce, NatSteel Scholar, Undergraduate at National University of Singapore (NUS)", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_GNQk2J3mCVAMOJKdCz5B2UG3CUkvYJ3durtR2UlggYKkTg9WmtneCRLPuzXwjOhLiBksipfYRozu"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "Lucas Artusi", 
		  profile_title: "Product Designer at IDEO", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_xxsvAN8qXzchufkjA4oQA9nWHN32ufLjARmoAcFqclzjPw-g1MEMxBPV6VT-fHXAYyZwOKM48vOu"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Wen Qin Lee", 
		  profile_title: "Freelancer, programmer, web developer, photographer", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_B1FpR_hCxLxaAvJ3vchfR3KTxCUxj9J3v-1_Rh3j8b7mGtaTRzcrv8v1l2RTYA4DnrLGqb13oG3e"
		 }, 
		 {
		  profile_tagline: "Business Developer in the health and medical sector", 
		  profile_name: "Bo Liu", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_CHQ4YJ0ImrAvLsbDC75IYsj6mKFzdJ9D2utbYUO4l91L9g3SaanqrRE98gboEOc3_Ik6lpuAltk_"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Jasmine Leng", 
		  profile_title: "Digital Media enthusiast", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_yths_KBAusqDtO5vp1CL_-br2xPut4qvY9qL_1XS1JbySyizrNrnDPK_Gt1PA0zMglGkuN99_mzT"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Yi Liang Tan", 
		  profile_title: "Audit Associate at Deloitte Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_0-CI4P67T33T1M28xvhN4rB-i8NuPVg8gznN4AXfp58yuYEhPqtFnlK3DaqPrjyuOA8zcn98gJXT"
		 }, 
		 {
		  profile_tagline: "Entrepreneur with disruptive technology", 
		  profile_name: "Leow Johnathan", 
		  profile_title: "VP, Marketing at Innova Technology Pte. Ltd.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_utI7Lyqhqf9EY8OqmKMKL06Tq2rEYQxqm90rL0XjIEXsTGeNhNR_wxK1V3KvjTY4SldloZVhphJL"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Joel Ding", 
		  profile_title: "Marketing & Technology", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_0-CI4P50i6C21M28xP5Z4Aq7iiNuPVg8gKnN4AXfp58yuYEhPqtFnlK3DaqPrjyuOA8zcn9ikm6T"
		 }, 
		 {
		  profile_tagline: "Business Developer in the health and medical sector", 
		  profile_name: "Kelwin Saw", 
		  profile_title: "Aspiring and Motivated Undergraduate", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_ndxXK8jVbPW85DA-qoYUKGyBFBpKbm8-NSwUKiY64AH8ZoBtVf7HO_oHdsy7XWTOBogVxkuqYM7d"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Hock Kiat Ting", 
		  profile_title: "Graduate Associate @ DBS Bank Ltd", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_xjj5WthVkaCgmuOLjyS9Wr5sXoNSCu7LgMdVWA6FRu8ggHZ51RDWFltdoFqt3wmdYO0UQnZ8i0us"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Ethan Lim Kok Hau", 
		  profile_title: "Business Development Analyst at BioMachines Pte Ltd", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_0hOv4tExWCGG9DM8xQDQ4AsYwLND9DW8jCoo4AdiNh8pdWYhP6aMnlgD5wq1voeuOipwcncUg0OW"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Vic Bui", 
		  profile_title: "SMB Data Analytic at Facebook", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_R84qRCJ8WG77UeE3R_JbRhIKIFU7UDE3JX2wRhdKqT7xkWgTBQH4v8gYLoRK4owDV_VoqbBNAGOF"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Jiesheng Poh", 
		  profile_title: "International Graduate at Standard Chartered Bank", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_6X3m4fU-tkaRvzg8X_lg4uU1t849zng8e8zA4ugmS52Fo-EhEGACn2d8yaZHnlyuFFiKcI_rDq7n"
		 }, 
		 {
		  profile_tagline: "Investor looking to for startups to fund", 
		  profile_name: "Asha Ashok", 
		  profile_title: "Product Engineer at Micron Technology", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_Pk_hAcsOtnFpq-tglQ1PAvpArt8AqqigA5BxANg2flN3IKqj0CP2xqdGOVhaB1GltbTOO1fUlW7B"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Zhen Long Lim", 
		  profile_title: "Demand Planner at Procter & Gamble", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_5KCgsmrOx3dRPvsCL9Tms2_P0TRUl9sCFlnGsD8uhFfwmtSGdntlqSqCAuUk-AUmkP8_vEO7z95V"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Nicholas Teo", 
		  profile_title: "Frontend Developer Intern at 2359 Media", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_TLYPQpyjVozsBQJq_CauQY2t4wrNB8dqibE2Qxj8FDXkeXONDimxH0Wm9QKwqbH486ySW4fTpMmO"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Pin Sym Foong", 
		  profile_title: "Instructor at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_OPQTE-zOPe3CKvjkKqhYEl5u1HcmyvukyAtOElFO2DiY_AUXtvnSXAPrjQBl0tSe0Kkx59z9CGCX"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Bryan Long", 
		  profile_title: "Founder at The Testing Ground", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_OMZdSBFkXUhS2dtoKOWVSzv6XYLC2utoyYunSqczR4At1H5EtxeLiN_RoP5g7wP60sscCP5CaRJz"
		 }, 
		 {
		  profile_tagline: "Investor looking to for startups to fund", 
		  profile_name: "Wei Hong Oon", 
		  profile_title: "Graduate Trainee at UBS", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_e0hbvSLnGXHwD42PHpAqvfFR850H342PEgq4vakwx8IJOyR1XJrwRmr5mIx9C0DxWpGMsWV9uWdQ"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "David Cloutman", 
		  profile_title: "Director of Engineering", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_eyd5KSLQkAMQfE1-EpVsKanQXqyWSdi-oOjVKaLVRAeMtSqtXsJWOmlqospnaaGOWxIUxWcT-6kb"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Yaadhav Raaj", 
		  profile_title: "Intern at Bay Sensors", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_io443xyXWJNBomQcideI3py5IYAcoDnc3I2b3j0zqUL6zWTB72Hq7gwRLrldWoBRGdV6asSmPot1"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "Shuyang (Christine) Li", 
		  profile_title: "Market Risk Analyst at Goldman Sachs", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_yHCbizJnisFCWMTZymhZiBVJiMTT5VhZOEn4in4dpyvKsYc4ratwS9uFDc3x6j3NgI8M2Aok4nuE"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "John Goh", 
		  profile_title: "-", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_SEVdfpZBFUAwWe_XSedVfxRcbx9XIm-XfHanfxsBZJGqqoLk3uoLT0aMWtnReW1HuW4ch4kPhfTF"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "Akash Hegde", 
		  profile_title: "Co-founder at Workaholics Pvt. Ltd.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_UBEYuFbmZYaG0QQHJNUDu5vmZgoi0LcHJKY3u59ObZO-hTheclstGLCrn1EjyG9XsNe8_GkHKY4b"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Ian Tay", 
		  profile_title: "Founder at PixaRoll", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_OEI5XqdwXIQmIu7sODosXnRoXdCiIE7spS0VXBsRR2n-qaZVtuRWEcazobGjeSmn0WdUIrHTWVwS"
		 }, 
		 {
		  profile_tagline: "Deep interest in big data", 
		  profile_name: "Seliyan Silvarajoo", 
		  profile_title: "Intern at MasterCard", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_GNQk2JGj8jrBOyAdhnhR2UhjCgkNYJ3dhPtR2UlggYKkTg9WmtneCRLPuzXwjOhLiBksip7gOlcu"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Lew Wei Hui", 
		  profile_title: "Executive Engineer", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_zR-8KkG6rNJpaliYvJtPKFTUrBDrGlCYBp60KFPQftJhjzvOMjGuObFeOJSfTn_tq4rYx83UdX_K"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Samuel Nee", 
		  profile_title: "Managing Partner - The Green Media Room", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_OSEuUBZIzXifd_f2pWWPUzHkvFLad5Y2KdY1Uqo4EXAO93Wutws8zNY9U75AECxh0metNPZawgam"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Yvonne Lerh", 
		  profile_title: "National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_RSNOt_mopPJ85K6AJmbDthE6YKg7WK9AME8TthWzT9Wxnq3lBwk-p8jRKgjKoBcjVmnhgbRazbSA"
		 }, 
		 {
		  profile_tagline: "Global distributors for green tech products", 
		  profile_name: "Jovin Lim", 
		  profile_title: "Sr. Financial Analyst at Alcon, a Novartis company", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_bNwbMItCEbSzYSg7L1RNMeGgQ_WNYw2759x4MWljM8gkTfRfItUwcdL1eIdwjuD_QBWMna7jZBo5"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Finian Lim Run Jian", 
		  profile_title: "Management Trainee (Engineer) at Keppel Shipyard", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_uuv-7saLAJtLwA9WmIF374VHjV5owt6WmwTS7Jd9GylVN9AdhE5O3Mg41cLzHvF5S7B28YUm3ifq"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Joo Siong Oh", 
		  profile_title: "Head of Business Development at PROTAG", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_oLg_hd4PcYpbBk1JHkmKhEsjBOaFc3iJebWphER3ejVcH5qMQiS7mo7fMnm4N6GzI6xgfDdVzjF4"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Gerald J.Z. Yeo", 
		  profile_title: "Developer at Pear Comms", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_9G8uJTmpPLu0J9OGNkl1JGulP_VjzvOGq8N1JiSauLaDoAdCsXK8B_JhgmsGnt0ac3Ct9k1nLJDx"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Joey Sim", 
		  profile_title: "Founder at Pinecraft Wood Works", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_-1nutq-_19kmgv_jr9B0tnhaP13YjP-jK-C1tB3luvzmGcLgYzQ8pcvxgOTTYN1A1rNtgrxfj_AF"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "Tay Wei Yi", 
		  profile_title: "Management Associate at Singtel | Aspiring lnfocomm Leader", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_HAcsUHzafG04OMJuo155UwcG7FeHYpZuEPiLUw6AKXy4TZ72kcFnzIt0T7HcjRM8d-zkN24Y2qPX"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Guo Guang Chang", 
		  profile_title: "Professional Athlete at Warriors Football Club", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_x9J4KPc1e9FTpEntgnobKANie-A8pfntgcDbKAnPBcLliwT-1rdqOlGgQylYxHBYYzR6xnXUozAn"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "supriti Gupta", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_V5_s-XZYmAoDnU5y4Ttd-QR02Kah94qyZkBL-QR71vVAdyipn_Pny67TGOmOv0zKRQTkj3dXAsix"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Cher Kian Lee", 
		  profile_title: "Student at NUS Business School", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_CV5yQ4NermN4hqZZ2OQ7QUGQpw3v2qZZhRliQU1Miez51K74apvKHRbB-iTE71MN_JbCWp3KctMe"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Soe Lin Myat", 
		  profile_title: "PhD candidate at NUS", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_ByD7XF3s9Wo-TiaVBZSKX58Vqf703QxVvOJrX58IIoUaOGesRsj_ELqLVTf3CTY9nxflIGOAXos5"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Li Chen Elsie", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_in1UQZtjDIzRAVRZ3NleQVAlfa3clxsZS-FXQR1hrIz6mRS47KiBHUba38Td-ZUNGvA5Wy3NrE1Z"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "Yaoyee Ng", 
		  profile_title: "Internet Industry", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_-FJjC12TJYbKV59crTVCCKSSJ0A-4_Bcr_DCClpr6MLGFF8BY3dA2AeOc-lDUknR1XRiS9mYF7dB"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Ankur Vohra", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_-zC9rq917vqKPpk0tcrdrB8g7-CtlVL0KqnWrBAuKAnCmY-xY1tVYc5CTsGS-jX1198H0risk_NS"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Nicholas Tham", 
		  profile_title: "Assistant Manager at Citi", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_JhxB8kIOoxZyqScZMQjk86EtEOD29aQZBkwH8Fd_vjJpdEl4v67UabgSknS1vdbN4igW78RtxSfl"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Mingxiu Ho", 
		  profile_title: "Affiliate Link building/SEO Expert", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_r7IZBBaoo8FtouIp-HVwBzm4eF_jEERpte0FBzDZBXBDva2yyWRNJvMnQ7iGdSVrAudQZt0b_I_Z"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Angela Chan", 
		  profile_title: "Design Professional", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_zR-8K5KMtc4OG-tYzOK1K6AqrqDrGlCYBV60KFPQftJhjzvOMjGuObFeOJSfTn_tq4rYx83l8lBK"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Eunice Yeap", 
		  profile_title: "Learning Enthusiast at NUS", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_9-Hjc8i3ZXMAxXEl99fCcGr_s3ppxbRlqzpCciT05XHD8i2Asq4AM_zAN7yGp8VgcAoi4k0E6IMD"
		 }, 
		 {
		  profile_tagline: "Machine learning guru", 
		  profile_name: "Chong Min Tan", 
		  profile_title: "Naval Combat Officer at Singapore Armed Forces", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_vJv4JCPWf8O1DYVCcYtIJ3KED_RrSYVCBOTbJ3A9-Qf3tVDGJ05qBT54iDUaaMRmNVB69QizfaAG"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Jeslynn Seah", 
		  profile_title: "Designer at Waggener Edstrom", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_IcAN_Iqja4Ewry9MIKhI_e5KmM75tybMdPLI_Wv3l0UvS4KJbA3ZDd3f8NfsAUQvoq1EuaFGjv5x"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "Shuling Chen", 
		  profile_title: "Biomedical Sciences Undergraduate at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_8D2tXJdqRDzqXCUshEy3Xsa9RdGVkkwsCW4DXs7wX79oUhyV2IpYEVR5zXCLF_EnTaauIjgGAR2p"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "Zhe Jin", 
		  profile_title: "Engineer at Newzstand", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0__by8vYspB8nFz_71TCSxvjOPv6tnz_a1Die0vjpGEiQboFJPfTuuRge2Ue-enkf0CkYYssm58kXS"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "Syed AtiF Husain", 
		  profile_title: "Design Lead at Soma Water, Freelancer - UI/UX, Visual, Packaging", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_66Vqgua8FBob4DQhXLdwgfDCINMnsmQhXFawgfy-qlSb5ol8Eho417HpLVJeJWb2FL4oteakmZZf"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Charmaine Chan", 
		  profile_title: "Business Development and Design Associate at HoneyBook", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_n2b0MbDWgTm0oNM7NEQuML0WghWjEc47NIP8MLfZCLg2vPffVoB1c5UnPmdidrJ_Bf53nClyUYvG"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Loong Fuo Keong", 
		  profile_title: "Software Developer at NewzSocial", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_Wn8k22v0mZp5PsK5wN6B27FgCUJQAJ35wlNR2mnSgYDBag9LLKKeCaG_uzMZtOhWevCsidXTsW9W"
		 }, 
		 {
		  profile_tagline: "Business Developer in the health and medical sector", 
		  profile_name: "Garreth (Xiang Yang) Peh", 
		  profile_title: "Founder @ AmigoLabs", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_LPiHRIhl8bfB-sDSb-TURePjCCEsrJySbtcBReC7gbYEfgwDWv1XvH9Tu2o5POgTXK39qfp1dWDo"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Yan Yi Seow", 
		  profile_title: "Engineer at Berner International Corp.", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_SEVdfjwkbyC6WDPXi2d9fYEFbp9LIm-XfSanfxsBZJGqqoLk3uoLT0aMWtnReW1HuW4ch4XXElPF"
		 }, 
		 {
		  profile_tagline: "Deep interest in big data", 
		  profile_name: "Gary Goh", 
		  profile_title: "Final Year Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_9NypJiKtJbSTth4Cn-g7J8nPMhUAt_MCq9e_J8lTQQ73SFmGsturBhL7BDRaAkZmcBYG9FiKilyA"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Ke Jun Wang", 
		  profile_title: "Highly versatile finance expert with an enthusiastic passion for wealth management", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_UZgaG6AqRYV-CkhVUUujGkzqc07CC3rVJxWlG5BFHVUtg5FscYSGuLidJlfg36A9sUxrDGWARTt8"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Clare Chow", 
		  profile_title: "Manager (Yeosu Korea Expo 2012) at Ministry of the Environment and Water Resources", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_tm_nI-7R2aA1k4ZFtd35Iljq2Ic0X4eFr7BdIlao1aifRyxbOePs5AsXG5Bhb0WIPSTeX9KsuO5Y"
		 }, 
		 {
		  profile_tagline: "Hope to meet PR/Journalists in the tech industry", 
		  profile_name: "XIN HAO TAN", 
		  profile_title: "Student at University of London", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_wM8zE79RmIeQhJekIOTQE2zMaSUk8JekdRNEE2cHAm7NxgxXFxKJXu_6hLRUiOWeEsCI5wd74V4x"
		 }, 
		 {
		  profile_tagline: "Entrepreneur with disruptive technology", 
		  profile_name: "Alex Liew", 
		  profile_title: "Student", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_9r8JGiFt2VUpyJ5nq1TEGTimasOgKJqnqcNQG88aAMoS7gi9s9Kzuhqhh-YC1Ozsc1CFDF-hjH6w"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "Bennett Tan", 
		  profile_title: "Principal/Director at The Alpha Schools - Vietnam", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0__NWrbZ934fc9YGes_lZ_bRh2VeCcOXds39g7bRlpLSnF38OVftMpdUL-q6GHgiHnCBwaey_QaVC0"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Sandral Chin", 
		  profile_title: "Owin", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_mB1VmUXtDMNzxx5wavqWm4X170QkPxvwuKF5m4v_KVtvuRCIGli9hZ3STl6srZNb7NAXTxbxh0BO"
		 }, 
		 {
		  profile_tagline: "Business Developer in the health and medical sector", 
		  profile_name: "Jason Yu", 
		  profile_title: "Software Developer Intern at Appsverse Inc", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_CHQ4Y4uIaNtvI0BD82hwYUx5mzFzdJ9D8ftbYUO4l91L9g3SaanqrRE98gboEOc3_Ik6lpuyeJt_"
		 }, 
		 {
		  profile_tagline: "Business Developer in the health and medical sector", 
		  profile_name: "Crystal Sykes", 
		  profile_title: "Assistant Producer at Liquor.com", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_5P24ioAaW0sctIB4Iqmwie6jIpuRKe94Ft4bie3aqsZI723ZdvpqSHvhLA2X17cqkKa62f0bU9PP"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Mun Chee Ng", 
		  profile_title: "Employee Engagement Executive at SingTel", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_U-ft058gVKx71LbmzvOD06QKZrwmPLbmMKRD06b7b1xYuTKacq0YlQ1TnZIlrGQCsADurTJZSZc6"
		 }, 
		 {
		  profile_tagline: "Global distributors for green tech products", 
		  profile_name: "Benjamin Kong", 
		  profile_title: "at IRAS", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_W1fpi26-Us4XA6qqIcHiim6PMpyIl5vqIqR_imF2QseRm3CNLz0rSaPGBApq-CN4erDG2dMJBz02"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "Nicole Schlichting", 
		  profile_title: "Events Coordinator at HackerX", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_yths_Kz-u062r4vvpKF5_-qA2pPSt4qvOvqL_1XS1JbySyizrNrnDPK_Gt1PA0zMglGkuNVduVcT"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Bang Hui Lim", 
		  profile_title: "Intern at EasilyDo", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_sNXFMbk7GQjCygS74lLqMX5y8hW8OUS7qrrZMLqyxigK30sf9tqIc58tmedxgyu_UB6JnCQaAx2r"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "Stefanie Chua", 
		  profile_title: "Consultant at National Trade Union Congress", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_xxsvAN9oXznjafkj0OW6Ac6wHN3DufLjjjmoAcFqclzjPw-g1MEMxBPV6VT-fHXAYyZwOKJ2Rs4u"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Song Wei Hern", 
		  profile_title: "Final Year Undergraduate at Nanyang Business School", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_pl4fen8uBWPuxkOwt9sKez8hBu6Sx3OwY12Kez61eW-g85dIKBHi6vtjMGQtp60bjtVAbtNfmsmP"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Guo Xiang Tan", 
		  profile_title: "Food Driven Developer at Love With Food", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_gPLYkP8ft7bfYnUcjzbSkAcfYul7pzUcxAA3krFxTW5YiluBAvztoKPlKGAlx-sRyKF8wBJ0kNFD"
		 }, 
		 {
		  profile_tagline: "Investor looking to for startups to fund", 
		  profile_name: "Dezain Print", 
		  profile_title: "One Stop Printing Solutions", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_r4vDWBrdrarySlSWKMzYWzKQK75A7-gWt0TtWzlv7dl3KnEdyO53FvLUYCLa2zy5ARB1QtfHnjJh"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Ian Loke", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_D5pUSVUjHg3oqSco7XyeSMJOEZ5Lnano7kHXSMZGvUlzWETET_2BiJ22krLVzdB62QO5COQyp__s"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Levin Soh", 
		  profile_title: "IT Risk Senior Associate at Ernst & Young", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_bvDvUWrpXXpNtfZublxQUIKPHFHNKEdu5AJoUoAmcTpk7aO2IPjMzE586oew1SH8QnfwNS_xbvJZ"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "HONG SENG TOH", 
		  profile_title: "Senior HOD at Christ Church Secondary School, MOE", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_zR-8KkhsKrZhh-CYzy1PKF-srBDAGlCYBV60KFPQftJhjzvOMjGuObFeOJSfTn_tq4rYx8TZF1vK"
		 }, 
		 {
		  profile_tagline: "Global distributors for green tech products", 
		  profile_name: "Crystal Cross", 
		  profile_title: "Recent Graduate from University of California, San Diego", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_JhxB85e1oZoGnwcZRXue8Fm1E4DD9aQZRCwH8Fd_vjJpdEl4v67UabgSknS1vdbN4igW78Ra0rjl"
		 }, 
		 {
		  profile_tagline: "Entrepreneur with disruptive technology", 
		  profile_name: "Yang XU", 
		  profile_title: "ExxonMobil", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_UBEYu6LhZR77gLFHRrHDukvCZUoG0LcHMKY3u59ObZO-hTheclstGLCrn1EjyG9XsNe8_GHQkRSb"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Han Wei Quek", 
		  profile_title: "Production Editor", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_e0hbvucsuXZWTgpPERKqvfNs850H342P6Uq4vakwx8IJOyR1XJrwRmr5mIx9C0DxWpGMsWVeasmQ"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Joy Ng", 
		  profile_title: "Research Assistant at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_oLg_hHsjvRpbBCCJk_yyhwsAB4a6c3iJeGWphER3ejVcH5qMQiS7mo7fMnm4N6GzI6xgfDdEznL4"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Vanessa Chin", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_UciCe3bpK7aG-zpbU1rAe_6AtuVG-zSbMvcje_92S7a-DlsFcA1m6iCGyXsjl-uwsq3ybXXB3F3L"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Tiffany Tan", 
		  profile_title: "Account Executive at Be Beyond Creative", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_QoM0AHfHMqJN6CkjHaJ8AwYdUAScoCNjkIS8AE0vkqM6z6_go2W1xowUvxDdW5vAbdU3OD3xljMc"
		 }, 
		 {
		  profile_tagline: "Innovator looking for feedback", 
		  profile_name: "Chiu Ming", 
		  profile_title: "Enthusiastic Chiu Ming - The Passionate Leader of Today", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_m8msvsJgIb9wUW4x2kH5vJ4xWhiWBo4x2TsLv4dunLcMemf0GQYnRZgCbm_nqDJP7_uksxcRfTqi"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Michael Yue", 
		  profile_title: "Software Engineer (Intern) at Victrio", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_-RFTK-AWAti-m9KtrgBOKlGw1qA1m98tKV1OKlrR2ALGltB-YjcSOAkzjslDDATY14Lxx9aXLmpG"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Wen Jie Tan", 
		  profile_title: "Associate at PwC", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_izp7Yxrxzvisj3-339fKYj3gBzcnACP3TBHrYjtTe9iQa6kT712_rg67MgBWt5tDG9OllsuGDF_-"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Xian Ling Tan", 
		  profile_title: "Young Bankers Programme at OCBC Bank", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_y9lKkKcPY2qhtB4BY-K7k1zxpEr3KlHBYN5fk1zCi7Xr7z0crrTyoPTu-XK01ndUgzPmwNw6AJGt"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Andrew Ho", 
		  profile_title: "Realtor at PropNex Realty Pte Ltd", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_oCf8SdMrzsud9hCEHi7PSEWyvjHIq5CEehR0SEw2EOpRI3voQk0uio0GUveqBC_QITDYCDv1Zm-m"
		 }, 
		 {
		  profile_tagline: "Entrepreneur with disruptive technology", 
		  profile_name: "Jacintha Lima", 
		  profile_title: "Software Engineer at D'Crypt Pte Ltd", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_y9lKkKNPreci-l4BYlCfk1n0pEr3KlHBYA5fk1zCi7Xr7z0crrTyoPTu-XK01ndUgzPmwNwi1cXt"
		 }, 
		 {
		  profile_tagline: "Hope to be able to gain feedback from our latest product", 
		  profile_name: "Alex Seah", 
		  profile_title: "Engineer", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_rmBXqK053_qlHR2rKdABq1aF3iPjej2rtW_Uq1ScOhbDBMRKyebHsPJJfw1GIVDpASvVRNxozOcU"
		 }, 
		 {
		  profile_tagline: "Global distributors for green tech products", 
		  profile_name: "Huang Yongchang", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_O-y3pn9YJcl3A637KvgYpq6tzBL71_37pKeYpqbGotAY2F9ftquDtN12RJ5lKkh_0AY01Pvcgm2E"
		 }, 
		 {
		  profile_tagline: "Internet Entrepreneur looking for Co-founders.", 
		  profile_name: "He Kangyu", 
		  profile_title: "Aspiring Actuary | Leadership with Professionalism", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_uMN4t0cdCtbEu0BAuU6Ity-6m1lQ2y9AaZ8btyNzl95n143lhxkqpphR8gAM7UcjSsn6gREMAG5v"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Angie L", 
		  profile_title: "-", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_A8PuXPegKDB7cq7n1FA0XrOOrf-xB-On1bb1XrfhfW67end9gQ_8EKUaOGt8qz0sr_ltIBluUdAp"
		 }, 
		 {
		  profile_tagline: "Investor looking to for startups to fund", 
		  profile_name: "Spencer Nai", 
		  profile_title: "Sales Executive at Leeden Limited", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_M5umgF4An-Sani32MGOjg5exNAdhnLA2c3ZAgkRawqjAWT6uz_yC1X7hsxWOzGrhZQmKtiWgzjsJ"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Yu Tse Chi", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_zVbmG335jjZ8uNr9c0LgGCzLAy0Aucl9cZPAGC1ZaMIhPPQnMpBCuGbn0-xffrKVqJ5KDLDInbe1"
		 }, 
		 {
		  profile_tagline: "Here know more about the entrepreneur space", 
		  profile_name: "Aaron Leow", 
		  profile_title: "Chief Investment Officer", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_N-oHBQAhbTZ-0eDpqNdBBXh7FCfO0eypVnOBBXGO4bRfh2wy4qVXJknrd27hy7grvAH9Z_p3-dPy"
		 }, 
		 {
		  profile_tagline: "Global distributors for green tech products", 
		  profile_name: "chew barry", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0__gnH4ZhqG53c70SuiYbR4RGqCikUf0pu3sCB4Rhqg6KwrUI2fUQXnUNVuSXku4j8CYN9cyOP0nZX"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Jeremy Koh", 
		  profile_title: "Financial Consultant at Prudential Assurance Company Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_vtozjC-hwK0lymk3RzE6jhCmwNRjYek3R9OEj3TgN-fDT2PTJNVJPTzP5MUGj75DNlHI-QPC3HLy"
		 }, 
		 {
		  profile_tagline: "Engineer providing on-site technical assistance at booth", 
		  profile_name: "Jerry Ng", 
		  profile_title: "Brand Executive at HOC Watches", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_b-xGLe_1BwZcl3pZ5vfALIh-cWSMPC2Z51wgLoT_HuMeu6R4Iq7awEzSJFDbr5DNQAgpoSxdvBFC"
		 }, 
		 {
		  profile_tagline: "Entrepreneur looking for tech writers", 
		  profile_name: "Ethan Kho Eng Kien", 
		  profile_title: "Graduate Associate at DBS Bank", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_0-CI4Pb0_58pApg8lvrZ4AbYi8NSPVg8jznN4AXfp58yuYEhPqtFnlK3DaqPrjyuOA8zcnVycp6T"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Clement Mohyong", 
		  profile_title: "--", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_N-oHBbPOIGjYgmjp9PJBBX_iFCfO0eypn1OBBXGO4bRfh2wy4qVXJknrd27hy7grvAH9Z_KXq_hy"
		 }, 
		 {
		  profile_tagline: "Business Developer looking to network", 
		  profile_name: "Hee Youn Shim", 
		  profile_title: "Student at National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_xjj5Wtvs6EtThE7L0sxnWrXsXWNuCu7LgVdVWA6FRu8ggHZ51RDWFltdoFqt3wmdYO0UQnqoi_Rs"
		 }, 
		 {
		  profile_tagline: "Serial Entrepreneur looking to provide mentorship", 
		  profile_name: "Shawn Tan", 
		  profile_title: "Digital Account Executive at Carbon Interactive", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_7bH7EYy8cWKcJCmkShZpEjpmBacQMF0k3iprEjV0eIiBQ_HXiT4_XgmAM8BZVhOemkol5sHqXcBk"
		 }, 
		 {
		  profile_tagline: "Looking for possible collaboration", 
		  profile_name: "Jinshun Lim", 
		  profile_title: "Intern at GetQuik", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_-zC9rz1lDPL-Apz0rNPWrnGx7-CtlVL0KqnWrBAuKAnCmY-xY1tVYc5CTsGS-jX1198H0r7hMQ8S"
		 }, 
		 {
		  profile_tagline: "Tech writer hoping to help startups with publicity", 
		  profile_name: "Le Wei Boon", 
		  profile_title: "Intern at ST Electronics (Satellite Systems)", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_uXLP60dhOehoRnezuC9u6y4fOH-bMzdzmLA26y4x3D6nQlOvhGzxepulrQtMV-HJSFFSdRQYN6q9"
		 }, 
		 {
		  profile_tagline: "Looking for distributors in SEA region", 
		  profile_name: "Felicia Pan", 
		  profile_title: "Engineer at SembCorp Utilities", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0__by8vYx-vLL9v6a1i6U0vjV0v6tnz_a1TQe0vjpGEiQboFJPfTuuRge2Ue-enkf0CkYYssmylw6S"
		 }, 
		 {
		  profile_tagline: "Looking to share information about our latest products", 
		  profile_name: "Juliana Yee", 
		  profile_title: "Attended National University of Singapore", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_-RFTK-AH1Nnt2v8trJbYKlPw1qA1m98trp1OKlrR2ALGltB-YjcSOAkzjslDDATY14Lxx9CbVJaG"
		 }, 
		 {
		  profile_tagline: "Angel investor hoping to share experience", 
		  profile_name: "Alvynn Wong", 
		  profile_title: "Operation Executive at Vinicole Asia Pte Ltd", 
		  profile_photo: "http://m.c.lnkd.licdn.com/mpr/mprx/0_xjj5WtbbQd-CGuxLj0VVWrBsXWNuCu7LgVdVWA6FRu8ggHZ51RDWFltdoFqt3wmdYO0UQn40G4Ys"
		 }
		]
	}; // this array will hold the data


	// Initial data binding to DOM elements
	$scope.fb_match_profile_name = $scope.profile_stack.profile[0].profile_name;
	$scope.fb_match_profile_photo = $scope.profile_stack.profile[0].profile_photo;
	$scope.fb_match_profile_title = $scope.profile_stack.profile[0].profile_title;
	$scope.fb_match_profile_tagline = $scope.profile_stack.profile[0].profile_tagline;

	$scope.clickLater = function() {

		// start later_animation
		$($('.profile_carousel')[0]).addClass('later_animation');
		$($('.fb_match_progressbar')[0]).removeClass('ng-hide');

		// after the animation is done hide it again
		setTimeout(function() {
			$($('.profile_carousel')[0]).removeClass('later_animation');
			$($('.profile_carousel')[0]).addClass('expand_animation');
			setTimeout(function() {
				$($('.profile_carousel')[0]).removeClass('expand_animation');
				$($('.fb_match_progressbar')[0]).addClass('ng-hide');
			}, 200);
		}, 200);
		
		// two way data binding is updated here 
		$scope.clickAll_count++;
	
		if ( $scope.clickAll_count == $scope.profile_stack.profile.length) {
			$scope.clickAll_count = 0; //reset profile stack to top
		}

		// Filter button comes up after a few swipes
		if ( $scope.clickAll_count > 5 ) {
			$($('.fb_match_profile_filter_button')[0]).removeClass('ng-hide');
		}
		$scope.fb_match_profile_name = $scope.profile_stack.profile[$scope.clickAll_count].profile_name;
		$scope.fb_match_profile_photo = $scope.profile_stack.profile[$scope.clickAll_count].profile_photo;
		$scope.fb_match_profile_title = $scope.profile_stack.profile[$scope.clickAll_count].profile_title;
		$scope.fb_match_profile_tagline = $scope.profile_stack.profile[$scope.clickAll_count].profile_tagline;

	}

	$scope.clickMeet = function() {
		

		// start meet_animation
		$($('.profile_carousel')[0]).addClass('meet_animation');
		$($('.fb_match_progressbar')[0]).removeClass('ng-hide');
		// after the animation is done hide it again
		setTimeout(function() {
			$($('.profile_carousel')[0]).removeClass('meet_animation');
			$($('.profile_carousel')[0]).addClass('expand_animation');
			setTimeout(function() {
				$($('.profile_carousel')[0]).removeClass('expand_animation');
				$($('.fb_match_progressbar')[0]).addClass('ng-hide');
			}, 200);
		}, 200);


		$scope.clickMeet_count++;
		$scope.clickAll_count++;
		
		// two way data binding is updated here
		if ( $scope.clickAll_count == $scope.profile_stack.profile.length) {
			$scope.clickAll_count = 0; //reset profile stack to top
		}

		// Filter button comes up after a few swipes
		if ( $scope.clickAll_count > 5 ) {
			$($('.fb_match_profile_filter_button')[0]).removeClass('ng-hide');
		}


		// Match mockup comes after 10
		if ( $scope.clickAll_count == 10 || $scope.clickAll_count == 14 ) {
			$scope.openModal(); // make open modal accept an object that has information it needs to open 
		}

		$scope.fb_match_profile_name = $scope.profile_stack.profile[$scope.clickAll_count].profile_name;
		$scope.fb_match_profile_photo = $scope.profile_stack.profile[$scope.clickAll_count].profile_photo;
		$scope.fb_match_profile_title = $scope.profile_stack.profile[$scope.clickAll_count].profile_title;
		$scope.fb_match_profile_tagline = $scope.profile_stack.profile[$scope.clickAll_count].profile_tagline;
	

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
* Modal Test
*/
fbApp.directive('testmodal', function() {
	return {
		// there's no scoping. the functions defined in modal controller is
		// global
		restrict: 'E',
		templateUrl:'templates/modal.html',
		controller: function($scope,$http) {

			// close modal and unblur
			$scope.closeModal = function() {
		
				$($('testmodal')[0]).addClass('ng-hide');
				
				//$($('.blur_container')[0]).removeClass('fb_modal_blur');
			}

			$scope.openModal = function() {

				$($('testmodal')[0]).removeClass('ng-hide');
				$($('testmodal')[0]).addClass('expand_animation');
				/*setTimeout(function(){
					$($('.blur_container')[0]).addClass('fb_modal_blur');
				}, 800);*/
			}
		}
	}
});

/***
* Event Page Controller
***/
fbApp.controller("EventPageController", function($scope,$http) {

});

/***
* Event Modal
*/
fbApp.directive('eventinfomodal', function() {
	return {
		// there's no scoping. the functions defined in modal controller is
		// global
		restrict: 'E',
		templateUrl:'templates/event_info_modal.html',
		controller: function($scope,$http) {

			// close modal and unblur
			$scope.closeEventModal = function() {
		
				$($('eventinfomodal')[0]).addClass('ng-hide');
				
				//$($('.blur_container')[0]).removeClass('fb_modal_blur');
			}

			$scope.openEventModal = function() {

				$($('eventinfomodal')[0]).removeClass('ng-hide');
				$($('eventinfomodal')[0]).addClass('expand_animation');
				/*setTimeout(function(){
					$($('.blur_container')[0]).addClass('fb_modal_blur');
				}, 800);*/
			}
		}
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