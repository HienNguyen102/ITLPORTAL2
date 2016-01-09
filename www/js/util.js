app.service('UtilService', function () {
    this.getCommodityList = function (sessionId, callback) {
        var commodityParams = {
            session: sessionId,
            module_name: 'C_catCommodity',
        };
        commodityParams = JSON.stringify(commodityParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry_list",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: commodityParams,
            },
            dataType: "json",
            success: function (response) {
                commodityArray = [];
                for (key in response.entry_list) {
                    var commodityObj = response.entry_list[key];
                    portArray[commodityObj.name_value_list.id.value] = commodityObj.name_value_list.name.value;
                }
                callback(commodityArray);
            }
        });
    };

    this.getPortList = function (sessionId, callback) {
        var portParam = {
            session: sessionId,
            module_name: 'C_catPort',
        };
        portParam = JSON.stringify(portParam);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry_list",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: portParam
            },
            dataType: "json",
            success: function (response) {
                portArray = [];
                for (key in response.entry_list) {
                    var portObj = response.entry_list[key];
                    portArray[portObj.name_value_list.id.value] = portObj.name_value_list.name.value;
                }
                callback(portArray);
            }
        });
    };
    
    this.getGeoCodeList = function (sessionId, callback) {
        var geoCodeParam = {
            session: sessionId,
            module_name: 'C_catGeoCode',
        };
        geoCodeParam = JSON.stringify(geoCodeParam);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry_list",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: geoCodeParam
            },
            dataType: "json",
            success: function (response) {
                geoCodeArray = [];
                for (key in response.entry_list) {
                    var geoCodeObj = response.entry_list[key];
                    geoCodeArray[geoCodeObj.name_value_list.id.value] = geoCodeObj.name_value_list.name.value;
                }
                callback(geoCodeArray);
            }
        });
    };
    
    this.getUnitList = function (sessionId, callback) {
        var unitParam = {
            session: sessionId,
            module_name: 'C_catUnit',
        };
        unitParam = JSON.stringify(unitParam);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry_list",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: unitParam
            },
            dataType: "json",
            success: function (response) {
                unitArray = [];
                for (key in response.entry_list) {
                    var unitObject = response.entry_list[key];
                    unitArray[unitObject.name_value_list.id.value] = unitObject.name_value_list.name.value;
                }
                callback(unitArray);
            }
        });
    };
    
    this.getRouteInfoFromArray = function(routeList, routeId){
        for(key in routeList) {
            if(routeList[key].id.value == routeId) {
                return routeList[key];
            }
        }
        return null;
    };


});