import { paymentsTypes } from "../types/payments.types";
import PaymentsService from "../services/payments.service";
import { parseDateInAllRows } from "../../helpers/dateFunctions";

export const getUntransferedPayments = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: paymentsTypes.UNTRANSFERED_PAYMENTS_REQUEST
        })
        const paymentsService = new PaymentsService
        const res = await paymentsService.getUntransferedPayments()
        dispatch({
            type: paymentsTypes.UNTRANSFERED_PAYMENTS_SUCCESS,
            payload: parseDateInAllRows(res)
        })
    } catch (error) {
        dispatch({
            type: paymentsTypes.UNTRANSFERED_PAYMENTS_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
}