import { userTypes } from "../types/user.type";
import UserService from "../services/user.service";

const login = (email: string, password: string) => async dispatch => {

    try {

        const res: any = await UserService.login(email, password);
        
        if (res?.ok) {
            const access_token = res?.data?.access_token;
            await dispatch({ type: userTypes.LOGIN, payload: access_token });
            window.location.replace("/");
        } else {
            await dispatch({ type:userTypes.LOGIN_FAILED, payload:{ login_error_msg:res?.err?.message || "Something went wrong while logging in" } })
        }

    } catch (err) {
        dispatch({ type:userTypes.LOGIN_FAILED, payload:{ login_error_msg:"Something went wrong while logging in" } });
    }
}

export default {
    login
}

