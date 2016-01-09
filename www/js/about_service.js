app.service('AboutService', function () {
    this.getAbout = function (callback) {
        var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
        var aboutParams = {
            session: sessionId,
            module_name: 'C_About',
        };
        aboutParams = JSON.stringify(aboutParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry_list",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: aboutParams,
            },
            dataType: "json",
            success: function (response) {
                callback(response.entry_list[0]);
            }
        });
    };
});