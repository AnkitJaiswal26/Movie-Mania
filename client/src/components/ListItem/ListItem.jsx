import { PlayArrow } from "@material-ui/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./ListItem.scss";
import { toast } from "react-toastify";
import { AuthContext } from "../../authContext/auth.context";

const ListItem = ({ index, item }) => {

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
			<div
				className="listItem"
				style={{ left: isHovered && index * 255 - 50 + index * 2.5 }}
				onMouseEnter={() => {
					setIsHovered(true);
				}}
				onMouseLeave={() => setIsHovered(false)}
			>
				<img src={movie.img} alt="" />
				{isHovered && (
					<div>
						<video src={movie.trailer} autoPlay={true} loop />
						<div className="itemInfo">
							<span>{movie.title}</span>
							<div className="itemInfoTop">
								<span>{movie.duration}</span>
								<span className="limit">{movie.limit}</span>
								<span>{movie.genre} </span>{" "}
								<span>{movie.year}</span>
							</div>
							<div className="desc">
								{desc.length < 150
									? desc
									: desc.substring(0, 150) + "..."}
							</div>
						</div>
					</div>
				)}
			</div>
		</Link>
	);
};

export default ListItem;
