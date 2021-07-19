import { DemandsTypes } from "../types/service-demands.type";
import DemandService  from "../services/service-demand.service"

export const getDemandData = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: DemandsTypes.DEMAND_DATA_REQUEST,
        });

        const demandService = new DemandService();

        const res = await demandService.getDemandData();

        dispatch({
            type: DemandsTypes.DEMAND_DATA_SUCCESS,
            payload: res,
        });
    } catch (error) {
        dispatch({
            type: DemandsTypes.DEMAND_DATA_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}