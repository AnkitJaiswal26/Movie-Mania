import "./newList.scss";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movieContext/movie.context";
import { ListContext } from "../../context/listContext/list.context";

import { getMovies } from "../../context/movieContext/apicalls";
import { createList } from "../../context/listContext/apiCalls";
import { useHistory } from "react-router";
import Select from "react-select";

export default function NewList() {
	const [list, setList] = useState({
		title: "",
		genre: "",
		type: "",
		content: [],
	});
	const history = useHistory();

	const { dispatch } = useContext(ListContext);
	const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

	const handleChange = (e) => {
		const value = e.target.value;
		setList({ ...list, [e.target.name]: value });
	};

	useEffect(() => {
		getMovies(dispatchMovie);
	}, [dispatchMovie]);

	const handleSelect = (e) => {
		let value = Array.isArray(e) ? e.map((x) => x.value) : [];
		setList({ ...list, content: value });
	};

	const handleSelectChange = (e) => {
		const value = e.value;
		setList({ ...list, type: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createList(list, dispatch);
		history.push("/lists");
	};
	return (
		<div className="newList">
			<h1 className="addProductTitle">New List</h1>
			<form className="addProductForm">
				<div className="container">
					<div className="formLeft">
						<div className="inputContainer">
							<label className="inputLabel">List Title</label>
							<input
								className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
								type="text"
								placeholder="List Title"
								name="title"
								onChange={handleChange}
							/>
						</div>
						<div className="inputContainer">
							<label className="inputLabel">Genre</label>
							<input
								className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
								type="text"
								placeholder="Genre"
								name="genre"
								onChange={handleChange}
							/>
						</div>
						<div className="inputContainer">
							<label className="inputLabel">Type</label>
							<Select
								styles={{
									option: (base, state) => ({
										...base,
										fontSize: "0.875rem",
										color: state.isSelected
											? "#fff"
											: "#555",
									}),
									control: (css) => ({
										...css,
										paddingLeft: "0.8rem",
										fontSize: "0.875rem",
									}),
								}}
								className={`w-full`}
								defaultValue="movie"
								placeholder="Movie"
								options={[
									{
										label: "Movie",
										value: "movie",
									},
									{ label: "Series", value: "series" },
								]}
								onChange={handleSelectChange}
							/>
						</div>
					</div>
					<div className="formRight">
						<div className="addProductItem">
							<label>Content</label>
							<Select
								className="dropdown"
								placeholder="Select Option"
								styles={{
									option: (base, state) => ({
										...base,
										fontSize: "0.875rem",
										color: state.isSelected
											? "#fff"
											: "#555",
									}),
									control: (css) => ({
										...css,
										paddingLeft: "0.8rem",
										fontSize: "0.875rem",
									}),
								}}
								value={movies
									.map((movie) => {
										return {
											label: movie.title,
											value: movie._id,
										};
									})
									.filter((obj) =>
										list.content.includes(obj.value)
									)}
								options={movies.map((movie) => {
									return {
										label: movie.title,
										value: movie._id,
									};
								})}
								onChange={handleSelect}
								isMulti
								isClearable
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<a
						className="font-semibold shadow-sm rounded-lg py-3 bg-red-600 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-red-700 focus:shadow-sm focus:shadow-outline mt-5"
						style={{ width: "300px" }}
						onClick={handleSubmit}
						href="/"
					>
						<span className="ml-4">Create List</span>
					</a>
				</div>
			</form>
		</div>
	);
}
