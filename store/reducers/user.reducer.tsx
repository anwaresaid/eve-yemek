import { userTypes } from "../types/user.type";

const initialState = [];

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case userTypes.LOGIN:
    	localStorage.setItem("access_token", payload.access_token);
		localStorage.setItem("user", JSON.stringify(payload));
		return { 
			...state,
			user:payload
		}
	case userTypes.LOGIN_FAILED:
		return {
			...state,
			login_error_msg:payload?.login_error_msg
		}

    default:
    	return state;
  }
};

export default userReducer;