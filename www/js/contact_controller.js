app.controller('ContactListController', function($scope, $ionicLoading, ContactService){
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    ContactService.getContactList(function (contactList) {
        $scope.contacts = contactList;
        $ionicLoading.hide();
    });
});