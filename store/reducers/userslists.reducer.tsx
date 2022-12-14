import { usersListTypes } from '../types/userslists.type';

const initialState = [];

export const customerListReducer = (
  state = { customers: { items: [] } },
  action
) => {
  const { type, payload } = action;

  switch (action.type) {
    case usersListTypes.CUSTOMER_LIST_REQUEST:
      return { loading: true };
    case usersListTypes.CUSTOMER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        customers: action.payload,
      };
    case usersListTypes.CUSTOMER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case usersListTypes.CUSTOMER_LIST_UPDATE_ROW:
      const index = state.customers.items.findIndex(
        (item) => (item._id ?? item.id) === action.payload.id
      );
      const tempCustomers = [...state.customers.items];
      tempCustomers[index] = action.payload;
      return {
        ...state,
        customers: { ...state.customers, items: tempCustomers },
      };
    default:
      return state;
  }
};

export const restaurantOwnerListReducer = (
  state = { restaurantOwners: { items: [] } },
  action
) => {
  const { type, payload } = action;

  switch (action.type) {
    case usersListTypes.RESTAURANT_OWNER_LIST_REQUEST:
      return { loading: true };
    case usersListTypes.RESTAURANT_OWNER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        restaurantOwners: action.payload,
      };
    case usersListTypes.RESTAURANT_OWNER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case usersListTypes.RESTAURANT_OWNER_LIST_UPDATE_ROW:
      const index = state.restaurantOwners.items.findIndex(
        (item) => (item._id ?? item.id) === action.payload.id
      ); // amend after backend is fixed
      const tempResOwners = [...state.restaurantOwners.items];
      tempResOwners[index] = action.payload;
      return {
        ...state,
        restaurantOwners: { ...state.restaurantOwners, items: tempResOwners },
      };
    default:
      return state;
  }
};

export const deliveryScoutListReducer = (
  state = { deliveryScouts: { items: [] } },
  action
) => {
  const { type, payload } = action;

  switch (action.type) {
    case usersListTypes.DELIVERY_SCOUT_LIST_REQUEST:
      return { loading: true };
    case usersListTypes.DELIVERY_SCOUT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        deliveryScouts: action.payload,
      };
    case usersListTypes.DELIVERY_SCOUT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case usersListTypes.DELIVERY_SCOUT_LIST_UPDATE_ROW:
      const index = state.deliveryScouts.items.findIndex(
        (item) => (item._id ?? item.id) === action.payload.id
      );
      const tempDelScouts = [...state.deliveryScouts.items];
      tempDelScouts[index] = action.payload;
      return {
        ...state,
        deliveryScouts: { ...state.deliveryScouts, items: tempDelScouts },
      };
    default:
      return state;
  }
};

export const customerServiceListReducer = (
  state = { customerService: { items: [] } },
  action
) => {
  const { type, payload } = action;

  switch (action.type) {
    case usersListTypes.CUSTOMER_SERVICE_LIST_REQUEST:
      return { loading: true };
    case usersListTypes.CUSTOMER_SERVICE_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        customerService: action.payload,
      };
    case usersListTypes.CUSTOMER_SERVICE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case usersListTypes.CUSTOMER_SERVICE_LIST_UPDATE_ROW:
      const index = state.customerService.items.findIndex(
        (item) => (item._id ?? item.id) === action.payload.id
      );
      const tempCusService = [...state.customerService.items];
      tempCusService[index] = action.payload;
      return {
        ...state,
        customerService: { ...state.customerService, items: tempCusService },
      };
    default:
      return state;
  }
};

export const singleUserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (action.type) {
    case usersListTypes.GET_USER_REQUEST:
      return { loading: true };
    case usersListTypes.GET_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        userData: action.payload,
      };
    case usersListTypes.GET_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      case usersListTypes.GET_USER_RESET:
        return {};
    default:
      return state;
  }
};

export const addUserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (action.type) {
    case usersListTypes.ADD_USER_REQUEST:
      return { adding: true };
    case usersListTypes.ADD_USER_SUCCESS:
      return {
        adding: false,
        success: true,
        response: action.payload,
      };
    case usersListTypes.ADD_USER_FAIL:
      return {
        adding: false,
        error: action.payload,
      };
    case usersListTypes.ADD_USER_END:
      return {
        adding: false,
        success: false,
        error: null,
        response: null,
      };
      case usersListTypes.ADD_USER_RESET:
        return {};

    default:
      return state;
  }
};

export const updateUserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (action.type) {
    case usersListTypes.UPDATE_USER_REQUEST:
      return { updating: true, success: false };
    case usersListTypes.UPDATE_USER_SUCCESS:
      return {
        updating: false,
        success: true,
        response: action.payload,
      };
    case usersListTypes.UPDATE_USER_END:
      return {
        updating: false,
        success: false,
      };
    case usersListTypes.UPDATE_USER_FAIL:
      return {
        updating: false,
        error: action.payload,
      };
      case usersListTypes.UPDATE_USER_RESET:
        return {};

    default:
      return state;
  }
};

export const allUsersListReducer = (
  state = { users: { items: [] } },
  action
) => {
  const { type, payload } = action;

  switch (action.type) {
    case usersListTypes.ALL_USER_LIST_REQUEST:
      return { loading: true };
    case usersListTypes.ALL_USER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        users: action.payload,
      };
    case usersListTypes.ALL_USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case usersListTypes.ALL_USER_LIST_UPDATE_ROW:
      const index = state.users.items.findIndex(
        (item) => (item._id ?? item.id) === action.payload.id
      );
      const tempUsers = [...state.users.items];
      tempUsers[index] = action.payload;
      return {
        ...state,
        users: { ...state.users, items: tempUsers },
      };
    default:
      return state;
  }
};

export const usersFcmTokensListReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (action.type) {
    case usersListTypes.USERS_FCM_TOKEN_REQUEST:
      return { adding: true };

    case usersListTypes.USERS_FCM_TOKEN_SUCCESS:
      return {
        success: true,
        fcm_tokens: action.payload,
      };

    case usersListTypes.USERS_FCM_TOKEN_FAIL:
      return {
        adding: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
