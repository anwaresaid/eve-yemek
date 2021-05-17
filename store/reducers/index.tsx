import { combineReducers } from "redux";
import {createFoodReducer} from "./foods.reducer";
import user from "./user.reducer";
<<<<<<< HEAD
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
=======
import {listAddonsReducer} from "./addons.reducer";
import {listRestaurantsReducer} from "./restaurants.reducer";
import {listFoodCategoryReducer} from "./foodCategory.reducer";

const rootReducer =  combineReducers({
    user,
    createFood: createFoodReducer,
    listAddons: listAddonsReducer,
    listRestaurants: listRestaurantsReducer,
    listFoodCategory: listFoodCategoryReducer,
});

export default rootReducer;
>>>>>>> 713cbe7 (implemented redux for creating food, some code cleanup)
