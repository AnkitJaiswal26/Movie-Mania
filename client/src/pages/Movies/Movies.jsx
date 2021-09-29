import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authContext/auth.context";
import Navbar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import "./Movies.scss";
import Movie from "../../components/Movie/Movie";
import SearchIcon from "@material-ui/icons/Search";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const { user } = useContext(AuthContext);
	const [data, setData] = useState("");

	useEffect(() => {
		const getAllMovies = async () => {
			try {
				const res = await axios.get("/movies/find", {
					headers: {
						token: `Bearer ${user.accessToken}`,
					},
				});
				setMovies(res.data);
			} catch (err) {
				toast.error(err);
			}
		};
		getAllMovies();
	}, [user.accessToken]);

	const handleSubmit = async () => {
		console.log(user.accessToken);
		try {
			const res = await axios.get("/movies/find", {
				headers: {
					token: `Bearer ${user.accessToken}`,
				},
				params: { name: data },
			});
			setMovies(res.data);
		} catch (err) {
			toast.error(err);
		}
	};

	return (
		<div className="movies">
			<Navbar />
			<div className="mainContainer">
				<div className="search">
					<div className="searchInputs">
						<input
							type="text"
							placeholder="Search Movie..."
							value={data}
							onChange={(e) => setData(e.target.value)}
						/>
						<div
							className="searchIcon"
							onClick={(e) => {
								data.length && handleSubmit();
								console.log("Hii");
							}}
						>
							<SearchIcon className="icon" />
						</div>
					</div>
				</div>
				<div className="moviesContainer">
					{movies.map((item, index) => (
						<Movie
							className="listItem"
							index={index}
							item={item._id}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Movies;
