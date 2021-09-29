import "./newProduct.scss";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import storage from "../../firebaseSetup";
import { MovieContext } from "../../context/movieContext/movie.context";
import { createMovie } from "../../context/movieContext/apicalls";
import Select from "react-select";
import { toast } from "react-toastify";

export default function NewProduct() {
	const [movie, setMovie] = useState(null);
	const [img, setImg] = useState(null);
	const [imgTitle, setImgTitle] = useState(null);
	const [imgSm, setImgSm] = useState(null);
	const [trailer, setTrailer] = useState(null);
	const [video, setVideo] = useState(null);
	const [uploaded, setUploaded] = useState(0);

	const history = useHistory();

	const { dispatch } = useContext(MovieContext);

	const upload = (items) => {
		items.forEach((item) => {
			const fileName = new Date().getTime() + item.label + item.file.name;
			const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					toast.success("Upload is " + progress + "% done.");
				},
				(err) => {
					toast.error(err);
				},
				() => {
					uploadTask.snapshot.ref.getDownloadURL().then((url) => {
						setMovie((prev) => {
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
			{ file: imgTitle, label: "imgTitle" },
			{ file: imgSm, label: "imgSm" },
			{ file: trailer, label: "trailer" },
			{ file: video, label: "video" },
		]);
	};

	const handleSelect = (e) => {
		const value = e.value;
		setMovie({ ...movie, isSeries: value });
	};

	const handleChange = (e) => {
		const value = e.target.value;
		setMovie({ ...movie, [e.target.name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createMovie(movie, dispatch);
		history.push("/movies");
	};
	return (
		<div className="newProduct">
			<h1 className="addProductTitle">New Movie</h1>
			<form className="addProductForm">
				<div className="container">
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
					<div className="inputContainer">
						<label className="inputLabel">Title Image</label>
						<input
							className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
							type="file"
							id="imgTitle"
							name="imgTitle"
							onChange={(e) => setImgTitle(e.target.files[0])}
						/>
					</div>
					<div className="inputContainer">
						<label className="inputLabel">Thumbnail Image</label>
						<input
							className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
							type="file"
							id="imgSm"
							name="imgSm"
							onChange={(e) => setImgSm(e.target.files[0])}
						/>
					</div>
					<div className="inputContainer">
						<label className="inputLabel">Title</label>
						<input
							className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
							type="text"
							placeholder="Movie Title"
							name="title"
							onChange={handleChange}
						/>
					</div>
					<div className="inputContainer">
						<label className="inputLabel">Description</label>
						<input
							className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
							type="text"
							placeholder="Description"
							name="desc"
							onChange={handleChange}
						/>
					</div>
					<div className="inputContainer">
						<label className="inputLabel">Year</label>
						<input
							className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
							type="text"
							placeholder="Year"
							name="year"
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
						<label className="inputLabel">Limit</label>
						<input
							className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
							type="text"
							placeholder="Limit"
							name="limit"
							onChange={handleChange}
						/>
					</div>
					<div className="inputContainer">
						<label className="inputLabel">Duration</label>
						<input
							className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
							type="text"
							placeholder="Duration"
							name="duration"
							onChange={handleChange}
						/>
					</div>
					<div className="inputContainer">
						<label className="inputLabel">Is Series</label>
						<Select
							id="isSeries"
							name="isSeries"
							styles={{
								option: (base, state) => ({
									...base,
									fontSize: "0.875rem",
									color: state.isSelected ? "#fff" : "#555",
								}),
								control: (css) => ({
									...css,
									paddingLeft: "0.8rem",
									fontSize: "0.875rem",
								}),
							}}
							className={`w-full`}
							defaultValue="No"
							placeholder="No"
							options={[
								{
									label: "No",
									value: "false",
								},
								{ label: "Yes", value: "true" },
							]}
							onChange={handleSelect}
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
				</div>
				{uploaded === 5 ? (
					<div className="flex flex-col items-center">
						<a
							className="font-semibold shadow-sm rounded-lg py-3 bg-red-600 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-red-700 focus:shadow-sm focus:shadow-outline mt-5"
							style={{ width: "300px" }}
							onClick={handleSubmit}
							href="/"
						>
							<span className="ml-4">Create Movie</span>
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
	);
}
