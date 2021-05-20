export const usersListTypes = {

    CUSTOMER_LIST_REQUEST : 'CUSTOMER_LIST_REQUEST',
    CUSTOMER_LIST_SUCCESS : 'CUSTOMER_LIST_SUCCESS',
    CUSTOMER_LIST_UPDATE_ROW: 'CUSTOMER_LIST_UPDATE_ROW',
    CUSTOMER_LIST_FAIL : 'CUSTOMER_LIST_FAIL',

    GET_USER_REQUEST: 'GET_USER_REQUEST',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_FAIL: 'GET_USER_FAIL',

    UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',
    UPDATE_USER_END: 'UPDATE_USER_END',

    ADD_USER_REQUEST: 'ADD_USER_REQUEST',
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    ADD_USER_FAIL: 'ADD_USER_FAIL',

    USER_ROLES_FOR_DROPDOWN: [
        {label: "Customer Service", value: 'customer_service'},
        {label: "Customer", value: 'customer'},
        {label: "Restaurant Owner", value: 'restaurant_owner'},
        {label: "Delivery Scout", value: 'delivery_scout'}
    ]
}