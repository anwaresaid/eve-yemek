import { combineReducers } from "redux";
import foods from "./foods.reducer";
import user from "./user.reducer";

export default combineReducers({
    foods,
    user
});