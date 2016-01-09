app.service('CallService', function () {
    var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
    var userInfo = JSON.parse(localStorage.getItem('data')).userInfo;
    var accountId = JSON.parse(userInfo).id;
    this.getCallList = function (callback) {
        var callCountParams = {
            session: sessionId,
            module_name: "Calls",
            query: "calls.parent_id ='" + accountId + "'",
        };

        callCountParams = JSON.stringify(callCountParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entries_count",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: callCountParams,
            },
            dataType: "json",
            success: function (resultCount) {
                var totalRow = resultCount.result_count;
                var callListParams = {
                    session: sessionId,
                    module_name: "Calls",
                    query: "calls.parent_id ='" + accountId + "'",
                    //max_results: totalRow,
                    order_by: "date_entered desc"
                };

                callListParams = JSON.stringify(callListParams);
                $.ajax({
                    type: "POST",
                    url: apiUrl,
                    data: {
                        method: "get_entry_list",
                        input_type: "JSON",
                        response_type: "JSON",
                        rest_data: callListParams,
                    },
                    dataType: "json",
                    success: function (response) {
                        //debugger;
                        callback(response);
                    }
                });
            }
        });
    }
    this.getCallById = function (callId, callback) {
        var location;
        var callParams = {
            session: sessionId,
            module_name: "Calls",
            id: callId
        }
        callParams = JSON.stringify(callParams);

        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: callParams,
            },
            dataType: "json",
            success: function (response) {
                //debugger;
                callback(response.entry_list[0].name_value_list);
            }
        });
    }
    this.sendCallInService = function (callData, callback) {

        var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
        var userInfo = JSON.parse(localStorage.getItem('data')).userInfo;
        var accountId = JSON.parse(userInfo).id;
        var assingedUserId = JSON.parse(JSON.parse(localStorage.getItem('data')).userInfo).assigned_user_id;
        var createCallParams = {
            session: sessionId,
            module_name: "Calls",
            name_value_list: [
                {
                    name: "name",
                    value: callData.title
                },
                {
                    name: "description",
                    value: callData.content
                },
                {
                    name: "date_start",
                    value: callData.date_start
                },
                {
                    name: "parent_id",
                    value: accountId
                },
                {
                    name: "parent_type",
                    value: "Accounts"
                },
                {
                    name: "assigned_user_id",
                    value: assingedUserId
                }
            ]
        }
        createCallParams = JSON.stringify(createCallParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "set_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: createCallParams,
            },
            dataType: "json",
            success: function (response) {
                //debugger;
                callback(response);
            }
        });
    }
});