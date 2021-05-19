import UsersListsService from "../services/userslists.service";
import { usersListTypes } from "../types/userslists.type";

export const listCustomers = () => async (dispatch, getState) => {

    try {

        dispatch({
            type: usersListTypes.CUSTOMER_LIST_REQUEST,
        });

        const usersListsService = new UsersListsService;
        const result = await usersListsService.getCustomers();



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
        });

        dispatch({
            type: usersListTypes.UPDATE_USER_END
        })

        return result

    } catch (error){
        dispatch({
            type: usersListTypes.UPDATE_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }

}

function parseDateInAllRows(rows){
    for (let row of rows.items){
        row.howLongAgo = Math.round(((new Date()).getTime() - (new Date(row.createdAt)).getTime() ) / (1000*60*60*24)) + " gün önce"
    }
    return rows
}