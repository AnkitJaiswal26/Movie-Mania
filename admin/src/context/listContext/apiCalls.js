import axios from "axios";
import {
	createListFailure,
	createListStart,
	createListSuccess,
	deleteListFailure,
	deleteListStart,
	deleteListSuccess,
	getListsFailure,
	getListsStart,
	getListsSuccess,
	updateListFailure,
	updateListStart,
	updateListSuccess,
} from "./list.action";
import { toast } from "react-toastify";

export const getLists = async (dispatch) => {
	dispatch(getListsStart());
	try {
		const res = await axios.get("/lists", {
			headers: {
				token: `Bearer ${
					JSON.parse(localStorage.getItem("user")).accessToken
				}`,
			},
		});
		dispatch(getListsSuccess(res.data));
	} catch (err) {
		toast.error(err.response.data);
		dispatch(getListsFailure());
	}
};

//create
export const createList = async (list, dispatch) => {
	dispatch(createListStart());
	try {
		const res = await axios.post("/lists", list, {
			headers: {
				token: `Bearer ${
					JSON.parse(localStorage.getItem("user")).accessToken
				}`,
			},
		});
		dispatch(createListSuccess(res.data));
		toast.success("New List created Successfully!");
	} catch (err) {
		err.response.status === 500
			? toast.error("Server Error! Try again later")
			: toast.error(err.response.data);
		dispatch(createListFailure());
	}
};

//delete
export const deleteList = async (id, dispatch) => {
	dispatch(deleteListStart());
	try {
		const res = await axios.delete("/lists/" + id, {
			headers: {
				token: `Bearer ${
					JSON.parse(localStorage.getItem("user")).accessToken
				}`,
			},
		});
		toast.success(res.data);
		dispatch(deleteListSuccess(id));
	} catch (err) {
		err.response.status === 500
			? toast.error("Server Error! Try again later")
			: toast.error(err.response.data);
		dispatch(deleteListFailure());
	}
};

//delete
export const updateList = async (newList, dispatch) => {
	dispatch(updateListStart());
	try {
		const res = await axios.delete("/lists/" + newList._id, newList, {
			headers: {
				token: `Bearer ${
					JSON.parse(localStorage.getItem("user")).accessToken
				}`,
			},
		});
		toast.success(res.data);
		dispatch(updateListSuccess());
	} catch (err) {
		err.response.status === 500
			? toast.error("Server Error! Try again later")
			: toast.error(err.response.data);
		dispatch(updateListFailure());
	}
};
