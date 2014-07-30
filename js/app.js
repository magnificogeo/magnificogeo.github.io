// Instantiate an angular object for the main app
// Current dependencies: None
var fbApp = angular.module('fbApp',['ngRoute']); 

/**
* Routes for front-end. Invoked via the ng-view attribute in DOM
*/

fbApp.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : 'event.html',
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