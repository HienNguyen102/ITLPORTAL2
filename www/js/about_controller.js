app.controller('AboutController', function($scope, $ionicLoading, AboutService){
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    AboutService.getAbout(function (aboutInfo) {
        $scope.aboutInfo = aboutInfo;
        $ionicLoading.hide();
    });
});