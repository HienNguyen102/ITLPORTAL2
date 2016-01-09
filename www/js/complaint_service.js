// Tao webservice cho complaint : cac phuong thuc bao gom get ComplaintList
app.service('ComplaintService', function () {
    this.getComplaintList = function (sessionId, userId, callback) {
        var complaintParams = {
            session: sessionId,
            module_name: "Cases",
            query: "cases.created_by ='" + userId + "'",
            order_by: "date_entered desc"
                //deleted: 0
        };

        complaintParams = JSON.stringify(complaintParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry_list",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: complaintParams,
            },
            dataType: "json",
            success: function (response) {
                angular.forEach(response.entry_list, function (item_arr) {
                    //console.log(item_arr);
                });
                callback(response);
            }
        });
    };
    this.getComplaintById = function (complaintId, callback) {
        getComplaintById2(complaintId, callback);
    }

    function getComplaintById2(complaintId, callback) {
        var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
        var caseParams = {
            session: sessionId,
            module_name: "Cases",
            id: complaintId,
            select_fields: ['id', 'case_number', 'name', 'description', 'status', 'priority', 'date_entered'],
            link_name_to_fields_array: [
                {
                    name: 'c_booking_cases_1',
                    value: ['name', 'trucking_booking_code']
                },
                {
                    name: 'notes',
                    value: ['id', 'name', 'description', 'created_by_name', 'date_entered', 'filename']
                }
            ]
        }

        caseParams = JSON.stringify(caseParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: caseParams,
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                callback(response.entry_list[0].name_value_list, response.relationship_list);
                //debugger;
            }
        });
    };
    this.closeComplaint = function (sessionId, complaintId, $state, $window, $stateParams, $scope, $ionicPopup, $ionicScrollDelegate) {
        var caseParams = {
            session: sessionId,
            module_name: "Cases",
            name_value_list: {
                id: complaintId,
                status: 'Closed'
            }
        }
        caseParams = JSON.stringify(caseParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "set_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: caseParams,
            },
            dataType: "json",
            success: function (response) {
                $scope.complaint.status.value = "Closed";
                $state.go($state.current, {}, {
                    reload: true
                });

                $ionicScrollDelegate.scrollTop();
                var alertPopup = $ionicPopup.alert({
                    title: 'Thông báo',
                    template: 'Than phiền đã được đóng lại'
                });
                alertPopup.then(function (res) {
                    console.log('ban da dong than phien');
                });
            }
        });

    };
    this.sendCommentInService = function (cmDescription, caseId, $ionicScrollDelegate, $state, $scope, isSendRecord, fileName, $ionicPopup, $ionicLoading) {
        var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
        var userId = JSON.parse(localStorage.getItem('data')).userId;
        var noteParams = {
            session: sessionId,
            module_name: "Notes",
            name_value_list: {
                name: 'Comment',
                description: cmDescription,
                parent_type: 'Cases',
                parent_id: caseId,
                assigned_user_id: userId
            }
        }
        noteParams = JSON.stringify(noteParams);
        $ionicLoading.show({
            templateUrl: 'templates/loading.html',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "set_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: noteParams,
            },
            dataType: "json",
            success: function (response) {
                if ($scope.isSendAttachment) {

                    var new_note_id = response.id;
                    var fileContent;
                    if (isSendRecord) {
                        fileContent = localStorage.getItem('recordDataBase64').split("base64,")[1];
                    } else {
                        //fileContent = $scope.imageDataBase64;
                        //base64Img.split("base64,")[1];
                        //console.log($scope.imageDataBase64);
                        fileContent = $scope.imageDataBase64;
                    }
                    fileName = fileName + "." + localStorage.getItem('extensionRecord');
                    var para_set_not_att = {
                        session: sessionId,
                        note: {
                            id: new_note_id,
                            filename: fileName,
                            file: fileContent
                        }
                    };
                    debugger;
                    var json_set_note_attachment = JSON.stringify(para_set_not_att);
                    $.ajax({
                        url: apiUrl,
                        type: "POST",
                        data: {
                            method: "set_note_attachment",
                            input_type: "JSON",
                            response_type: "JSON",
                            rest_data: json_set_note_attachment
                        },
                        dataType: "json",
                        success: function (response) {
                            //console.log(response);
                            getComplaintById2(caseId, function (result, relationship_list) {
                                $scope.complaint = result;
                                if (relationship_list[0][0].name == 'c_booking_cases_1') {
                                    $scope.shipmentTitle = "Lô hàng:";
                                    $scope.shipment = relationship_list[0][0].records[0].name.value;
                                    if(relationship_list[0].length>1){
                                        $scope.records = relationship_list[0][1].records;
                                        $scope.recordsSize=$scope.records.length;
                                    }else{
                                        $scope.recordsSize=0;
                                    }
                                } else {
                                    $scope.shipmentTitle = "";
                                    $scope.shipment = "";
                                    if(relationship_list[0][0].records.length>0){
                                        $scope.records = relationship_list[0][0].records;
                                        $scope.recordsSize=$scope.records.length;
                                    }else{
                                        $scope.recordsSize=0;
                                    }
                                }
                                $ionicLoading.hide();
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Thông báo',
                                    template: 'Phản hồi đã được gửi'
                                });
                                $state.go($state.current, {}, {
                                    reload: true
                                });
                            });
                        },
                        error: function (response) {
                            debugger;
                            alert("err");
                        }
                    });
                } else {
                    getComplaintById2(caseId, function (result, relationship_list) {
                        $scope.complaint = result;
                        if (relationship_list[0][0].name == 'c_booking_cases_1') {
                            $scope.shipmentTitle = "Lô hàng:";
                            $scope.shipment = relationship_list[0][0].records[0].name.value;
                            if(relationship_list[0].length>1){
                                $scope.records = relationship_list[0][1].records;
                                $scope.recordsSize=$scope.records.length;
                            }else{
                                $scope.recordsSize=0;
                            }
                        } else {
                            $scope.shipmentTitle = "";
                            $scope.shipment = "";
                            if(relationship_list[0][0].records.length>0){
                                $scope.records = relationship_list[0][0].records;
                                $scope.recordsSize=$scope.records.length;
                            }else{
                                $scope.recordsSize=0;
                            }
                        }
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Thông báo',
                            template: 'Phản hồi đã được gửi'
                        });
                        $state.go($state.current, {}, {
                            reload: true
                        });
                    });
                }
            },
            error: function () {
                alert('Set note error');
            }
        });
    };
    this.sendNewComplaintInService = function (complaintData, callback) {

        var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
        var userInfo = JSON.parse(localStorage.getItem('data')).userInfo;
        var accountId = JSON.parse(userInfo).id;
        var assingedUserId = JSON.parse(JSON.parse(localStorage.getItem('data')).userInfo).assigned_user_id;
        //c_booking_cases_1c_booking_ida
        var setCaseParams = {
            session: sessionId,
            module_name: "Cases",
            name_value_list: [
                {
                    name: "name",
                    value: complaintData.name
                },
                {
                    name: "description",
                    value: complaintData.description
                },
                {
                    name: "priority",
                    value: 'P1'
                },
                {
                    name: "account_id",
                    value: accountId
                },
                {
                    name: "status",
                    value: "New"
                },
                {
                    name: "assigned_user_id",
                    value: assingedUserId
                },
                {
                    name: "c_booking_cases_1c_booking_ida",
                    value: localStorage.getItem("c_booking_cases_1c_booking_ida")
                }
            ]
        }
        setCaseParams = JSON.stringify(setCaseParams);
        //debugger;
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "set_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: setCaseParams,
            },
            dataType: "json",
            success: function (response) {
                //debugger;
                callback(response);
            }
        });
    }
});