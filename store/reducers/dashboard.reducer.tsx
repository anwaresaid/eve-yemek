import { dashboardTypes } from "../types/dashboard.type";

export const dashboardReportReducer = (state={}, action) => {
    const { type, payload } = action;

    switch (action.type){
        case dashboardTypes.DASHBOARD_REPORT_LIST_REQUEST:
            return {loading: true}
        case dashboardTypes.DASHBOARD_REPORT_LIST_SUCCESS:
            console.log(action.payload)
            return {
                loading: false,
                success: true,
                reportData: action.payload
            }
        case dashboardTypes.DASHBOARD_REPORT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}