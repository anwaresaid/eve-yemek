import DashboardService from '../services/dashboard.service'
import {dashboardTypes} from '../types/dashboard.type'

export const listDailyOrders = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: dashboardTypes.DAILY_ORDERS_LIST_REQUEST,
        })

        const dashboardService = new DashboardService
        const result = await dashboardService.getDailyOrders()

        dispatch({
            type: dashboardTypes.DAILY_ORDERS_LIST_SUCCESS,
            payload: result
        })
        

    } catch (error){
        dispatch({
            type: dashboardTypes.DAILY_ORDERS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }

}