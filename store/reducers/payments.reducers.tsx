import { paymentsTypes } from "../types/payments.types";

export const listUntransferedPaymentsReducer = (state = {}, action) => {
    switch (action.type) {
        case paymentsTypes.UNTRANSFERED_PAYMENTS_REQUEST:
            return { loading: true }
        case paymentsTypes.UNTRANSFERED_PAYMENTS_SUCCESS:
            return {
                loading: false,
                success: true,
                payments: action.payload
            }
        case paymentsTypes.UNTRANSFERED_PAYMENTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}