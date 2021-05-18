import { combineReducers } from "redux";
import {createFoodReducer} from "./foods.reducer";
import user from "./user.reducer";
import {createRestaurantReducer,
    findRestaurantReducer,
    updateRestaurantReducer,
    listRestaurantOwnersReducer} from "./restaurants.reducer";
import {listAddonsReducer} from "./addons.reducer";
import {listRestaurantReducer} from "./restaurants.reducer";
import {listFoodCategoryReducer} from "./foodCategory.reducer";
import { 
    updateFoodReducer, 
    findFoodReducer,
    listFoodReducer,
 } from "./foods.reducer";


export default combineReducers({
    user,
    listRestaurantOwners: listRestaurantOwnersReducer,
    updateRestaurant: updateRestaurantReducer,
    listRestaurant: listRestaurantReducer,
    findRestaurant: findRestaurantReducer,
    createRestaurant: createRestaurantReducer,
    createFood: createFoodReducer,
    listAddons: listAddonsReducer,
    listFoodCategory: listFoodCategoryReducer,
    updateFood: updateFoodReducer,
    findFood: findFoodReducer,
    listFood: listFoodReducer,
});

