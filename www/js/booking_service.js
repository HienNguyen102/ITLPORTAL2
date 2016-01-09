app.service('BookingService', function () {
    this.createBooking = function (sessionId, bookingData, callback) {
        var bookingParams = {
            session: sessionId,
            module_name: "C_Booking",
            name_value_list: [
                {
                    name: "truck_booking_account_code",
                    value: bookingData.truck_booking_account_code
                },
                {
                    name: "assigned_user_id",
                    value: bookingData.assigned_user_id
                },
                {
                    name: "truck_booking_date",
                    value: bookingData.truck_booking_date
                },
                {
                    name: "truck_tax_code",
                    value: bookingData.truck_tax_code
                },
                {
                    name: "trucking_quote_id",
                    value: bookingData.trucking_quote_id
                },
                {
                    name: "trucking_route_id",
                    value: bookingData.trucking_route_id
                },
                {
                    name: "truck_port_from",
                    value: bookingData.truck_port_from
                },
                {
                    name: "truck_port_to",
                    value: bookingData.truck_port_to
                },
                {
                    name: "truck_transfer_type",
                    value: bookingData.truck_transfer_type
                },
                {
                    name: "truck_unit",
                    value: bookingData.truck_unit
                },
                {
                    name: "truck_weight",
                    value: bookingData.truck_weight
                },
                {
                    name: "truck_commodity",
                    value: bookingData.truck_commodity
                },
                {
                    name: "truck_quantity",
                    value: bookingData.truck_quantity
                },
                {
                    name: "truck_position_receipt",
                    value: bookingData.truck_position_receipt
                },
                {
                    name: "truck_position_packing",
                    value: bookingData.truck_position_packing
                },
                {
                    name: "truck_position_delivery",
                    value: bookingData.truck_position_delivery
                },
                {
                    name: "truck_status",
                    value: bookingData.truck_status
                },
                {
                    name: "trucking_broker_id",
                    value: bookingData.trucking_broker_id
                },
                {
                    name: "truck_sale_source",
                    value: bookingData.truck_sale_source
                },
                {
                    name: "trucking_branch_id",
                    value: bookingData.trucking_branch_id
                },
                {
                    name: "trucking_is_quotation_rent",
                    value: bookingData.trucking_is_quotation_rent
                },
                {
                    name: "trucking_check_trial",
                    value: bookingData.trucking_check_trial
                },
                {
                    name: "trucking_check_merge",
                    value: bookingData.trucking_check_merge
                },
                {
                    name: "trucking_supplier_id",
                    value: bookingData.trucking_supplier_id
                },
                {
                    name: "trucking_ops_id",
                    value: bookingData.trucking_ops_id
                },
                {
                    name: "c_booking_accountsaccounts_ida",
                    value: bookingData.c_booking_accountsaccounts_ida
                },
            ]
        };

        // Xu ly luu booking
        bookingParams = JSON.stringify(bookingParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "set_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: bookingParams,
            },
            dataType: "json",
            success: function (bookingResponse) {
                var bookingId = bookingResponse.id;
                var bookingDetailParams = {
                    session: sessionId,
                    module_name: "C_BookingDetailRequirement",
                    name_value_list: [
                        {
                            name: 'delivery_date',
                            value: bookingData.delivery_date
                                            },
                        {
                            name: 'quantity',
                            value: bookingData.quantity
                                            },
                        {
                            name: 'remain',
                            value: bookingData.remain
                                            },
                        {
                            name: 'receipt_date',
                            value: bookingData.receipt_date
                                            },
                        {
                            name: 'date_packing_or_unload',
                            value: bookingData.date_packing_or_unload
                                            },
                        {
                            name: 'end_date',
                            value: bookingData.end_date
                                            },
                                        ]

                }

                bookingDetailParams = JSON.stringify(bookingDetailParams);
                $.ajax({
                    type: "POST",
                    url: apiUrl,
                    data: {
                        method: "set_entry",
                        input_type: "JSON",
                        response_type: "JSON",
                        rest_data: bookingDetailParams,
                    },
                    dataType: "json",
                    success: function (bookingDetailResponse) {
                        var bookingDetailId = bookingDetailResponse.id;
                        var setRelationshipBookingDetailAndBooking = {
                            session: sessionId,
                            module_name: "C_Booking",
                            module_id: bookingId,
                            link_field_name: "c_booking_c_bookingdetailrequirement_1",
                            related_ids: [bookingDetailId],
                        };

                        setRelationshipBookingDetailAndBooking = JSON.stringify(setRelationshipBookingDetailAndBooking);

                        $.ajax({
                            type: "POST",
                            url: apiUrl,
                            data: {
                                method: "set_relationship",
                                input_type: "JSON",
                                response_type: "JSON",
                                rest_data: setRelationshipBookingDetailAndBooking,
                            },
                            dataType: "json",
                            success: function (setRelationshipResponse) {
                                callback(bookingId);

                            }
                        });

                    }
                });
            }
        });
    }

    this.getBookingList = function (sessionId, accountId, callback) {
        var bookingParams = {
            session: sessionId,
            account_id: accountId,
            booking_date: '',
            delivery_date: '',
        };

        bookingParams = JSON.stringify(bookingParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_booking_list",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: bookingParams,
            },
            dataType: "json",
            success: function (response) {
                callback(JSON.parse(response));
            }
        });

    };

    this.getBookingById = function (sessionId, bookingId, callback) {
        var bookingParams = {
            session: sessionId,
            module_name: "C_Booking",
            id: bookingId,
            select_fields: [
                'id', 'name', 'trucking_booking_code', 'truck_booking_date', 'truck_tax_code', 'truck_port_from', 'truck_port_to',
                        'truck_unit', 'truck_weight', 'truck_commodity', 'truck_quantity', 'truck_quantity', 'truck_transfer_type',
                        'truck_position_receipt', 'truck_position_delivery', 'truck_position_packing', 'truck_booking_account_code', 'truck_status'
            ],
            link_name_to_fields_array: [
                {
                    name: "c_booking_c_bookingdetailrequirement_1",
                    value: ['id', 'delivery_date', 'quantity', 'receipt_date', 'date_packing_or_unload', 'end_date']
                }
            ]
        };
        bookingParams = JSON.stringify(bookingParams);

        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: bookingParams,
            },
            dataType: "json",
            success: function (response) {
                debugger;
                data = {
                    bookingInfo: response.entry_list[0].name_value_list,
                    detailInfo: (response.relationship_list[0].length > 0) ? response.relationship_list[0][0].records : [],
                };
                callback(data);
            }
        });
    }
});