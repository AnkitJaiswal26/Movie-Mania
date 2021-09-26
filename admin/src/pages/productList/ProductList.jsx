import "./productList.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movieContext/movieContext";
import { getMovies, deleteMovie } from "../../context/movieContext/apicalls";

export default function ProductList() {
	const { movies, dispatch } = useContext(MovieContext);

	useEffect(() => {
		getMovies(dispatch);
	}, [dispatch]);

	const handleDelete = (id) => {
		deleteMovie(id, dispatch);
	};

	const columns = [
		{ field: "_id", headerName: "ID", width: 100 },
		{
			field: "movie",
			headerName: "Movie",
			width: 250,
			renderCell: (params) => {
				return (
					<div className="productListItem">
						<img
							className="productListImg"
							src={params.row.img}
							alt=""
						/>
						{params.row.title}
					</div>
				);
			},
		},
		{ field: "genre", headerName: "Genre", width: 150 },
		{ field: "year", headerName: "Year", width: 120 },
		{ field: "limit", headerName: "Limit", width: 120 },
		{ field: "isSeries", headerName: "Is Series", width: 150 },
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				console.log(params.row)
				return (
					<>
						<Link
							to={{
								pathname: "/movie/" + params.row._id,
								movie: params.row,
							}}
						>
							<button className="productListEdit">Edit</button>
						</Link>
						<DeleteOutline
							className="productListDelete"
							onClick={() => handleDelete(params.row._id)}
						/>
					</>
				);
			},
		},
	];

	return (
		<div className="productList">
			<DataGrid
				rows={movies}
				disableSelectionOnClick
				columns={columns}
				pageSize={8}
				checkboxSelection
				getRowId={(r) => r._id}
			/>
		</div>
	);
}
