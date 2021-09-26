import { Link, useLocation } from "react-router-dom";
import storage from "../../firebaseSetup";
import { useContext, useState } from "react";
import "./product.scss";
import { Publish } from "@material-ui/icons";
import { updateMovie } from "../../context/movieContext/apicalls";
import { MovieContext } from "../../context/movieContext/movieContext";

export default function Product() {
	const location = useLocation();
	const movie = location.movie;

	const [movieFinal, setMovieFinal] = useState({ ...movie });
	const { dispatch } = useContext(MovieContext);

	const [img, setImg] = useState(null);
	const [trailer, setTrailer] = useState(null);
	const [video, setVideo] = useState(null);
	const [uploaded, setUploaded] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		updateMovie(movieFinal, dispatch);
	};

	const upload = (items) => {
		items.forEach((item) => {
			const fileName = new Date().getTime() + item.label + item.file.name;
			const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done.");
				},
				(err) => {
					console.log(err);
				},
				() => {
					uploadTask.snapshot.ref.getDownloadURL().then((url) => {
						setMovieFinal((prev) => {
							return { ...prev, [item.label]: url };
						});
						setUploaded((prev) => prev + 1);
					});
				}
			);
		});
	};
	const handleUpload = (e) => {
		e.preventDefault();
		upload([
			{ file: img, label: "img" },
			{ file: trailer, label: "trailer" },
			{ file: video, label: "video" },
		]);
	};

	return (
		<div className="movie">
			<div className="productTitleContainer">
				<h1 className="productTitle">Movie</h1>
				<Link to="/newproduct">
					<button className="productAddButton">Create</button>
				</Link>
			</div>
			<div className="productTop">
				<div className="productTopRight">
					<div className="productInfoTop">
						<img src={movie.img} alt="" />
					</div>
					<div className="productInfoBottom">
						<div className="productInfoItem">
							<span className="productInfoKey">Id:</span>
							<span className="productInfoValue">
								{movie._id}
							</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">Title:</span>
							<span className="productInfoValue">
								{movie.title}
							</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">Genre:</span>
							<span className="productInfoValue">
								{movie.genre}
							</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">Year:</span>
							<span className="productInfoValue">
								{movie.year}
							</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">Limit:</span>
							<span className="productInfoValue">
								{movie.limit}
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
								value={movie.title}
							/>
						</div>
						<div className="inputContainer">
							<label className="inputLabel">Year</label>
							<input
								className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
								type="text"
								placeholder="Year"
								value={movie.year}
								name="year"
							/>
						</div>
						<div className="inputContainer">
							<label className="inputLabel">Genre</label>
							<input
								className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
								type="text"
								placeholder="Genre"
								name="genre"
								value={movie.genre}
							/>
						</div>
						<div className="inputContainer">
							<label className="inputLabel">Limit</label>
							<input
								className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
								type="text"
								placeholder="Limit"
								name="limit"
								value={movie.limit}
							/>
						</div>
						<div className="inputContainer">
							<label className="inputLabel">Trailer</label>
							<input
								className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
								type="file"
								id="trailer"
								name="trailer"
								onChange={(e) => setTrailer(e.target.files[0])}
							/>
						</div>
						<div className="inputContainer">
							<label className="inputLabel">Video</label>
							<input
								className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
								type="file"
								id="video"
								name="video"
								onChange={(e) => setVideo(e.target.files[0])}
							/>
						</div>
						<div className="inputContainer">
							<label className="inputLabel">Image</label>
							<input
								className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
								type="file"
								id="img"
								name="img"
								onChange={(e) => setImg(e.target.files[0])}
							/>
						</div>
					</div>

					{uploaded === 3 ? (
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
					) : (
						<div className="flex flex-col items-center">
							<a
								className="font-semibold shadow-sm rounded-lg py-3 bg-red-600 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-red-700 focus:shadow-sm focus:shadow-outline mt-5"
								style={{ width: "300px" }}
								onClick={handleUpload}
								href="/"
							>
								<span className="ml-4">Upload Files</span>
							</a>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}
