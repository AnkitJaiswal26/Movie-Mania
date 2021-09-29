import axios from "axios";
import { toast } from "react-toastify";
import {
	deleteUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	getUsersFailure,
	getUsersStart,
	getUsersSuccess,
} from "./user.action";

export const getUsers = async (dispatch) => {
	dispatch(getUsersStart());
	try {
		const res = await axios.get("/users", {
			headers: {
				token: `Bearer ${
					JSON.parse(localStorage.getItem("user")).accessToken
				}`,
			},
		});
		dispatch(getUsersSuccess(res.data));
	} catch (err) {
		err.response.status === 500
			? toast.error("Server Error! Try again later")
			: toast.error(err.response.data);
		dispatch(getUsersFailure());
	}
};

export const deleteUser = async (id, dispatch) => {
	dispatch(deleteUserStart());
	try {
		await axios.delete("/users/" + id, {
			headers: {
				token: `Bearer ${
					JSON.parse(localStorage.getItem("user")).accessToken
				}`,
			},
		});
		dispatch(deleteUserSuccess);
	} catch (err) {
		err.response.status === 500
			? toast.error("Server Error! Try again later")
			: toast.error(err.response.data);
		dispatch(deleteUserFailure());
	}
};
