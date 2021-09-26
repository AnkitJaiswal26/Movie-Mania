import axios from "axios";
import { toast } from "react-toastify";
import { loginFailure, loginStart, loginSuccess } from "./authActions";

export const login = async (user, dispatch) => {
	dispatch(loginStart());
	try {
		const res = await axios.post("auth/login", user);
		res.data.isAdmin && dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
		const { status, data } = err.response;
		console.log(data);
		if (status === 500) {
			toast.error("Server not connected!");
		} else {
			toast.error(data);
		}
	}
};
