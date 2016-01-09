app.controller('AppCtrl', function ($scope, $cordovaCamera, $cordovaCapture, $cordovaMedia, $state, $ionicLoading, $rootScope, $cordovaNetwork, $cordovaGeolocation) {
    $scope.countImagesCapture = 0;
    $scope.takePicture = function () {
        var options = {
            quality: 40,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.PNG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            /* $ionicLoading.show({
                 templateUrl: 'templates/loading.html',
                 animation: 'fade-in',
                 showBackdrop: true,
                 maxWidth: 200,
                 showDelay: 0
             });*/
            $scope.lastTakePhoto = "data:image/png;base64," + imageData;
            $scope.countImagesCapture = 1;
            $scope.imageDataBase64 = imageData;
            //$ionicLoading.hide();
        }, function (err) {
            // error
        });

    };
    $scope.checkNetWork = function () {
        var type = $cordovaNetwork.getNetwork();

        var isOnline = $cordovaNetwork.isOnline();
        var isOffline = $cordovaNetwork.isOffline();
        $scope.isOnline = isOnline;
        $scope.isOffline = isOffline;
        if (isOffline) {
            alert("Không có kết nối mạng, hãy bật kết nối");
            //Hide loading
            $ionicLoading.hide();
            return;
        }

        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
            var onlineState = networkState;
            $scope.isOnline = true;
            $scope.isOffline = false;
            //alert(onlineState);
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {

            $scope.isOnline = false;
            $scope.isOffline = true;
            var offlineState = networkState;
            alert("Không có kết nối mạng, hãy bật kết nối");
            $ionicLoading.hide();
            return;
        })
    };
});
app.controller('HomeCtrl', function ($scope) {});
app.controller('MainCtrl', function ($scope) {});

app.controller('MenuCtrl', function ($scope, $ionicSideMenuDelegate, $ionicModal, $location, $ionicPopover, $ionicPopup, $ionicLoading, $state, UserService) {
    //Khoi tao form tao meeting
    $ionicModal.fromTemplateUrl('templates/meeting/editview.html', function (meetingModal) {
        $scope.meetingModal = meetingModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
    });

    $scope.openModal = function () {
        $scope.meetingModal.show();
    };
    $scope.closeModal = function () {
        $scope.meetingModal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.meetingModal.remove();
    });
    // Execute action on hide modal
    $scope.$on('meetingModal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('meetingModal.removed', function () {
        // Execute action
    });
    //$location.path("main/menu/home");
    //CallModal
    $ionicModal.fromTemplateUrl('templates/call/addCallView.html', function (addCallModal) {
        $scope.addCallModal = addCallModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
    });

    $scope.openAddCallModal = function () {
        $scope.addCallModal.show();
    };
    $scope.closeAddCallModal = function () {
        $scope.addCallModal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.addCallModal.remove();
    });
    
    //AddComplaint Modal
    $ionicModal.fromTemplateUrl('templates/booking/addComplaintView.html', function(addComplaintModal){
        $scope.addComplaintModal = addComplaintModal;
    },{
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
    });
    $scope.openAddComplaintModal = function() {
        $scope.addComplaintModal.show();
    };
    $scope.closeAddComplaintModal = function() {
        $scope.addComplaintModal.hide();
    };
    $scope.$on('$destroy', function(){
        $scope.addComplaintModal.remove();
    });
    var userInfo = JSON.parse(JSON.parse(localStorage.getItem('data')).userInfo);
    $scope.customerName = userInfo.name;

    // Tao toggle de thu gon giao dien
    $scope.toShow = false;
    $scope.iconToggle = 'down';
    $scope.clickToShow = function () {
        if ($scope.toShow) {
            $scope.iconToggle = 'down';
            $scope.toShow = false;
        } else {
            $scope.iconToggle = 'up';
            $scope.toShow = true;
        }
    }


    // Khởi tạo form đổi mật khẩu
    $scope.showPopupChangePassword = function () {
        // An elaborate, custom popup
        $scope.passwordinfo = {};
        var popUpChangePassword = $ionicPopup.show({
            templateUrl: 'templates/user/changepassword.html',
            title: 'Đổi mật khẩu',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Lưu lại</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.passwordinfo.old_password || !$scope.passwordinfo.new_password || $scope.passwordinfo.new_password != $scope.passwordinfo.confirm_new_password) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            this.close();
                            $ionicLoading.show({
                                templateUrl: 'templates/loading.html',
                                animation: 'fade-in',
                                showBackdrop: true,
                                maxWidth: 200,
                                showDelay: 0
                            });
                            UserService.changePassword($scope.passwordinfo, function (result) {
                                $ionicLoading.hide();
                                if (result == 'invalid') {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Thông báo',
                                        template: 'Mẫu khẩu cũ không đúng'
                                    });
                                } else {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Thông báo',
                                        template: 'Đổi mật khẩu thành công'
                                    });
                                    alertPopup.then(function (res) {
                                       $state.go('main.logout');
                                    });
                                }
                            });
                        }
                    }
      },
                {
                    text: 'Hủy bỏ'
                }
    ]
        });

    };

});