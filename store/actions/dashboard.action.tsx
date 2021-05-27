import DashboardService from '../services/dashboard.service'
import {dashboardTypes} from '../types/dashboard.type'

export const getDashboardReport = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: dashboardTypes.DASHBOARD_REPORT_LIST_REQUEST,
        })

        const dashboardService = new DashboardService
        const result = await dashboardService.getReport()

        dispatch({
            type: dashboardTypes.DASHBOARD_REPORT_LIST_SUCCESS,
            payload: result
        })
        

    } catch (error){
        dispatch({
            type: dashboardTypes.DASHBOARD_REPORT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }

}