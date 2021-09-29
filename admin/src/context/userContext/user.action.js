export const getUsersStart = () => ({
	type: "GET_USERS_START",
});

export const getUsersSuccess = (Users) => ({
	type: "GET_USERS_SUCCESS",
	payload: Users,
});

export const getUsersFailure = () => ({
	type: "GET_USERS_FAILURE",
});

export const deleteUserStart = () => ({
	type: "DELETE_USER_START",
});

export const deleteUserSuccess = (id) => ({
	type: "DELETE_USER_SUCCESS",
	payload: id,
});

export const deleteUserFailure = () => ({
	type: "DELETE_USER_FAILURE",
});
