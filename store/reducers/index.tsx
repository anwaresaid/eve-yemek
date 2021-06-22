import { combineReducers } from 'redux';
import { createFoodReducer } from './foods.reducer';
import {
  listAddonCategoryReducer,
  addonCategoryDetailsReducer,
  createAddonCategoryReducer,
  updateAddonCategoryReducer,
} from './addon-category.reducer';
import { changePasswordReducer, loginReducer } from './user.reducer';
import {
  createRestaurantReducer,
  findRestaurantReducer,
  updateRestaurantReducer,
  listRestaurantOwnersReducer,
  ownedRestaurantsList,
} from './restaurants.reducer';
import {
  listAddonsReducer,
  createAddonsReducer,
  findAddonsReducer,
  updateAddonsReducer,
} from './addons.reducer';
import { listOrdersReducer } from './orders.reducer';
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
  login: loginReducer,
  changePassword: changePasswordReducer,

  dashboardReport: dashboardReportReducer,

  updateRestaurant: updateRestaurantReducer,
  listRestaurant: listRestaurantReducer,
  findRestaurant: findRestaurantReducer,
  createRestaurant: createRestaurantReducer,
  listResOwners: listRestaurantOwnersReducer,
  ownedRestaurants: ownedRestaurantsList,

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
