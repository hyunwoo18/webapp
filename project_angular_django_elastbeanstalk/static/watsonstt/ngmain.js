//angular.element(document).ready( function() { });

var app = angular.module("myShoppingList", ["ngCookies", "ngRoute"]);

app.config( function($httpProvider, $interpolateProvider, $routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.when("/multi", {
	  templateUrl: "/static/watsonstt/m1.html",
	      controller: "extraCtrl",
  });

  $routeProvider.when("/singl", {
	  templateUrl: "/static/watsonstt/singl3.html",
	      controller: "singleCtrl",
  });

  $routeProvider.when("/uplod", {
	  templateUrl: "/static/watsonstt/uplod1.html",
	      controller: "uploadCtrl",
  });

  $interpolateProvider.startSymbol('{$');
  $interpolateProvider.endSymbol('$}');
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }); 

app.config( [ '$httpProvider', '$interpolateProvider', function($httpProvider, $interpolateProvider) {
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }]); 


app.run(['$http', '$cookies', function($http, $cookies) {
  $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
}]);

app.controller("myCtrl", ['$scope', '$http', function($scope, $http) {

	    $scope.showbasics = false;
	    $scope.showBasics = function() {
		$scope.showbasics = true;
	    };
	    $scope.hideBasics = function() {
		$scope.showbasics = false;
	    };
	    


	    $scope.credinput = false;
	    $scope.custinput = false;

	    $scope.showCred = function() {
		$scope.credinput = true;
	    };
	    $scope.hideCred = function() {
		$scope.credinput = false;
	    };

	    $scope.showCust = function() {
		$scope.custinput = true;
	    };

	    $scope.hideCust = function() {
		$scope.custinput = false;
	    };

	    $scope.sendNewCred = function() {
		$scope.code     = null;
		$scope.response = null;

		var req = {
		    method: 'POST',
		    url: 'http://127.0.0.1:8000/watson/angularcred/',
		    headers: {
			'Content-Type': undefined
		    },
//       data: fd
		    data: {'username':$scope.newUsername, 'password': $scope.newPassword }
		}

		$http(req).
		then(function(response) {
			$scope.status    = response.status;
			$scope.creddata  = response.data;
		    }, function(response) {
			$scope.data = response.data || 'Request failed';
			$scope.status = response.status;
		    });
	    };

//////////////////////////////////////////////////////
	    $scope.sendNewCust = function() {
		$scope.code     = null;
		$scope.response = null;

		var req = {
		    method: 'POST',
		    url: 'http://127.0.0.1:8000/watson/angularcust/',
		    headers: {
			'Content-Type': undefined
		    },
		    data: {'name':$scope.newName, 'model': $scope.newModl, 'description': $scope.newDesc }
		}

		$http(req).
		then(function(response) {
			$scope.status    = response.status;
			$scope.custdata  = response.data;
		    }, function(response) {
			$scope.data = response.data || 'Request failed';
			$scope.status = response.status;
		    });
	    };
	    
	    // this is for initializing the credential data
	    var hkinitcred = function() {
		$scope.code     = null;
		$scope.response = null;
		var req = {
		    method: 'GET',
		    url: 'http://127.0.0.1:8000/watson/getcred/',
		    headers: {
			'Content-Type': undefined
		    },
		}
		$http(req).
		then(function(response) {
			$scope.status   = response.status;
			$scope.creddata     = response.data;
		    }, function(response) {
			$scope.data   = response.data || 'Request failed';
			$scope.status = response.status;
		    });
	    };
	    hkinitcred();

    // this is for initializing the customization data
	    var hkinitcust = function() {
		$scope.code     = null;
		$scope.response = null;
		var req = {
		    method: 'GET',
		    url: 'http://127.0.0.1:8000/watson/getcust/',
		    headers: {
			'Content-Type': undefined
		    },
		}
		$http(req).
		then(function(response) {
			$scope.status   = response.status;
			$scope.custdata  = response.data;
		    }, function(response) {
			$scope.data   = response.data || 'Request failed';
			$scope.status = response.status;
		    });
	    };
	    hkinitcust();

	}]);

