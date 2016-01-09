app.controller('RecordCtrl', function ($scope, Sounds, $state, $ionicHistory) {

    $scope.sound = {
        name: ""
    };

    $scope.saveSound = function () {
        console.log('trying to save ' + $scope.sound.name);

        //Simple error checking
        if ($scope.sound.name === "") {
            navigator.notification.alert("Hãy đặt tên file!", null, "Thông báo lỗi");
            return;
        }

        if (!$scope.sound.file) {
            navigator.notification.alert("Bạn chưa thực hiện ghi âm", null, "Thông báo lỗi");
            return;
        }

        /*
        begin the copy to persist location
		
        first, this path below is persistent on both ios and and
        */
        var loc = cordova.file.dataDirectory;
        /*
        but now we have an issue with file name. so let's use the existing extension, 
        but a unique filename based on seconds since epoch
        */
        var extension = $scope.sound.file.split(".").pop();
        var filepart = Date.now();
        var filename = filepart + "." + extension;
        console.log("new filename is " + filename);

        window.resolveLocalFileSystemURL(loc, function (d) {
            window.resolveLocalFileSystemURL($scope.sound.file, function (fe) {
                fe.copyTo(d, filename, function (e) {
                    console.log('success inc opy');
                    console.dir(e);
                    $scope.sound.file = e.nativeURL;
                    $scope.sound.path = e.fullPath;

                    Sounds.save($scope.sound).then(function () {
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        $ionicHistory.goBack();
                    });

                }, function (e) {
                    console.log('error in coipy');
                    console.dir(e);
                });
            }, function (e) {
                console.log("error in inner bullcrap");
                console.dir(e);
            });


        }, function (e) {
            console.log('error in fs');
            console.dir(e);
        });


    }

    var captureError = function (e) {
        console.log('captureError', e);
    }

    var captureSuccess = function (e) {
        //---------------------------------
        var audioFile = e[0],
            fileReader = new FileReader(),
            file;
        fileReader.onload = function (readerEvt) {
            var base64 = readerEvt.target.result;
            localStorage.setItem("recordDataBase64", base64);
            localStorage.setItem("extensionRecord", base64.split("base64,")[0].split("/")[1].replace(';', ''));
        };
        //fileReader.reasAsDataURL(audioFile); //This will result in your problem.
        file = new window.File(audioFile.name, audioFile.localURL,
            audioFile.type, audioFile.lastModifiedDate, audioFile.size);
        fileReader.readAsDataURL(file); //This will result in the solution.
        //---------------------------------
        //window.resolveLocalFileSystemURL(e[0].localURL, gotFileEntry, failSystem);
        console.dir(e);
        $scope.sound.file = e[0].localURL;
        $scope.sound.filePath = e[0].fullPath;
        console.log($scope.sound.file);
    }

    $scope.record = function () {
        navigator.device.capture.captureAudio(
            captureSuccess, captureError, {
                //Hien bo duration
                //duration: 10
            });
    }

    $scope.playInRecordCtrl = function () {
        console.log("choi trong record ctrl");
        if (!$scope.sound.file) {
            navigator.notification.alert("Hãy thực hiện ghi âm trước.", null, "Lỗi");
            return;
        }
        var media = new Media($scope.sound.file, function (e) {
            media.release();
        }, function (err) {
            console.log("media err", err);
        });
        media.play();
    }
});
app.controller('ListComplaintCtrl', function ($scope, $cookies, $cookieStore, $ionicSideMenuDelegate, $ionicModal, $ionicLoading, UserService, ComplaintService, $ionicFilterBar, Language) {

    /*$ionicModal.fromTemplateUrl('templates/complaint/editview.html', function (meetingModal) {
        $scope.meetingModal = meetingModal;
    }, {
        animation: 'slide-in-up'
    });*/

    // Lay danh sach complaint
    //debugger;
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
    var userId = JSON.parse(localStorage.getItem('data')).userId;
    ComplaintService.getComplaintList(sessionId, userId, function (result) {
        //debugger;
        //$scope.complaints = result.entry_list;
        //sap xep ket qua
        result.entry_list.sort(function (a, b) {
                return new Date(b.name_value_list.date_entered.value).getTime() - new Date(a.name_value_list.date_entered.value).getTime()
            });
        $scope.complaints = result.entry_list;
        $ionicLoading.hide();
    });
    var filterBarInstance;
    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.complaints,
            update: function (filteredItems, filterText) {
                $scope.complaints = filteredItems;
                if (filterText) {
                    console.log(filterText);
                }
            },
             cancelText: "Hủy bỏ"
        });
    };



});
app.controller('ViewComplaintCtrl', function ($scope, $cookies, $ionicLoading, $stateParams, UserService, ComplaintService, $state, $window, $ionicPopup, $ionicScrollDelegate, $cordovaCamera, $ionicPlatform, Sounds) {
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    ComplaintService.getComplaintById($stateParams.id, function (result, relationship_list) {
        $ionicLoading.hide();
        $scope.complaint = result;
        //console.log(relationship_list);
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
    });
    $scope.viewAttachmentById = function (selectedId) {
        localStorage.setItem("selectedIdAttachment", selectedId);
    }
    $scope.close = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Kết thúc than phiền',
            template: 'Bạn muốn kết thúc than phiền?'
        });
        confirmPopup.then(function (res) {
            if (res) {
                var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
                ComplaintService.closeComplaint(sessionId, $stateParams.id, $state, $window, $stateParams, $scope, $ionicPopup, $ionicScrollDelegate);
            } else {
                console.log("Không");
            }
        });
    };
    $scope.textBtnAction = "Ghi âm";
    $scope.optAttachment = "File ghi âm";
    $scope.showImage = false;
    $scope.getAttachment = function (optAttachment, $cordovaCamera) {
        if (optAttachment == "File ghi âm") {
            $state.go("main.menu.create_record");
        } else {
            $scope.takePicture();
        }
    }
    $scope.updateTextBtn = function (_optAttachment) {
            if (_optAttachment == "File ghi âm") {
                $scope.textBtnAction = "Ghi âm";
                $scope.showImage = false;
                $scope.optAttachment = "File ghi âm";
            } else {
                $scope.textBtnAction = "Chụp hình";
                $scope.showImage = true;
                $scope.optAttachment = "File hình ảnh";
            }
        }
        /*$scope.dataComment.des = "";
        $scope.imageName = "";*/
    $scope.sendComment = function (dataComment) {
        //console.log(dataComment.des);
        if (typeof dataComment == 'undefined' || dataComment.des == "") {
            var alertPopup = $ionicPopup.alert({
                title: 'Thông báo',
                template: 'Bạn chưa nhập nội dung'
            });
            return;
        }
        if ($scope.isSendAttachment) {
            var fileName = "";
            var isSendRecord = false;
            $scope.soundNameFirst = "";
            if ($scope.optAttachment == "File ghi âm") {
                if ($scope.sounds.length == 0) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Thông báo lỗi',
                        template: 'Bạn chưa thực hiện ghi âm'
                    });
                    return;
                }
                isSendRecord = true;
                fileName = $scope.sounds[0].name;
            } else {
                if (typeof $scope.countImagesCapture == 'undefined' || $scope.countImagesCapture == 0) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Thông báo lỗi',
                        template: 'Bạn chưa thực hiện chụp hình'
                    });
                    return;
                }
                if (typeof dataComment.imageName == 'undefined' || dataComment.imageName == "") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Thông báo lỗi',
                        template: 'Bạn chưa đặt tên hình'
                    });
                    return;
                }
                isSendRecord = false;
                fileName = dataComment.imageName;
                localStorage.setItem("extensionRecord", "png");
            }
            ComplaintService.sendCommentInService(dataComment.des, $stateParams.id, $ionicScrollDelegate, $state, $scope, isSendRecord, fileName, $ionicPopup, $ionicLoading);
        } else {
            ComplaintService.sendCommentInService(dataComment.des, $stateParams.id, $ionicScrollDelegate, $state, $scope, false, "", $ionicPopup, $ionicLoading);
        }
    };
    $scope.readFile = function () {
        ComplaintService.readFileInService($scope);
    };

    var getSounds = function () {
        //console.log('getSounds called');
        Sounds.get().then(function (sounds) {
            //console.dir(sounds);
            $scope.sounds = sounds;

            for (sound in sounds) {
                console.log(sound);

            }

        });
    };

    $scope.$on('$ionicView.enter', function () {
        getSounds();
    });

    $scope.play = function (x) {
        console.log("choi khi bam");
        Sounds.play(x);
    };

    $scope.delete = function (x) {
        console.log('delete', x);
        Sounds.get().then(function (sounds) {
            var toDie = sounds[x];
            window.resolveLocalFileSystemURL(toDie.file, function (fe) {
                fe.remove(function () {
                    Sounds.delete(x).then(function () {
                        getSounds();
                    });
                }, function (err) {
                    console.log("err cleaning up file", err);
                });
            });
        });
    };

    $scope.cordova = {
        loaded: false
    };
    /*$ionicPlatform.ready(function () {
        $scope.$apply(function () {
            $scope.cordova.loaded = true;
        });
    });*/
    $scope.isSendAttachment = false;
    $scope.sendAttachmentOrNot = function () {
        //alert(this.checked);
        $scope.isSendAttachment = this.checked;
    }

});
app.controller('ViewAttachmentCtrl', function ($scope, $cookies, $cookieStore, $ionicLoading, $location, $filter, MeetingService, $rootScope, $ionicHistory) {

    $scope.$on('$ionicView.enter', function () {

        $ionicLoading.show({
            templateUrl: 'templates/loading.html',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
    });
    var selectedId = localStorage.getItem("selectedIdAttachment");
    var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
    var noteParams = {
        session: sessionId,
        id: selectedId
    };
    var SND;
    var loadImage = false;
    noteParams = JSON.stringify(noteParams);
    $.ajax({
        type: "POST",
        url: apiUrl,
        data: {
            method: "get_note_attachment",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: noteParams,
        },
        dataType: "json",
        success: function (response) {
            debugger;

            var fileName = response.note_attachment.filename;
            $scope.filenameAttachment = fileName;
            if (fileName.indexOf("png") > -1) {
                //$scope.srcAttachment = window.atob(response.note_attachment.file);
                loadImage = true;
                $scope.srcAttachment = response.note_attachment.file;
                $ionicLoading.hide();
            } else {
                loadImage = false;
                var Sound = (function () {
                    var df = document.createDocumentFragment();
                    return function Sound(src) {
                        var snd = new Audio(src);
                        df.appendChild(snd); // keep in fragment until finished
                        snd.addEventListener('ended', function () {
                            df.removeChild(snd);
                        });
                        snd.play();
                        $ionicLoading.hide();
                        return snd;
                    }
                }());
                SND = Sound("data:audio/wav;base64," + response.note_attachment.file);
            }
        }
    });
    $rootScope.$ionicGoBack = function (backCount) {
        $ionicLoading.hide();
        if (loadImage == false) {
            SND.pause();
            SND.currentTime = 0;
        }
        $ionicHistory.goBack(backCount);
    };
});

app.controller('CreateComplaintCtrl', function ($scope, $ionicLoading, $filter, $location, ComplaintService) {
    $scope.sendNewComplaint = function (data) {
        $ionicLoading.show({
            templateUrl: 'templates/loading.html',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        ComplaintService.sendNewComplaintInService(data, function (result) {
            $ionicLoading.hide();
            $scope.closeAddComplaintModal();
            if (result.id != '') {
                $location.path('main/menu/view_complaint/' + result.id);
            }
        });
    }
});