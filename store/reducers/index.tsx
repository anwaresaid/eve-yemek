import { combineReducers } from 'redux';
import { createFoodReducer } from './foods.reducer';
import user from './user.reducer';
import {
  createRestaurantReducer,
  findRestaurantReducer,
  updateRestaurantReducer,
  listRestaurantOwnersReducer,
} from './restaurants.reducer';
import { listAddonsReducer } from './addons.reducer';
import { listOrdersReducer, findOrderReducer } from './orders.reducer';
import { listRestaurantReducer } from './restaurants.reducer';
import {
  listFoodCategoryReducer,
  createFoodCategoryReducer,
  foodCategoryDetailsReducer,
  updateFoodCategoryReducer,
} from './foodCategory.reducer';
import {
  updateFoodReducer,
  findFoodReducer,
  listFoodReducer,
} from './foods.reducer';

import {
  addUserReducer,
  singleUserReducer,
  updateUserReducer,
  customerListReducer,
  restaurantOwnerListReducer,
  deliveryScoutListReducer,
  customerServiceListReducer,
} from './userslists.reducer';
import { listSettingsReducer, updateSettingsReducer } from './settings.reducer';

export default combineReducers({
  user,

  updateRestaurant: updateRestaurantReducer,
  listRestaurant: listRestaurantReducer,
  findRestaurant: findRestaurantReducer,
  createRestaurant: createRestaurantReducer,
  listResOwners: listRestaurantOwnersReducer,

  createFood: createFoodReducer,
  updateFood: updateFoodReducer,
  findFood: findFoodReducer,
  listFood: listFoodReducer,

  listCustomers: customerListReducer,
  listRestaurantOwners: restaurantOwnerListReducer,
  listDeliveryScouts: deliveryScoutListReducer,
  listCustomerService: customerServiceListReducer,

  singleUser: singleUserReducer,
  updateUser: updateUserReducer,
  addUser: addUserReducer,

  listAddons: listAddonsReducer,

  listOrders: listOrdersReducer,
  findOrder: findOrderReducer,

  listFoodCategory: listFoodCategoryReducer,
  foodCategoryDetails: foodCategoryDetailsReducer,
  createFoodCategory: createFoodCategoryReducer,
  updateFoodCategory: updateFoodCategoryReducer,

  listSettings: listSettingsReducer,
  updateSettings: updateSettingsReducer,
});
