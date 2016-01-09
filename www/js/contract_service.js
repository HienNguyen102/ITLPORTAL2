app.service('ContractService', function () {
    var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
    var userInfo = JSON.parse(localStorage.getItem('data')).userInfo;
    var accountId = JSON.parse(userInfo).id;
    this.getContractList = function (callback) {
        var contractCountParams = {
            session: sessionId,
            module_name: "C_Contracts"
            //query: "contracts.parent_id ='" + accountId + "'"
        };

        contractCountParams = JSON.stringify(contractCountParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entries_count",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: contractCountParams,
            },
            dataType: "json",
            success: function (resultCount) {
                var totalRow = resultCount.result_count;
                var contractListParamsRequest = {
                    session: sessionId,
                    module_name: "C_Contracts",
                    query: "c_contracts.contract_account_id ='" + accountId + "'",
                    max_results: totalRow,
                    order_by: "date_entered desc"
                };

                contractListParamsRequest = JSON.stringify(contractListParamsRequest);
                $.ajax({
                    type: "POST",
                    url: apiUrl,
                    data: {
                        method: "get_entry_list",
                        input_type: "JSON",
                        response_type: "JSON",
                        rest_data: contractListParamsRequest,
                    },
                    dataType: "json",
                    success: function (response) {
                        callback(response);
                    }
                });
            }
        });
    }
    this.getContractById = function (contractID, callback) {
        var location;
        var callParams = {
            session: sessionId,
            module_name: "C_Contracts",
            id: contractID
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
});