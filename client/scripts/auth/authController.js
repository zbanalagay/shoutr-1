angular.module('shoutr.auth', [])

.controller('authController', ['$scope', '$window', '$location', 'Users', function($scope, $window, $location, Users){

	$scope.signupData = {
		user: {
			email: 'asd@asd.confirm',
			username: '',
			password: ''
		}
	};

	$scope.loginData = {
		user: {
			username: '',
			password: ''
		}
	};

  $scope.error = {
  };

	$scope.userSignedup = false;

  $scope.signup = function() { 
  	// LOW PRIORITY TODO: add confirm password to signup view, and logic to accomodate it here
  
    if ($scope.signupData.user.password === undefined) {
      $scope.error.status = "Password must be 6-18 characters in length.";
      return;
    }

    if ($scope.signupData.user.username === undefined) {
      $scope.error.status = "Username must be 5-10 characters in length.";
      return;
    } 
      
    else {
      Users.signup($scope.signupData.user).then(function(response){
        if (response.status === 200) {
          // TODO: begin session here $window.localStorage.setItem
          console.log("response is", response);
          $scope.userSignedup = true;
          $location.path('/#/newsfeed');
        } 

        if (response.status === 409) {
          $scope.error.status = "Sorry, that username has already been taken.";
        }
      });
    }


  	
  }



  $scope.login = function() {
  	console.log("here's the login data", $scope.loginData.user);
  	Users.login($scope.loginData.user).then(function(response) {
  		if (response.status === 200) {
  			$location.path('/#/newsfeed');
  		} else {
  			//TODO: figure out how to handle this case 
  			console.log('problem with login');
        // $scope.error.status = 
      }
  	})
  }

}])








