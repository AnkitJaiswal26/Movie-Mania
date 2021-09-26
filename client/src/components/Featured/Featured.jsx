import { PlayArrow } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Featured.scss";
import { Link } from "react-router-dom";

const Featured = ({ type, setGenre }) => {
	const [content, setContent] = useState({});

	useEffect(() => {
		const getRandomContent = async () => {
			try {
				const res = await axios.get(`/movies/random?type=${type}`, {
					headers: {
						token: "Bearer ",
					},
				});
				setContent(res.data[0]);
			} catch (err) {
				console.log(err);
			}
		};
		getRandomContent();
	}, [type]);

	return (
		<div className="featured">
			{type && (
				<div className="category">
					<span>{type === "movie" ? "Movies" : "Series"}</span>
					<select
						name="genre"
						id="genre"
						onChange={(e) => setGenre(e.target.value)}
					>
						<option>Genre</option>
						<option value="comedy">Comedy</option>
						<option value="crime">Crime</option>
						<option value="adventure">Adventure</option>
						<option value="adventure">Adventure</option>
					</select>
				</div>
			)}
			<img src={content.img} alt="" />

			<div className="info">
				<img src={content.imgTitle} alt="" />
				<span className="desc">{content.desc}</span>
				<div className="buttons">
					<Link to={{ pathname: "/watch", movie: content }}>
						<button className="play">
							<PlayArrow />
							<span>Play</span>
						</button>
					</Link>
					{/* <button className="more">
						<InfoOutlined />
						<span>Info</span>
					</button> */}
				</div>
			</div>
		</div>
	);
};

export default Featured;
