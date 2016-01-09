app.controller('MapCtrl', function ($scope, $ionicLoading, $stateParams, $cordovaGeolocation, $ionicPopup, $ionicHistory) {
    console.log("mapctrl");

    debugger;
    var address = decodeURIComponent($stateParams.address);
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    var myLatlng = new google.maps.LatLng(10.800702, 106.686069);
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //debugger;
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        $ionicLoading.hide();
        if (status === google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            $scope.map = map;
        } else {
            var mapPopup = $ionicPopup.show({
                template: 'Không thể xác định vị trí trên bản đồ',
                title: 'Lỗi',
                buttons: [
                    {
                        text: '<b>Quay lại</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            $ionicHistory.goBack();
        }
      },
                    {
                        text: 'Hủy'
                    }
    ]
    });
        }
    });
});
app.controller('MapMenuCtrl', function ($scope, $ionicLoading, $stateParams, $cordovaGeolocation) {
    /*if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
        alert("Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude)
    }*/
    $scope.getLocation = function () {
        console.log("getLoation()");
        /*var posOptions = {
            enableHighAccuracy: false
        };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var lat = position.coords.latitude
                var long = position.coords.longitude
                alert("lat: " + lat + " long: " + long);
            }, function (err) {
                alert("loi");
            });*/
        /*plugin.google.maps.external.launchNavigation({
            "from": "Tokyo, Japan",
            "to": "Kyoto, Japan"
        });*/
        var map;
        var div = document.getElementById("map_canvas");

        // Initialize the map view
        map = plugin.google.maps.Map.getMap(div);

        // Wait until the map is ready status.
        map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
    }

    function onMapReady() {
        /*var button = document.getElementById("button");
        button.addEventListener("click", onBtnClicked, false);*/
        alert("onMapReady");
    }

    /*function onBtnClicked() {
        map.showDialog();
    }*/


});