app.service('Language', function(){
    this.getLanguage = function(sessionId, type, callback) {
        var langParams = {
            session: sessionId,
            type: type,
            language: 'vn_vn',
        }
        langParams = JSON.stringify(langParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_sugar_language",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: langParams,
            },
            dataType: "json",
            success: function (response) {
                callback(response);
            }
        })
    };
    
    this.getOptions = function(sessionId, type, optionName, callback){
        this.getLanguage(sessionId, type, function(lang){
            var lang = JSON.parse(lang);
            var options = lang[optionName];
            callback(options);
        });
    }
});