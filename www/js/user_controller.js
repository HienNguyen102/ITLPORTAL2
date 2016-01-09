app.controller('LoginCtrl', function ($scope, $cookies, $cookieStore, $ionicLoading, $ionicPopup, $location, $state, UserService) {
    $scope.login = function (data) {
        $ionicLoading.show({
            templateUrl: 'templates/loading.html',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        var sessionId = "";
        UserService.login(data.user_name, data.password, function (result) {
            $ionicLoading.hide();
                debugger;
            var userName = data.user_name;
            if (result.id != null) {
                if (data.isChecked) {
                    // Save login info to use
                    var dataLogin = {
                        username: userName,
                        password: data.password,
                    };
                    dataLogin = JSON.stringify(dataLogin);
                    localStorage.setItem('dataLogin', dataLogin);
                }
                UserService.getUserInfo(result.id, result.name_value_list.user_id.value, function (userInfo) {
                    var data = {
                        sessionId: result.id,
                        userId: result.name_value_list.user_id.value,
                        userInfo: userInfo,
                        user_name: userName,
                    };
                    localStorage.setItem("data", JSON.stringify(data));
                    //UserService.sendUserIdForPushNoti();
                    $state.go('main.menu.quotations');
                });
            } else {
                $ionicPopup.alert({
                    title: 'Thông báo',
                    subTitle: 'Tên đăng nhập hoặc mật khẩu không đúng',
                });
            }
        });

    }
    if (localStorage.getItem('dataLogin') != null) {
        $ionicLoading.show({
            templateUrl: 'templates/loading.html',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        UserService.autoLogin(function(response){
            if (response.id != null) {
                var data = JSON.parse(localStorage.getItem('data'));
                //rewrite session
                data.sessionId = response.id;
                localStorage.setItem("data", JSON.stringify(data));
                $ionicLoading.hide();
                $state.go('main.menu.quotations');
            } else {
                localStorage.removeItem('dataLogin');
            }
    });
}

});

app.controller('LogoutCtrl', function ($state) {
    localStorage.removeItem('data');
    localStorage.removeItem('dataLogin');
})

app.controller('ViewProfileCtrl', function ($scope, $ionicLoading, $ionicModal) {
    //Khoi tao form cập nhật thông tin cá nhân
    $ionicModal.fromTemplateUrl('templates/user/editview.html', function (userModal) {
        $scope.userModal = userModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
    });

    $scope.openModal = function () {
        $scope.userModal.show();
    };
    $scope.closeModal = function () {
        $scope.userModal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.userModal.remove();
    });
    // Execute action on hide modal
    $scope.$on('userModal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('userModal.removed', function () {
        // Execute action
    });
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    var userInfo = JSON.parse(JSON.parse(localStorage.getItem('data')).userInfo);
    $scope.userInfo = userInfo;
    $ionicLoading.hide();
});

app.controller('EditProfileCtrl', function ($scope, $ionicLoading, $ionicPopup, UserService) {
    $scope.updateProfile = function (data) {
        $ionicLoading.show({
            templateUrl: 'templates/loading.html',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        UserService.updateProfile(data, function (response) {
            // Success
            if (response != "") {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Thông báo',
                    template: '<b style="text-align:center;">Cập nhật thành công</b>',
                }).then(function (res) {
                    $scope.userModal.hide();
                    // Lay lai thong tin nguoi dung
                    var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
                    var userId = JSON.parse(localStorage.getItem('data')).userId;
                    $ionicLoading.show({
                        templateUrl: 'templates/loading.html',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
                    UserService.getUserInfo(sessionId, userId, function (userInfo) {
                        var data = {
                            sessionId: sessionId,
                            userId: userId,
                            userInfo: userInfo
                        };
                        localStorage.setItem("data", JSON.stringify(data));
                        $ionicLoading.hide();
                        $state.go('main.menu.viewprofile');

                    });
                });
            } else {
                // Error
                $ionicPopup.alert({
                    title: 'Thông báo',
                    template: 'Đã xảy ra lỗi, vui lòng thử lại !'
                });
            }
            $ionicLoading.hide();
        });
    }
});