app.controller("extraCtrl", ['$scope', '$http', function($scope, $http) {

	    $scope.hkarray2  = [];
	    $scope.hkobject2 = {words: $scope.hkarray2 };
	    
	    $scope.products = [];

	    $scope.addItem = function () {
		console.log( "fucking name = " + $scope.theword );
		$scope.products.push( $scope.addMe );
	    };
	    $scope.removeItem = function (x) {
		$scope.products.splice(x, 1);
	    };

	    $scope.append = function() {
		var hkobject3 = {};
		hkobject3["word"]            = $scope.theword;
		hkobject3["display_as"]      = $scope.thedisp;
		hkobject3["soundslikearray"] = $scope.products;
		
		$scope.hkarray2.push( hkobject3 );
		// reset
		$scope.products = [];
		
	    };

	    $scope.pop = function () {
		$scope.hkarray2.pop();
	    };

	    // end of append


	}]);

app.controller("singleCtrl", ['$scope', '$http', function($scope, $http) {

	    //$scope.theword = "HKWord";
	    //$scope.thedisp = null;
	    $scope.products = [];

	    //	    $scope.dataoption = {};
	    //	    $scope.dataoption["sounds_lik"] = $scope.products;
	    //	    $scope.dataoption["display_as"] = $scope.thedas;

	    $scope.addItem = function () {
		$scope.products.push($scope.addMe);
	    };
	    $scope.removeItem = function (x) {
		$scope.products.splice(x, 1);
	    };


	    $scope.append = function() {
		var hkobject3 = {};
		hkobject3["display_as"]  = $scope.thedisp;
		hkobject3["sounds_like"] = $scope.products;
		
		$scope.dataoption = hkobject3;
		$scope.products = [];
	
	    };


	}]);


app.controller("uploadCtrl", ['$scope', '$http', function($scope, $http) {

  var hkusername = null, hkpassword = null, hkcustomid = null, hkfile = null;

  var finalElem = document.getElementById("finalCheckButton")
  finalElem.addEventListener("click", getFinal, false);
  function getFinal() {
    var hkbool1 = false, hkbool2 = true, hkbool3 = true;

    if ( hkfile == null ) {
       console.log( "file not loaded yet" );
    } else {
       console.log( "fucking name loaded = " + hkfile.name );
       document.getElementById("divD").textContent = "filename = " + hkfile.name;
       hkbool1 = true;
    }

    if ( hkcustomid == null ) {
       console.log( "custom not loaded yet" );
    } else {
       console.log( "fucking customID = " + hkcustomid );
       document.getElementById("divE").textContent = "customid = " + hkcustomid;
       hkbool2 = true;
    }

    if ( hkusername != null && hkpassword != null ) {
       console.log( "both username and password are loaded" );
       console.log( "fucking username = " + hkusername );
       console.log( "fucking password = " + hkpassword );
       document.getElementById("divF").textContent = "username = " + hkusername + ":" + hkpassword;
       hkbool3 = true;
    } else {
       console.log( "username or password not loaded" );
    }

    if ( hkbool1 == true && hkbool2 == true && hkbool3 == true ) {
       var hkstr1 = "curl -u " +  hkusername + ":" + hkpassword + "-X POST" ;
       var hkstr2 = " -H Content-type application/json" + " --data-binary @" + hkfile.name;
       var hkurl1 = " https://stream.watsonplatform.net/speech-to-text/api/v1/customizations/";
       var hkurl2 = "/words";
       var hkfinalstring = hkstr1 + hkstr2 + hkurl1 + hkcustomid + hkurl2;
       document.getElementById("divG").textContent = hkfinalstring;
    }
  };

  var inputElement = document.getElementById("hkinputid");
  inputElement.addEventListener("change", handleFiles, false);
  function handleFiles() {
    var hkfiles = this.files;
    hkfile  = hkfiles[0];
    console.log( "file name = "+hkfile.name );
    var xhr = new XMLHttpRequest();
    var fd  = new FormData();

    xhr.open("POST", "http://127.0.0.1:8000/watson/filetest2/", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText); // handle response.
      }
    };

    fd.append('myFile', hkfile);
    xhr.send(fd);  // Initiate a multipart/form-data upload
  }

//  var hkfiles = document.getElementById('hkinputid').files;




	}]);