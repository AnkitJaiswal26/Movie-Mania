import {
	Bookmark,
	FavoriteBorderOutlined,
	FavoriteBorderSharp,
	PlayArrow,
} from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import "./Featured.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/auth.context";
import { toast } from "react-toastify";

const Featured = ({ type, setGenre }) => {
	const [content, setContent] = useState({});
	const location = useLocation();
	const movie = location.movie;

	const { user } = useContext(AuthContext);

	const [bookMark, setBookMark] = useState(
		user.bookmark
			? user.bookmark.find((f) => f === (movie ? movie._id : content._id))
			: false
	);
	const [favorite, setFavorite] = useState(
		user.favorite
			? user.favorite.find((f) => f === (movie ? movie._id : content._id))
			: false
	);

	const handleChange = async (value) => {
		if (value === "favorite") {
			const fav = user.favorite || [];
			console.log(fav);

			if (favorite) {
				console.log(
					fav.filter((f) => f !== (movie ? movie._id : content._id))
				);
			} else {
				if (!fav.find((f) => f === (movie ? movie._id : content._id)))
					fav.push(movie ? movie._id : content._id);
			}
			user.favorite = [...fav];
			try {
				const res = await axios.put(`/users/add`, user, {
					headers: {
						token: `Bearer ${user.accessToken}`,
					},
				});
				setFavorite(favorite ? false : true);
			} catch (err) {
				toast.error(err);
			}
		} else {
		}
	};

	useEffect(() => {
		const getRandomContent = async () => {
			try {
				const res = await axios.get(`/movies/random?type=movies`, {
					headers: {
						token: `Bearer ${user.accessToken}`,
					},
				});
				console.log(res.data[0]);
				setContent(res.data[0]);
			} catch (err) {}
		};
		getRandomContent();
	}, [user.accessToken]);

	return (
		<div className="featured">
			{movie ? (
				<>
					<div
						className="contentImg"
						style={{
							backgroundImage: `url(${movie.img})`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
						}}
					/>

					<div className="mainSection">
						<section className="section">
							<div className="imgTitle">
								<img src={movie.imgTitle} alt="" />
							</div>
							<div className="sectionInfo">
								<div className="titleInfo">
									<h2 className="66">
										{movie.title}
										<span className="tag release_date">
											({movie.year})
										</span>
									</h2>

									<div className="facts">
										<span className="limit">
											{movie.limit}
										</span>

										<span className="genres">
											{movie.genre}
										</span>
										<span className="runtime">
											{movie.duration}
										</span>
									</div>
								</div>
								<ul className="buttons">
									<li className="button">
										<div className="buttonIcon">
											<Link
												to={{
													pathname: "/watch",
													movie: movie,
												}}
											>
												<PlayArrow className="icon" />
											</Link>
										</div>
									</li>
									<li className="button">
										<div
											className="buttonIcon"
											onClick={(e) =>
												handleChange("favorite")
											}
										>
											{favorite ? (
												<FavoriteBorderSharp className="icon" />
											) : (
												<FavoriteBorderOutlined className="icon" />
											)}
										</div>
									</li>
									<li className="button">
										<div className="buttonIcon">
											<Bookmark className="icon" />
										</div>
									</li>
								</ul>
								<div className="description">
									<h3>Description</h3>
									<p className="desc">{movie.desc}</p>
								</div>
							</div>
						</section>
					</div>
				</>
			) : (
				<>
					<div
						className="contentImg"
						style={{
							backgroundImage: `url(${content.img})`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
						}}
					/>

					<div className="mainSection">
						<section className="section">
							<div className="imgTitle">
								<img src={content.imgTitle} alt="" />
							</div>
							<div className="sectionInfo">
								<div className="titleInfo">
									<h2 className="66">
										{content.title}
										<span className="tag release_date">
											({content.year})
										</span>
									</h2>

									<div className="facts">
										<span className="limit">
											{content.limit}
										</span>

										<span className="genres">
											{content.genre}
										</span>
										<span className="runtime">
											{content.duration}
										</span>
									</div>
								</div>
								<ul className="buttons">
									<li className="button">
										<div className="buttonIcon">
											<Link
												to={{
													pathname: "/watch",
													movie: content,
												}}
											>
												<PlayArrow className="icon" />
											</Link>
										</div>
									</li>
									<li className="button">
										<div className="buttonIcon">
											<FavoriteBorderOutlined className="icon" />
										</div>
									</li>
									<li className="button">
										<div className="buttonIcon">
											<Bookmark className="icon" />
										</div>
									</li>
								</ul>
								<div className="description">
									<h3>Description</h3>
									<p className="desc">{content.desc}</p>
								</div>
							</div>
						</section>
					</div>
				</>
			)}
		</div>
	);
};

export default Featured;
