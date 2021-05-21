import { combineReducers } from "redux";
import {createFoodReducer} from "./foods.reducer";
import user from "./user.reducer";
import {createRestaurantReducer,
    findRestaurantReducer,
    updateRestaurantReducer,
    listRestaurantOwnersReducer} from "./restaurants.reducer";
import {listAddonsReducer} from "./addons.reducer";
import {listRestaurantReducer} from "./restaurants.reducer";
import {listFoodCategoryReducer, createFoodCategoryReducer, foodCategoryDetailsReducer, updateFoodCategoryReducer} from "./foodCategory.reducer";
import { 
    updateFoodReducer, 
    findFoodReducer,
    listFoodReducer,
 } from "./foods.reducer";
import {addUserReducer, singleUserReducer, updateUserReducer, usersListsReducer} from "./userslists.reducer"

export default combineReducers({
    user,
    listRestaurantOwners: listRestaurantOwnersReducer,
    updateRestaurant: updateRestaurantReducer,
    listRestaurant: listRestaurantReducer,
    findRestaurant: findRestaurantReducer,
    createRestaurant: createRestaurantReducer,

    createFood: createFoodReducer,
    updateFood: updateFoodReducer,
    findFood: findFoodReducer,
    listFood: listFoodReducer,

    usersLists: usersListsReducer,
    singleUser: singleUserReducer,
    updateUser: updateUserReducer,
    addUser: addUserReducer,
  
    listAddons: listAddonsReducer,

    listFoodCategory: listFoodCategoryReducer,
    foodCategoryDetails: foodCategoryDetailsReducer,
    createFoodCategory: createFoodCategoryReducer,
    updateFoodCategory: updateFoodCategoryReducer,



});

