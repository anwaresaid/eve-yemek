import { combineReducers } from "redux";
import foods from "./foods.reducer";
import user from "./user.reducer";
import {listRestaurantOwnersReducer} from "./restaurants.reducer";
import {updateRestaurantReducer} from "./restaurants.reducer";
import {listRestaurantReducer} from "./restaurants.reducer";
import {findRestaurantReducer} from "./restaurants.reducer";
import {createRestaurantReducer} from "./restaurants.reducer";

export default combineReducers({
    foods,
    user,
    listRestaurantOwners: listRestaurantOwnersReducer,
    updateRestaurant: updateRestaurantReducer,
    listRestaurant: listRestaurantReducer,
    findRestaurant: findRestaurantReducer,
    createRestaurant: createRestaurantReducer,
});