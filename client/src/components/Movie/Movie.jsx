import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Movie.scss";
import { toast } from "react-toastify";
import { AuthContext } from "../../authContext/auth.context";

const Movie = ({ index, item }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [movie, setMovie] = useState({});
	const { user } = useContext(AuthContext);
	const [desc, setDesc] = useState("");
	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await axios.get("/movies/find/" + item, {
					headers: {
						token: `Bearer ${user.accessToken}`,
					},
				});
				setMovie(res.data);
			} catch (err) {
				toast.error(err.response.data);
			}
		};
		getMovie();
	}, [user.accessToken, item]);

	useEffect(() => {
		setDesc(movie.desc);
	}, [movie.desc]);

	return (
		<Link to={{ pathname: "/movie", movie: movie }}>
			<div className="movie">
				<img src={movie.img} alt="" />
				<h2>{movie.title}</h2>
			</div>
		</Link>
	);
};

export default Movie;
