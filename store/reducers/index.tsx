import { combineReducers } from "redux";
import foods from "./foods.reducer";
import user from "./user.reducer";
import {listRestaurantOnwersReducer} from "./restaurants.reducer";
import {updateRestaurantReducer} from "./restaurants.reducer";

export default combineReducers({
    foods,
    user,
    listRestaurantOnwers: listRestaurantOnwersReducer,
    updateRestaurant: updateRestaurantReducer,
});