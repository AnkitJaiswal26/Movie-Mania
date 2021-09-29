import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./list.scss";
import {updateList} from '../../context/listContext/apiCalls'

export default function List() {
	const location = useLocation();
	const list = location.list;

	const [newList, setNewList] = useState(list);

	const handleChange = (e) => {
		const value = e.target.value;
		setNewList({ ...list, [e.target.name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// updateList()
	};

	return (
		<div className="list">
			<div className="productTitleContainer">
				<h1 className="productTitle">List</h1>
				<Link to="/newList">
					<button className="productAddButton">Create</button>
				</Link>
			</div>
			<div className="productTop">
				<div className="productTopRight">
					<div className="productInfoTop">
						<span className="productName">{list.title}</span>
					</div>
					<div className="productInfoBottom">
						<div className="productInfoItem">
							<span className="productInfoKey">Id:</span>
							<span className="productInfoValue">{list._id}</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">Genre:</span>
							<span className="productInfoValue">
								{list.genre}
							</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">Type:</span>
							<span className="productInfoValue">
								{list.type}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="productBottom">
				<form className="productForm">
					<div className="productFormLeft">
						<div className="inputContainer">
							<label className="inputLabel">Title</label>
							<input
								className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
								type="text"
								placeholder="Movie Title"
								name="title"
								value={list.title}
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
								value={list.genre}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="flex flex-col items-center">
						<a
							className="font-semibold shadow-sm rounded-lg py-3 bg-red-600 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-red-700 focus:shadow-sm focus:shadow-outline mt-5"
							style={{ width: "300px" }}
							onClick={handleSubmit}
							href="/"
						>
							<span className="ml-4">Update Movie</span>
						</a>
					</div>
				</form>
			</div>
		</div>
	);
}
