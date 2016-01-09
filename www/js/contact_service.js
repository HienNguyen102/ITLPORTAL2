app.service('ContactService', function () {
    this.getContactList = function (callback) {
        var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
        var contactParams = {
            session: sessionId,
            module_name: 'C_Agency',
        };
        contactParams = JSON.stringify(contactParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry_list",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: contactParams,
            },
            dataType: "json",
            success: function (response) {
                callback(response.entry_list);
            }
        });
    };
});