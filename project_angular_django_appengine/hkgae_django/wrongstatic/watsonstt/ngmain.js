//angular.element(document).ready( function() { });
//var app = angular.module("myShoppingList", ["ngCookies", "ngRoute"]);
//app.config( [ '$httpProvider', '$interpolateProvider', function($httpProvider, $interpolateProvider) {
//        $interpolateProvider.startSymbol('{$');
//        $interpolateProvider.endSymbol('$}');
//        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//    }]); 
//app.run(['$http', '$cookies', function($http, $cookies) {
//  $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
//}]);

var app = angular.module("myShoppingList", ["ngRoute"]);
app.config( function($httpProvider, $interpolateProvider, $routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when("/enterword", {
	  templateUrl: "/static/watsonstt/enterword.html",
	      controller: "wordCtrl",
  });
  $routeProvider.when("/multiword", {
	  templateUrl: "/static/watsonstt/multi.html",
	      controller: "multiCtrl",
  });
//  $routeProvider.when("/multi2", {
//	  templateUrl: "/static/watsonstt/m1.html",
//	      controller: "extraCtrl",
//  });
  $routeProvider.when("/singleword", {
	  templateUrl: "/static/watsonstt/single.html",
	      controller: "singleCtrl",
  });
  $routeProvider.when("/uplod", {
	  templateUrl: "/static/watsonstt/uplod1.html",
	      controller: "uploadCtrl",
  });
  /////////////////////////
  $interpolateProvider.startSymbol('{$');
  $interpolateProvider.endSymbol('$}');
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }); 
//goto, http://stackoverflow.com/questions/12505760/processing-http-response-in-service
app.factory("hkdata", function ($http) {
	return {
	    getData: function() {
		//		var promise = $http.get( 'http://127.0.0.1:8000/watson/newwordlist/' ).then( function (response) {
		var promise = $http.get( 'http://localhost:8080/watson/newwordlist/' ).then( function (response) {
			    console.log( "fucking hkdata successful "  );
			    return response.data;
			} );
		return promise;
	    }
	}
    });

