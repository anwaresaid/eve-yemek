import restaurantOwnerList from "../../pages/users/restaurant_owners";
import UsersListsService from "../services/userslists.service";
import { usersListTypes } from "../types/userslists.type";
import {useDispatch} from 'react-redux'

export const listCustomers = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: usersListTypes.CUSTOMER_LIST_REQUEST,
        });

        const usersListsService = new UsersListsService;
        const result = await usersListsService.getUsersByRole('customer');



        dispatch({
            type: usersListTypes.CUSTOMER_LIST_SUCCESS,
            payload: parseDateInAllRows(result),
        });
        

    } catch (error){
        dispatch({
            type: usersListTypes.CUSTOMER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }

}

export const listRestaurantOwners = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: usersListTypes.RESTAURANT_OWNER_LIST_REQUEST,
        });

        const usersListsService = new UsersListsService;
        const result = await usersListsService.getUsersByRole('restaurant_owner');

        dispatch({
            type: usersListTypes.RESTAURANT_OWNER_LIST_SUCCESS,
            payload: parseDateInAllRows(result),
        });

    } catch (error){
        dispatch({
            type: usersListTypes.RESTAURANT_OWNER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }

}

export const listDeliveryScouts = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: usersListTypes.DELIVERY_SCOUT_LIST_REQUEST,
        });

        const usersListsService = new UsersListsService;
        const result = await usersListsService.getUsersByRole('delivery_scout');

        dispatch({
            type: usersListTypes.DELIVERY_SCOUT_LIST_SUCCESS,
            payload: parseDateInAllRows(result),
        });

    } catch (error){
        dispatch({
            type: usersListTypes.DELIVERY_SCOUT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }

}

export const listCustomerService = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: usersListTypes.CUSTOMER_SERVICE_LIST_REQUEST,
        });

        const usersListsService = new UsersListsService;
        const result = await usersListsService.getUsersByRole('customer_service');

        dispatch({
            type: usersListTypes.CUSTOMER_SERVICE_LIST_SUCCESS,
            payload: parseDateInAllRows(result),
        });

    } catch (error){
        dispatch({
            type: usersListTypes.CUSTOMER_SERVICE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }

}

export const getSingleUser = (id) => async (dispatch, getState) => {

    try {

        dispatch({
            type: usersListTypes.GET_USER_REQUEST,
        });

        const usersListsService = new UsersListsService;

        
        const result = await usersListsService.getSingleUser(id);

        dispatch({
            type: usersListTypes.GET_USER_SUCCESS,
            payload: result,
        });

        return result

    } catch (error){
        dispatch({
            type: usersListTypes.GET_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }

}

export const addUser = (data) => async (dispatch, getState) => {
    console.log(data)
    try {

        dispatch({
            type: usersListTypes.ADD_USER_REQUEST,
        });

        const usersListsService = new UsersListsService;

        
        const result = await usersListsService.addUser(data);

        dispatch({
            type: usersListTypes.ADD_USER_SUCCESS,
            payload: result,
        });

        
        return result

    } catch (error){
        dispatch({
            type: usersListTypes.ADD_USER_FAIL,
        payload:
            error.response && error.response.data.error ?
            error.response.data.error?.message : "Error"
        })
    } finally {

        dispatch({
            type: usersListTypes.ADD_USER_END
        })
        
    }

}

export const updateUser = (id, data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: usersListTypes.UPDATE_USER_REQUEST,
        });

        const usersListsService = new UsersListsService;

        
        const result = await usersListsService.updateUser(id, data);
        
        dispatch({
            type: usersListTypes.UPDATE_USER_SUCCESS,
            payload: result,
        })
        var tempRoles = [...data.roles, ...result.roles]
        tempRoles = tempRoles.filter(onlyUnique)
        
        dispatch({
            type: usersListTypes.UPDATE_USER_END
        })
        
        updateEditedRowInStore(tempRoles, result, dispatch)
        
        
        return result

    } catch (error){
        dispatch({
            type: usersListTypes.UPDATE_USER_FAIL,
            payload: 
                error.response && error.response.data.error ?
                error.response.data.error?.response.message[0] : "Error"
        })
    }

}

function parseDateInAllRows(rows){
    for (let row of rows.items){
        row.howLongAgo = Math.round(((new Date()).getTime() - (new Date(row.createdAt)).getTime() ) / (1000*60*60*24)) + " gün önce"
    }
    return rows
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }  

function updateEditedRowInStore(roles, result, dispatch){
    debugger;
    for (let role of roles){
        switch (role) {
            case "customer":
                dispatch({
                    type: usersListTypes.CUSTOMER_LIST_UPDATE_ROW,
                    payload: result
                })
            case "restaurant_owner":
                dispatch({
                    type: usersListTypes.RESTAURANT_OWNER_LIST_UPDATE_ROW,
                    payload: result
                })
            case "delivery_scout":
                dispatch({
                    type: usersListTypes.DELIVERY_SCOUT_LIST_UPDATE_ROW,
                    payload: result
                })
            case "customer_service":
                dispatch({
                    type: usersListTypes.CUSTOMER_SERVICE_LIST_UPDATE_ROW,
                    payload: result
                })
            default:
                console.log("Unavailable")
        }
    }
}