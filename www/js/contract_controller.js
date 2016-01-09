app.controller('ListContractCtrl', function ($scope, $ionicLoading, UserService, ContractService, Language, $ionicFilterBar) {
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    ContractService.getContractList(function (result) {
         var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
        Language.getOptions(sessionId, 'app_list_strings', 'contract_status_list',function (contractOptions){
            $scope.contractList = result.entry_list;
            $scope.contractOptions = contractOptions;
            $ionicLoading.hide();
        });
    });
    var fbInstance;
    $scope.showFilterBarContract = function () {
        fbInstance = $ionicFilterBar.show({
            items: $scope.contractList,
            update: function (filteredItems, filterText) {
                $scope.contractList = filteredItems;
                if (filterText) {
                }
            },
            cancelText: "Hủy bỏ"
        });
    };
});
app.controller('ViewContractCtrl', function ($scope, ContractService, Language, $stateParams, $ionicLoading) {
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    ContractService.getContractById($stateParams.id, function (result) {
         var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
        Language.getOptions(sessionId, 'app_list_strings', 'contract_status_list',function (contractOptions){
            $scope.contract = result;
            $scope.contractOptions = contractOptions;
            $ionicLoading.hide(); 
        });
    });

});