import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./auth.action";

export const login = async (user, dispatch) => {
	dispatch(loginStart());
	try {
		const res = await axios.post("auth/login", user);
		localStorage.setItem("user", JSON.stringify(res.data));
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};
