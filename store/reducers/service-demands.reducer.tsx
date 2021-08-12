import { DemandsTypes } from "../types/service-demands.type";

export const serviceDemandReducer = (state = {}, action) => {

    switch (action.type) {
        case DemandsTypes.DEMAND_DATA_REQUEST:
            return {loading: true}
        case DemandsTypes.DEMAND_DATA_SUCCESS:
            return {
                loading: false,
                success: true,
                demandData: action.payload
            }
        case DemandsTypes.DEMAND_DATA_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}