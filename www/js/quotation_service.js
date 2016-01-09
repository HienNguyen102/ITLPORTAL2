app.service('QuotationService', function () {
    this.getQuoteList = function (sessionId, accountId, callback) {
        quoteListParams = {
            session: sessionId,
            account_id: accountId
        };
        quoteListParams = JSON.stringify(quoteListParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_quote_list",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: quoteListParams,
            },
            dataType: "json",
            success: function (response) {
                callback(JSON.parse(response));
            }
        });
    }
    this.getQuotationById = function (sessionId, quoteId, callback) {
        quoteParams = {
            session: sessionId,
            module_name: "C_Quotes",
            id: quoteId,
            select_fields: [
                'id', 'branch_id', 'trucking_quote_code', 'quotation_date', 'check_customer_approve',                     'billing_contact_id', 'contract', 'effect_date', 'expiration',                                               'trucking_commodity','trucking_transfer_type', 'stage',                'trucking_broker_id','sale_source_ddown', 'user_ops_id',
            ],
            link_name_to_fields_array: [
                {
                    name: 'c_quotes_c_salequotationroute_1',
                    value: ['id', 'port_from', 'port_to', 'weight_value', 'unit', 'price_final',                                        'currency', 'status','port_receipt', 'port_transfer', 'port_delivery', 'check_merge_quotation', 'supplier_id'
                    ]
                }
            ]
        };
        quoteParams = JSON.stringify(quoteParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: quoteParams,
            },
            dataType: "json",
            success: function (response) {
                data = {
                    quotationInfo: response.entry_list[0].name_value_list,
                    routeList: response.relationship_list[0][0].records
                };
                callback(data);
            }
        });
    }
});