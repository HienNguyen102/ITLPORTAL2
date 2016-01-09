// Tao webservice cho meeting : cac phuong thuc bao gom getMeetingList, getMeetingById, sendMeeting
app.service('MeetingService', function () {
    this.getMeetingList = function (sessionId, accountId, callback) {
        var meetingsCountParams = {
            session: sessionId,
            module_name: "Meetings",
            query: "meetings.parent_id ='" + accountId + "'",
        };

        meetingsCountParams = JSON.stringify(meetingsCountParams);
        // Lay so luong meeting cua account
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entries_count",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: meetingsCountParams,
            },
            dataType: "json",
            success: function (resultCount) {
                var totalRow = parseInt(resultCount.result_count);
                var meetingListParams = {
                    "session": sessionId,
                    "module_name": "Meetings",
                    "query": "meetings.parent_id ='" + accountId + "'",
                    "order_by": "meetings.date_start DESC",
                    "offset": 0,
                    "select_fields": ["id", "name", "description", "date_start", "location", "status"],
                    "max_results": totalRow,
                    "deleted": 0,
                    "favorites": false
                };
                debugger;
                meetingListParams = JSON.stringify(meetingListParams);
                $.ajax({
                    type: "POST",
                    url: apiUrl,
                    data: {
                        method: "get_entry_list",
                        input_type: "JSON",
                        response_type: "JSON",
                        rest_data: meetingListParams,
                    },
                    dataType: "json",
                    success: function (response) {
                        debugger;
                        callback(response);
                    }
                });
            }
        });
    }

    this.getMeetingById = function (sessionId, meetingId, callback) {
        var location;
        var meetingParams = {
            session: sessionId,
            module_name: "Meetings",
            id: meetingId
        }
        meetingParams = JSON.stringify(meetingParams);

        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: meetingParams,
            },
            dataType: "json",
            success: function (response) {
                callback(response.entry_list[0].name_value_list);
            }
        });
    }

    this.sendMeeting = function (sessionId, accountId, meetingData, callback) {
        debugger;
        var meetingParams = {
            session: sessionId,
            module_name: "Meetings",
            name_value_list: [
                {
                    name: "name",
                    value: meetingData.title
                },
                {
                    name: "description",
                    value: meetingData.content
                },
                {
                    name: "date_start",
                    value: meetingData.start_date
                },
                {
                    name: "location",
                    value: meetingData.location.formatted_address
                },
                {
                    name: "parent_id",
                    value: accountId
                },
                {
                    name: "parent_type",
                    value: "Accounts"
                }
            ]
        }
        meetingParams = JSON.stringify(meetingParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "set_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: meetingParams,
            },
            dataType: "json",
            success: function (response) {
                debugger;
                callback(response);
            }
        });
    }
    
});