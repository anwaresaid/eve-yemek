import { addressesTypes } from "../types/addresses.type";

export const supportedCountriesReducer = (state = {}, action) => {
    switch (action.type) {
        case addressesTypes.SUPPORTED_COUNTRIES_REQUEST:
            return { loading: true };
        case addressesTypes.SUPPORTED_COUNTRIES_SUCCESS:
            return {
                loading: false,
                success: true,
                supportedCountries: action.payload
            }
        case addressesTypes.SUPPORTED_COUNTRIES_FAIL:
            return {
                loading: false,
                error: action.payload,
              };
        default:
            return state
    }
}