app.controller('CreateBookingCtrl', function ($scope, $filter, $ionicLoading, $location, UtilService, BookingService) {
    // Set datetimepicker for booking date
    $scope.bookingDateObject = {
        titleLabel: 'Chọn ngày', //Optional
        todayLabel: 'Hôm nay', //Optional
        closeLabel: 'Đóng', //Optional
        setLabel: 'OK', //Optional
        setButtonType: 'button-assertive', //Optional
        todayButtonType: 'button-assertive', //Optional
        closeButtonType: 'button-assertive', //Optional
        inputDate: new Date(), //Optional
        mondayFirst: true, //Optional
        templateType: 'popup', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        from: new Date(2012, 8, 2), //Optional
        to: new Date(2018, 8, 25), //Optional
        callback: function (val) { //Mandatory
            bookingDateCallback(val);
        }
    };
    var bookingDateCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.bookingDateObject.inputDate = val;
        }
    };
    // Set datetimepicker for booking date
    $scope.dateOfShipmentObject = {
        titleLabel: 'Chọn ngày', //Optional
        todayLabel: 'Hôm nay', //Optional
        closeLabel: 'Đóng', //Optional
        setLabel: 'OK', //Optional
        setButtonType: 'button-assertive', //Optional
        todayButtonType: 'button-assertive', //Optional
        closeButtonType: 'button-assertive', //Optional
        inputDate: new Date(), //Optional
        mondayFirst: true, //Optional
        templateType: 'popup', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        from: new Date(2012, 8, 2), //Optional
        to: new Date(2018, 8, 25), //Optional
        callback: function (val) { //Mandatory
            dateOfShipmentCallback(val);
        }
    };
    var dateOfShipmentCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.dateOfShipmentObject.inputDate = val;
        }
    };
    // Set datetimepicker for booking date
    $scope.dateReceiptObject = {
        titleLabel: 'Chọn ngày', //Optional
        todayLabel: 'Hôm nay', //Optional
        closeLabel: 'Đóng', //Optional
        setLabel: 'OK', //Optional
        setButtonType: 'button-assertive', //Optional
        todayButtonType: 'button-assertive', //Optional
        closeButtonType: 'button-assertive', //Optional
        inputDate: new Date(), //Optional
        mondayFirst: true, //Optional
        templateType: 'popup', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        from: new Date(2012, 8, 2), //Optional
        to: new Date(2018, 8, 25), //Optional
        callback: function (val) { //Mandatory
            dateReceiptCallback(val);
        }
    };
    var dateReceiptCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.dateReceiptObject.inputDate = val;
        }
    };
    // Set datetimepicker for booking date
    $scope.datePackingObject = {
        titleLabel: 'Chọn ngày', //Optional
        todayLabel: 'Hôm nay', //Optional
        closeLabel: 'Đóng', //Optional
        setLabel: 'OK', //Optional
        setButtonType: 'button-assertive', //Optional
        todayButtonType: 'button-assertive', //Optional
        closeButtonType: 'button-assertive', //Optional
        inputDate: new Date(), //Optional
        mondayFirst: true, //Optional
        templateType: 'popup', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        from: new Date(2012, 8, 2), //Optional
        to: new Date(2018, 8, 25), //Optional
        callback: function (val) { //Mandatory
            datePackingCallback(val);
        }
    };
    var datePackingCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.datePackingObject.inputDate = val;
        }
    };


    // Set datetimepicker for booking date
    $scope.dateEndObject = {
        titleLabel: 'Chọn ngày', //Optional
        todayLabel: 'Hôm nay', //Optional
        closeLabel: 'Đóng', //Optional
        setLabel: 'OK', //Optional
        setButtonType: 'button-assertive', //Optional
        todayButtonType: 'button-assertive', //Optional
        closeButtonType: 'button-assertive', //Optional
        inputDate: new Date(), //Optional
        mondayFirst: true, //Optional
        templateType: 'popup', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        from: new Date(2012, 8, 2), //Optional
        to: new Date(2018, 8, 25), //Optional
        callback: function (val) { //Mandatory
            dateEndCallback(val);
        }
    };
    var dateEndCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.dateEndObject.inputDate = val;
        }
    };
    $scope.sendBooking = function (bookingData) {
        var quotationData = JSON.parse(localStorage.getItem('quoteData')).quotation;
        var routeList = JSON.parse(localStorage.getItem('quoteData')).routeList;
        var routeBooking = UtilService.getRouteInfoFromArray(routeList, $scope.routeId);
        var userInfo = JSON.parse(JSON.parse(localStorage.getItem('data')).userInfo);
        var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
        var bookingParams = {
            // Booking info
            truck_booking_account_code: bookingData.truck_booking_account_code,
            assigned_user_id: userInfo.assigned_user_id,
            truck_booking_date: $filter('date')($scope.bookingDateObject.inputDate, 'yyyy-MM-dd'),
            truck_tax_code: userInfo.tax_code, // chua set
            trucking_quote_id: quotationData.id.value,
            trucking_route_id: $scope.routeId,
            truck_port_from: routeBooking.port_from.value,
            truck_port_to: routeBooking.port_to.value,
            truck_transfer_type: quotationData.trucking_transfer_type.value,
            truck_unit: routeBooking.unit.value,
            truck_weight: routeBooking.weight_value.value,
            truck_commodity: quotationData.trucking_commodity.value,
            truck_quantity: bookingData.quantity,
            truck_position_receipt: routeBooking.port_receipt.value,
            truck_position_packing: routeBooking.port_transfer.value,
            truck_position_delivery: routeBooking.port_delivery.value,
            truck_status: (quotationData.stage.value == 'Hire') ? 'Hire' : 'CheckingInfo',
            trucking_broker_id: quotationData.trucking_broker_id.value,
            truck_sale_source: quotationData.sale_source_ddown.value,
            trucking_branch_id: quotationData.branch_id.value,
            trucking_is_quotation_rent: (quotationData.stage.value == 'Hire') ? 1 : 0,
            trucking_check_trial: (quotationData.stage.value == 'Trial') ? 1 : 0,
            trucking_check_merge: routeBooking.check_merge_quotation.value,
            trucking_supplier_id: (quotationData.stage.value == 'Hire' && routeBooking.supplier_id.value != '') ? routeBooking.supplier_id.value : '',
            trucking_ops_id: quotationData.user_ops_id.value,
            c_booking_accountsaccounts_ida: userInfo.id,
            // Contact Info
            billing_contact_id: quotationData.billing_contact_id.value,
            // Booking detail
            delivery_date: $filter('date')($scope.dateOfShipmentObject.inputDate, 'yyyy-MM-dd'),
            quantity: bookingData.quantity,
            remain: bookingData.quantity,
            receipt_date: $filter('date')($scope.dateReceiptObject.inputDate, 'yyyy-MM-dd'),
            date_packing_or_unload: $filter('date')($scope.datePackingObject.inputDate, 'yyyy-MM-dd'),
            end_date: $filter('date')($scope.dateEndObject.inputDate, 'yyyy-MM-dd'),
        };
        $ionicLoading.show({
            templateUrl: 'templates/loading.html',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        BookingService.createBooking(sessionId, bookingParams, function (bookingId) {
            $ionicLoading.hide();
            $scope.bookingModal.hide();
            $location.path('main/menu/viewbooking/' + bookingId);
        });
    }
});

