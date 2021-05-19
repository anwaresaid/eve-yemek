import {usersListTypes} from "../types/userslists.type"

const initialState = [];

export const usersListsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (action.type) {
        case usersListTypes.CUSTOMER_LIST_REQUEST:
            return {loading: true}
        case usersListTypes.CUSTOMER_LIST_SUCCESS:
            return {
                loading: false,
                success: true,
                users: action.payload
            }
        case usersListTypes.CUSTOMER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
              } 
        default:
            return state;
    }

}

export const singleUserReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (action.type) {
        case usersListTypes.GET_USER_REQUEST:
            return {loading: true}
        case usersListTypes.GET_USER_SUCCESS:
            return {
                loading: false,
                success: true,
                userData: action.payload
            }
        case usersListTypes.GET_USER_FAIL:
            return {
                loading: false,
                error: action.payload
              }        
              
        default:
            return state;
    }

}

export const updateUserReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (action.type) {
        case usersListTypes.UPDATE_USER_REQUEST:
            return {updating: true, success: false}
        case usersListTypes.UPDATE_USER_SUCCESS:
            return {
                updating: false,
                success: true,
                response: action.payload
            }
        case usersListTypes.UPDATE_USER_END:
            return {
                updating: false,
                success: false,
             }
        case usersListTypes.UPDATE_USER_FAIL:
            return {
                updating: false,
                error: action.payload
            } 
              
        default:
            return state;
    }

}


