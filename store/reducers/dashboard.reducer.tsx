import { dashboardTypes } from "../types/dashboard.type";

export const dailyOrderListReducer = (state={}, action) => {
    const { type, payload } = action;

    switch (action.type){
        case dashboardTypes.DAILY_ORDERS_LIST_REQUEST:
            return {loading: true}
        case dashboardTypes.DAILY_ORDERS_LIST_SUCCESS:
            console.log(action.payload)
            return {
                loading: false,
                success: true,
                dailyOrdersCount: action.payload.length
            }
        case dashboardTypes.DAILY_ORDERS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}