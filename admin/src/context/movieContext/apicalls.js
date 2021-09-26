import axios from "axios";
import { toast } from "react-toastify";
import {
	createMovieFailure,
	createMovieStart,
	createMovieSuccess,
	deleteMovieFailure,
	deleteMovieStart,
	deleteMovieSuccess,
	getMoviesFailure,
	getMoviesStart,
	getMoviesSuccess,
	updateMovieFailure,
	updateMovieStart,
	updateMovieSuccess,
} from "./movieAction";

export const getMovies = async (dispatch) => {
	dispatch(getMoviesStart());
	try {
		const res = await axios.get("/movies", {
			headers: {
				token:
					"Bearer " +
					JSON.parse(localStorage.getItem("user")).accessToken,
			},
		});
		dispatch(getMoviesSuccess(res.data));
	} catch (err) {
		dispatch(getMoviesFailure());
	}
};

//create
export const createMovie = async (movie, dispatch) => {
	dispatch(createMovieStart());
	try {
		const res = await axios.post("/movies", movie, {
			headers: {
				token:
					"Bearer " +
					JSON.parse(localStorage.getItem("user")).accessToken,
			},
		});
		dispatch(createMovieSuccess(res.data));
	} catch (err) {
		dispatch(createMovieFailure());
	}
};

//delete
export const deleteMovie = async (id, dispatch) => {
	dispatch(deleteMovieStart());
	try {
		await axios.delete("/movies/" + id, {
			headers: {
				token:
					"Bearer " +
					JSON.parse(localStorage.getItem("user")).accessToken,
			},
		});
		dispatch(deleteMovieSuccess(id));
	} catch (err) {
		dispatch(deleteMovieFailure());
	}
};

//delete
export const updateMovie = async (movie, dispatch) => {
	dispatch(updateMovieStart());
	try {
		const res = await axios.put("/movies/" + movie._id, movie, {
			headers: {
				token:
					"Bearer " +
					JSON.parse(localStorage.getItem("user")).accessToken,
			},
		});
		console.log(res.data);
		dispatch(updateMovieSuccess(res.data));
		toast.success("Movie Updated Successfully!")
	} catch (err) {
		console.log(err);
		dispatch(updateMovieFailure());
		toast.success("Some error occured. Please try again later!")
	}
};
