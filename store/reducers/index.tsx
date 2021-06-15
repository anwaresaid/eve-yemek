import { combineReducers } from 'redux';
import { createFoodReducer } from './foods.reducer';
import {
  listAddonCategoryReducer,
  addonCategoryDetailsReducer,
  createAddonCategoryReducer,
  updateAddonCategoryReducer,
} from './addon-category.reducer';
import user from './user.reducer';
import {
  createRestaurantReducer,
  findRestaurantReducer,
  updateRestaurantReducer,
  listRestaurantOwnersReducer,
} from './restaurants.reducer';
import {
  listAddonsReducer,
  createAddonsReducer,
  findAddonsReducer,
  updateAddonsReducer,
} from './addons.reducer';
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
  listFoodByRestaurantReducer,
} from './foods.reducer';

import {
  addUserReducer,
  singleUserReducer,
  updateUserReducer,
  customerListReducer,
  restaurantOwnerListReducer,
  deliveryScoutListReducer,
  customerServiceListReducer,
  allUsersListReducer,
  usersFcmTokensListReducer,
} from './userslists.reducer';
import { forgotPasswordReducer, listSettingsReducer, updateSettingsReducer } from './settings.reducer';
import { dashboardReportReducer } from './dashboard.reducer';
import { listCouponsReducer, createCouponsReducer } from './coupons.reducer';
import { sendNotificationReducer } from './send_notifications.reducer';

export default combineReducers({
  user,

  dashboardReport: dashboardReportReducer,

  updateRestaurant: updateRestaurantReducer,
  listRestaurant: listRestaurantReducer,
  findRestaurant: findRestaurantReducer,
  createRestaurant: createRestaurantReducer,
  listResOwners: listRestaurantOwnersReducer,

  createFood: createFoodReducer,
  updateFood: updateFoodReducer,
  findFood: findFoodReducer,
  listFood: listFoodReducer,
  listFoodByRestaurant: listFoodByRestaurantReducer,

  listCustomers: customerListReducer,
  listRestaurantOwners: restaurantOwnerListReducer,
  listDeliveryScouts: deliveryScoutListReducer,
  listCustomerService: customerServiceListReducer,
  allUsersList: allUsersListReducer,
  usersFcmTokensList: usersFcmTokensListReducer,

  singleUser: singleUserReducer,
  updateUser: updateUserReducer,
  addUser: addUserReducer,

  listAddons: listAddonsReducer,
  createAddons: createAddonsReducer,
  findAddons: findAddonsReducer,
  updateAddons: updateAddonsReducer,

  listOrders: listOrdersReducer,
  findOrder: findOrderReducer,

  listFoodCategory: listFoodCategoryReducer,
  foodCategoryDetails: foodCategoryDetailsReducer,
  createFoodCategory: createFoodCategoryReducer,
  updateFoodCategory: updateFoodCategoryReducer,

  listSettings: listSettingsReducer,
  updateSettings: updateSettingsReducer,
  forgotPassword: forgotPasswordReducer,

  listAddonCategory: listAddonCategoryReducer,
  addonCategoryDetails: addonCategoryDetailsReducer,
  updateAddonCategory: updateAddonCategoryReducer,
  createAddonCategory: createAddonCategoryReducer,

  listCoupons: listCouponsReducer,
  createCoupons: createCouponsReducer,

  sendNotification: sendNotificationReducer,
});
