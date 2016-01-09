var apiUrl = "http://nhatintership.giaiphapcrm.vn/custom/service/v4_1/rest.php";
//var apiUrl = "http://trucking.giaiphapcrm.info/custom/service/v4_1/rest.php";
var rootUser = 'web_service_admin';
var rootPass = '^BQ^d.ndAG96gDY';
var app = angular.module('ionicApp', ['ionic', 'ngCookies', 'google.places', 'ionic-datepicker', 'ngCordova', 'Recordservices', 'jett.ionic.filter.bar']);
app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        /*if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }*/
    });
});
app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
    //$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
    $ionicConfigProvider.backButton.text('Trở về');
    $stateProvider
        .state('main', {
            url: "/main",
            abstract: true,
            templateUrl: "templates/main.html",
            controller: 'MainCtrl'
        })
        .state('main.login', {
            url: "/login",
            views: {
                'mainContent': {
                    templateUrl: "templates/user/login.html",
                    controller: 'LoginCtrl'
                }
            }
        })
        .state('main.logout', {
            url: "/logout",
            views: {
                'mainContent': {
                    templateUrl: "templates/user/login.html",
                    controller:'LogoutCtrl'
                }
            }
        })
        .state('main.menu', {
            url: "/menu",
            views: {
                'mainContent': {
                    templateUrl: "templates/menu.html",
                    controller: 'MenuCtrl'
                }
            }
        })
        .state('main.menu.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html",
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('main.menu.viewmap', {
            url: "/viewmap/:address",
            views: {
                'menuContent': {
                    templateUrl: "templates/map.html",
                    controller: 'MapCtrl',
                }
            }
        })
        .state('main.menu.tabs', {
            url: "/tab",
            views: {
                'mainContent': {
                    templateUrl: "templates/tabs.html"
                }
            }
        })
        //Cau hinh route cho module meeting
        // Route cua meeting list
        .state('main.menu.meetings', {
            url: "/meetings",
            views: {
                'menuContent': {
                    templateUrl: "templates/meeting/listview.html",
                    controller: 'ListMeetingCtrl',
                }
            }
        })
        // Route xem chi tiet meeting
        .state('main.menu.viewmeeting', {
            url: "/viewmeeting/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/meeting/detailview.html",
                    controller: 'ViewMeetingCtrl',
                }
            }
        })
        //Route tao meeting
        .state('main.menu.meetings.create', {
            url: "/create",
            views: {
                'menuContent': {
                    templateUrl: "templates/meeting/editview.html",
                    controller: 'CreateMeetingCtrl',
                }
            }
        })
        .state('main.menu.meetings.view', {
            url: "/view",
            views: {
                'menuContent': {
                    templateUrl: "templates/meeting/listview.html",
                    controller: 'ViewMeetingCtrl',
                }
            }
        })
        //Cau hinh route cho module complaint
        // Route cua complaint list #/menu/tab/complaints
        .state('main.menu.complaints', {
            url: "/complaints",
            views: {
                'menuContent': {
                    templateUrl: "templates/complaint/listview_complaint.html",
                    controller: 'ListComplaintCtrl',
                }
            }
        })
        // Route xem chi tiet complaint
        .state('main.menu.view_complaint', {
            url: "/view_complaint/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/complaint/detailview_complaint.html",
                    controller: 'ViewComplaintCtrl',
                }
            }
        })
        .state('main.menu.create_record', {
            url: "/create_record",
            views: {
                'menuContent': {
                    templateUrl: "templates/complaint/new_record.html",
                    controller: 'RecordCtrl',
                }
            }
        })
        .state('main.menu.show_attachment', {
            url: "/show_attachment",
            views: {
                'menuContent': {
                    templateUrl: "templates/complaint/show_attachment.html",
                    controller: 'ViewAttachmentCtrl',
                }
            }
        })
        .state('main.menu.calls', {
            url: "/calls",
            views: {
                'menuContent': {
                    templateUrl: "templates/call/listcall.html",
                    controller: 'ListCallCtrl',
                }
            }
        })
        .state('main.menu.view_call', {
            url: "/view_call/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/call/detailview_call.html",
                    controller: 'ViewCallCtrl',
                }
            }
        })
        .state('main.menu.contracts', {
            url: "/contracts",
            views: {
                'menuContent': {
                    templateUrl: "templates/contract/listcontract.html",
                    controller: 'ListContractCtrl',
                }
            }
        })
        .state('main.menu.view_contract', {
            url: "/view_contract/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/contract/detailview_contract.html",
                    controller: 'ViewContractCtrl',
                }
            }
        }).state('main.menu.viewprofile', {
            url: "/viewprofile",
            views: {
                'menuContent': {
                    templateUrl: "templates/user/detailview.html",
                    controller: "ViewProfileCtrl",
                }
            }
        }).state('main.menu.quotations', {
            url: "/quotations",
            views: {
                'menuContent': {
                    templateUrl: "templates/quotation/listview.html",
                    controller: "ListQuotationCtrl",
                }
            }
        })
        .state('main.menu.viewquotation', {
            url: "/viewquotation/:quoteid",
            views: {
                'menuContent': {
                    templateUrl: "templates/quotation/detailview.html",
                    controller: "ViewQuotationCtrl",
                }
            }
        })
        .state('main.menu.map', {
            url: "/map",
            views: {
                'menuContent': {
                    templateUrl: "templates/map/map.html",
                    controller: "MapMenuCtrl"
                }
            }
        })
        .state('main.menu.contactlist', {
            url: "/contactlist",
            views: {
                'menuContent': {
                    templateUrl: "templates/contact.html",
                    controller: "ContactListController",
                }
            }
        })
        .state('main.menu.about', {
            url: "/about",
            views: {
                'menuContent': {
                    templateUrl: "templates/about.html",
                    controller: "AboutController",
                }
            }
        })
        .state('main.menu.bookinglist', {
            url: "/bookinglist",
            views: {
                'menuContent': {
                    templateUrl: "templates/booking/listview.html",
                    controller: "BookingListCtrl"
                }     }
    })
    .state('main.menu.viewbooking', {
            url: "/viewbooking/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/booking/detailview.html",
                    controller: "ViewBookingCtrl",
                }
            }
        });


    $urlRouterProvider.otherwise("/main/login");

});