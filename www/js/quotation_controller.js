app.controller('ListQuotationCtrl', function ($scope, $ionicLoading, $stateParams, QuotationService, $ionicFilterBar) {
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
    var userInfo = JSON.parse(localStorage.getItem('data')).userInfo;
    var accountId = JSON.parse(userInfo).id;
    QuotationService.getQuoteList(sessionId, accountId, function (result) {
        $scope.quotelist = result.sort(function (a, b) {
            return new Date(b.quotation_date).getTime() - new Date(a.quotation_date).getTime()
        });
        $ionicLoading.hide();
    });
    var fbInstance;
    $scope.showFilterBarQuotation = function () {
        fbInstance = $ionicFilterBar.show({
            items: $scope.quotelist,
            update: function (filteredItems, filterText) {
                $scope.quotelist = filteredItems;
                if (filterText) {}
            },
            cancelText: "Hủy bỏ"
        });
    };
});

app.controller('ViewQuotationCtrl', function ($scope, $ionicLoading, $ionicModal, $stateParams, QuotationService, Language, UtilService) {
    var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
    var userInfo = JSON.parse(localStorage.getItem('data')).userInfo;
    var accountId = JSON.parse(userInfo).id;
    var quoteId = $stateParams.quoteid;
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    QuotationService.getQuotationById(sessionId, quoteId, function (result) {
        var routeList = result.routeList;
        var quotation = result.quotationInfo;
        UtilService.getPortList(sessionId, function (portList) {
            var portArray = portList;
            UtilService.getCommodityList(sessionId, function (commodityList) {
                var commodityArray = commodityList;
                Language.getOptions(sessionId, 'app_list_strings', 'branch_id_dom', function (branchOptions) {
                    var branchOptions = branchOptions;
                    UtilService.getUnitList(sessionId, function (unitList) {
                        var unitArray = unitList;
                        var data = {
                            quotation: quotation,
                            routeList: routeList,
                            portArray: portArray,
                            commodityArray: commodityArray,
                            unitArray: unitArray,
                            branchOptions: branchOptions
                        };
                        $scope.data = data;
                        // Gửi dữ liệu báo giá sang màn hình đặt chổ
                        localStorage.setItem('quoteData', JSON.stringify(data));
                        $ionicLoading.hide();
                    });
                });
            });
        });
    });

    // Khoi tao form dat cho
    $ionicModal.fromTemplateUrl('templates/booking/editview.html', function (bookingModal) {
        $scope.bookingModal = bookingModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
    });

    $scope.openModal = function (event) {
        $scope.routeId = $(event.target).attr('route-id');
        $scope.bookingModal.show();
    };
    $scope.closeModal = function () {
        $scope.bookingModal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.bookingModal.remove();
    });
    // Execute action on hide modal
    $scope.$on('bookingModal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('bookingModal.removed', function () {
        // Execute action
    });

});