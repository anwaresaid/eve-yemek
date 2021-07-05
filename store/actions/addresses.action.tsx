import AddressesService from "../services/addresses.service";
import { addressesTypes } from "../types/addresses.type";

export const getSupportedCountries = () => async (dispatch, getState) => {
    try {
        dispatch({
          type: addressesTypes.SUPPORTED_COUNTRIES_REQUEST,
        });
    
        const addressesService = new AddressesService;
        const res = await addressesService.getSupportedCountries();
        dispatch({
          type: addressesTypes.SUPPORTED_COUNTRIES_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: addressesTypes.SUPPORTED_COUNTRIES_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
}