app.controller("wordCtrl", function($scope, $http, hkdata) {

	$scope.itemselected = false;
	
	hkdata.getData().then(function(d) {
		$scope.fuckdata = d;
		for ( var i = 0; i < $scope.fuckdata.length; i++) {
		    $scope.fuckdata[i].selected = false;
		}
		console.log( "fucking fucking length = " + d.length );
	    });

	//for ( var i = 0; i < $scope.fuckdata.length; i++) {
	//console.log( "fucking fucking word = " + $scope.fuckdata[i].word );
	//}


	$scope.hkarray2  = [];
	$scope.hkobject2 = {words: $scope.hkarray2 };
	    
	$scope.products = [];
	$scope.sounds = [];

	$scope.fuckyou = function (item, idx) {
	    console.log( "fucking index = " + idx );
	    $scope.temp = item;
	    $scope.hkid = item.hkid;
	    $scope.sounds = item.sond;
	}
	
	$scope.addTemp = function (idx) {
	    tempjson = $scope.fuckdata[idx];
	    console.log( "fucking name Temp = " + tempjson.test );
	    tempjson.sond.push( tempjson.test );
	};
	$scope.removeTemp = function (itemsond, idy) {
	    itemsond.splice(idy, 1);
	    //$scope.sounds.splice(x, 1);
	};



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
	    $scope.products = [];
		
	};

	$scope.pop = function () {
	    $scope.hkarray2.pop();
	};


	$scope.deleteyou = function(item) {
	    $scope.code     = null;
	    $scope.response = null;

	    console.log( "item id to delete = " + item.hkid );

	    var hkobject1 = {};
	    hkobject1["hkid"] = item.hkid;
	    var req = {
		method: 'POST',
		//		url: 'http://127.0.0.1:8000/watson/newworddelete/',
		url: 'http://localhost:8080/watson/newworddelete/',
		headers: {
		    'Content-Type': undefined
		},
		data: hkobject1
	    }
	    
	    $http(req).
	    then(function(response) {
		    $scope.status = response.status;
		    $scope.data = response.data;
		    
		    hkdata.getData().then(function(d) {
			    $scope.fuckdata = d;
			    console.log( "fucking fucking length = " + d.length );
			});
		    
		}, function(response) {
		    $scope.data = response.data || 'Request failed';
		    $scope.status = response.status;
		});
	};



	$scope.send2modify = function( idx ) {
	    $scope.code     = null;
	    $scope.response = null;

	    tempjson = $scope.fuckdata[idx];

	    var hkobject1 = {};
	    hkobject1["hkid"] = tempjson.hkid;
	    hkobject1["Word"] = tempjson.word;
	    hkobject1["Disp"] = tempjson.disp;
	    hkobject1["soundslikearray"] = tempjson.sond;
	    
	    var req = {
		method: 'POST',
		//		url: 'http://127.0.0.1:8000/watson/newwordsave/',
		url: 'http://localhost:8080/watson/newwordsave/',
		headers: {
		    'Content-Type': undefined
		},
		data: hkobject1
	    }
	    
	    $http(req).
	    then(function(response) {
		    $scope.status = response.status;
		    $scope.data = response.data;
		    
		    hkdata.getData().then(function(d) {
			    $scope.fuckdata = d;
			    console.log( "fucking fucking length = " + d.length );
			});
		    
		}, function(response) {
		    $scope.data = response.data || 'Request failed';
		    $scope.status = response.status;
		});
	};

	
	$scope.send2django = function() {
	    $scope.code     = null;
	    $scope.response = null;

	    var hkobject1 = {};
	    hkobject1["Word"] = $scope.theword;
	    hkobject1["Disp"] = $scope.thedisp;
	    hkobject1["soundslikearray"] = $scope.products;
	    
	    var req = {
		method: 'POST',
		//		url: 'http://127.0.0.1:8080/watson/newwordsave/',
		url: 'http://localhost:8080/watson/newwordsave/',
		headers: {
		    'Content-Type': undefined
		},
		data: hkobject1
	    }
	    
	    $http(req).
	    then(function(response) {
		    $scope.status = response.status;
		    $scope.data = response.data;
		    
		    hkdata.getData().then(function(d) {
			    $scope.fuckdata = d;
			    console.log( "fucking fucking length = " + d.length );
			});
		    
		}, function(response) {
		    $scope.data = response.data || 'Request failed';
		    $scope.status = response.status;
		});
	};
	
	
    });



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
		    //		    url: 'http://127.0.0.1:8000/watson/angularcred/',
		    url: 'http://localhost:8080/watson/angularcred/',
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
		    //		    url: 'http://127.0.0.1:8000/watson/angularcust/',
		    url: 'http://localhost:8080/watson/angularcust/',
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
		    //		    url: 'http://127.0.0.1:8000/watson/getcred/',
		    url: 'http://localhost:8080/watson/getcred/',
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
	    //	    hkinitcred();

    // this is for initializing the customization data
	    var hkinitcust = function() {
		$scope.code     = null;
		$scope.response = null;
		var req = {
		    method: 'GET',
		    //		    url: 'http://127.0.0.1:8000/watson/getcust/',
		    url: 'http://localhost:8080/watson/getcust/',
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
	    //	    hkinitcust();

	}]);


app.factory("cart", function () {

	    var cartData = [];
	    return {
		addProduct: function (hkword, hkdisp, hksounds) {
		    var addedToExistingItem = false;
		    if (!addedToExistingItem) {
			cartData.push(  {'word': hkword, 'disp': hkdisp, 'sounds': hksounds}  );
		    }
		},
		    getProducts: function () {
		    console.log( "fucking cartdata = " + cartData );
		    return cartData;
		}
	    }
    }).directive("cartSummary", function (cart) {
	    return {
		restrict: "E",
		    templateUrl: "/static/watsonstt/cartSummary.html",
		    controller: function ($scope) {

		    var cartData = cart.getProducts();
		    $scope.total = function () {
			return cartData;
		    }
		}
	    };
	});


//goto
app.controller("multiCtrl", ['$scope', '$http', 'cart', function($scope, $http, cart) {

	    $scope.worddata = {};
            var hkinitcust = function() {
                $scope.code     = null;
                $scope.response = null;
		var req = {
                    method: 'GET',
		    //                    url: 'http://127.0.0.1:8000/watson/newwordlist/',
                    url: 'http://localhost:8080/watson/newwordlist/',
                    headers: {
                        'Content-Type': undefined
                    },
                }
                $http(req).
                then(function(response) {
                        $scope.status    = response.status;
                        $scope.worddata  = response.data;
                    }, function(response) {
                        $scope.data   = response.data || 'Request failed';
                        $scope.status = response.status;
                    });
            };
            hkinitcust();

	    $scope.addProductToCart = function (product) {
		cart.addProduct( product.word, product.disp, product.sond );
	    }

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

    //    xhr.open("POST", "http://127.0.0.1:8000/watson/filetest2/", true);
    xhr.open("POST", "http://localhost:8080/watson/filetest2/", true);
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