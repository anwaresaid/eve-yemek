import UsersListsService from '../services/userslists.service';
import { usersListTypes } from '../types/userslists.type';

import {
  parseDateInAllRows,
  parseDateInOneRow,
} from '../../helpers/dateFunctions';
import AddressesService from '../services/addresses.service';

export const listCustomers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: usersListTypes.CUSTOMER_LIST_REQUEST,
    });

    const usersListsService = new UsersListsService();
    const result = await usersListsService.getUsersByRole('customer', 0, 9999);

    dispatch({
      type: usersListTypes.CUSTOMER_LIST_SUCCESS,
      payload: parseDateInAllRows(result),
    });
  } catch (error) {
    dispatch({
      type: usersListTypes.CUSTOMER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listRestaurantOwners = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: usersListTypes.RESTAURANT_OWNER_LIST_REQUEST,
    });

    const usersListsService = new UsersListsService();
    const result = await usersListsService.getUsersByRole('restaurant_owner', 0, 9999);

    dispatch({
      type: usersListTypes.RESTAURANT_OWNER_LIST_SUCCESS,
      payload: parseDateInAllRows(result),
    });
  } catch (error) {
    dispatch({
      type: usersListTypes.RESTAURANT_OWNER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listDeliveryScouts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: usersListTypes.DELIVERY_SCOUT_LIST_REQUEST,
    });

    const usersListsService = new UsersListsService();
    const result = await usersListsService.getDeliveryScouts(0, 9999)
  
  
    dispatch({
      type: usersListTypes.DELIVERY_SCOUT_LIST_SUCCESS,
      payload: parseDeliveryScoutData(result),
    });
  } catch (error) {
    dispatch({
      type: usersListTypes.DELIVERY_SCOUT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCustomerService = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: usersListTypes.CUSTOMER_SERVICE_LIST_REQUEST,
    });

    const usersListsService = new UsersListsService();
    const result = await usersListsService.getUsersByRole('customer_service', 0, 9999);

    dispatch({
      type: usersListTypes.CUSTOMER_SERVICE_LIST_SUCCESS,
      payload: parseDateInAllRows(result),
    });
  } catch (error) {
    dispatch({
      type: usersListTypes.CUSTOMER_SERVICE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: usersListTypes.GET_USER_REQUEST,
    });

    const usersListsService = new UsersListsService();
    const addressService = new AddressesService();

    const result = await usersListsService.getSingleUser(id);

    dispatch({
      type: usersListTypes.GET_USER_SUCCESS,
      payload: result,
    });

    return result;
  } catch (error) {
    dispatch({
      type: usersListTypes.GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addUser = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: usersListTypes.ADD_USER_REQUEST,
    });

    const usersListsService = new UsersListsService();

    const result = await usersListsService.addUser(data);

    dispatch({
      type: usersListTypes.ADD_USER_SUCCESS,
      payload: result,
    });

    return result;
  } catch (error) {
    dispatch({
      type: usersListTypes.ADD_USER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error?.message
          : 'Error',
    });
  } finally {
    dispatch({
      type: usersListTypes.ADD_USER_END,
    });
  }
};

export const updateUser = (id, data, noTableEdit?: boolean) => async (dispatch, getState) => {
  try {
    dispatch({
      type: usersListTypes.UPDATE_USER_REQUEST,
    });

    const usersListsService = new UsersListsService();

    const result = await usersListsService.updateUser(id, data);

    dispatch({
      type: usersListTypes.UPDATE_USER_SUCCESS,
      payload: result,
    });

    if (noTableEdit !== true) {
      var tempRoles = [...data.roles, ...result.roles];
      tempRoles = tempRoles.filter(onlyUnique);

      updateEditedRowInStore(tempRoles, parseDateInOneRow(result), dispatch);
    }

    dispatch({
      type: usersListTypes.UPDATE_USER_END,
    });

    return result;
  } catch (error) {
    dispatch({
      type: usersListTypes.UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error?.message
          : 'Error',
    });
  }
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function updateEditedRowInStore(roles, result, dispatch) {
  for (let role of roles) {
    switch (role) {
      case 'customer':
        dispatch({
          type: usersListTypes.CUSTOMER_LIST_UPDATE_ROW,
          payload: result,
        });
        break;
      case 'restaurant_owner':
        dispatch({
          type: usersListTypes.RESTAURANT_OWNER_LIST_UPDATE_ROW,
          payload: result,
        });
        break;
      case 'delivery_scout':
        dispatch({
          type: usersListTypes.DELIVERY_SCOUT_LIST_UPDATE_ROW,
          payload: result,
        });
        break;
      case 'customer_service':
        dispatch({
          type: usersListTypes.CUSTOMER_SERVICE_LIST_UPDATE_ROW,
          payload: result,
        });
        break;
      default:

    }
  }
}

export const listAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: usersListTypes.ALL_USER_LIST_REQUEST,
    });

    const usersListsService = new UsersListsService();
    const result = await usersListsService.getUsersByRole('', 0, 9999);

    dispatch({
      type: usersListTypes.ALL_USER_LIST_SUCCESS,
      payload: parseDateInAllRows(result),
    });
  } catch (error) {
    dispatch({
      type: usersListTypes.ALL_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const parseDeliveryScoutData = (data) => {
  for (let i = 0; i < data.length; i++){
    let deliveryCount = data[i].count
    let scout = data[i].user[0]
    delete data[i].count
    delete data[i].user
    data[i] = { ...data[i], ...scout, delivery_count: deliveryCount}
    data[i] = parseDateInOneRow(data[i])
  }
  return data
}