app.controller('BookingListCtrl', function ($scope, $ionicLoading, Language, BookingService, $ionicFilterBar) {
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    var userInfo = JSON.parse(JSON.parse(localStorage.getItem('data')).userInfo);
    var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
    var accountId = userInfo.id;
    BookingService.getBookingList(sessionId, accountId, function (bookingList) {
        $scope.bookinglist = bookingList;
        Language.getOptions(sessionId, 'app_list_strings', 'booking_status_option', function (bookingStatusOptions) {
            $scope.bookinglist = bookingList.sort(function (a, b) {
                return new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime()
            });
            $scope.bookingStatusOptions = bookingStatusOptions;
            $ionicLoading.hide();
        })
    });
    var fbInstance;
    $scope.showFilterBarBooking = function () {
        fbInstance = $ionicFilterBar.show({
            items: $scope.bookinglist,
            update: function (filteredItems, filterText) {
                $scope.bookinglist = filteredItems;
                if (filterText) {}
            },
            cancelText: "Hủy bỏ"
        });
    };
});

app.controller('ViewBookingCtrl', function ($scope, $ionicLoading, $stateParams, UtilService, BookingService, Language) {
    var bookingId = $stateParams.id;
    var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    BookingService.getBookingById(sessionId, bookingId, function (bookingData) {
        UtilService.getPortList(sessionId, function (portList) {
            UtilService.getGeoCodeList(sessionId, function (GeoCodeList) {
                UtilService.getCommodityList(sessionId, function (commodityList) {
                    Language.getOptions(sessionId, 'app_list_strings', 'booking_status_option', function (bookingStatusOptions) {
                        var dataBooking = {
                            bookingInfo: bookingData.bookingInfo,
                            geoCodeArray: GeoCodeList,
                            commodityArray: commodityList,
                            portArray: portList,
                            shipmentLines: bookingData.detailInfo,
                            bookingStatusOptions: bookingStatusOptions,
                        };
                        $scope.dataBooking = dataBooking;
                        //Luu booking id de sau nay tao complaint
                        localStorage.setItem("c_booking_cases_1c_booking_ida",dataBooking.bookingInfo.id.value);
                        $ionicLoading.hide();
                    });
                });
            });
        });
    });
});